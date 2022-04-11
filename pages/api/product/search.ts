import createHandler from "../middleware";
import Product from "../models/product";
import type { NextApiRequest, NextApiResponse } from "next";

const productRouter = createHandler();

productRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, meetingcycle, limit } = req.query;
  const Numberlimit = Number(limit);

  try {
    const { searchInput = "", filterFind = [] } = req.body;

    // 키워드 검색
    const data1 = {
      $search: {
        index: "productSearch",
        text: { query: searchInput, path: ["title", "people", "location"] }
      }
    };

    // 체크박스 옵션리스트
    const selectType = ["location", "meetday", "genre"];

    // 체크박스 추가하기전에, 기본 aggregate 설정,
    const matchData: any[] = [
      {
        ["meetingcycle"]: { $in: [meetingcycle] },
        isvod: { $ne: true },
        islive: { $ne: false }
      }
    ];

    // 선택한 체크박스 추가
    if (Array.isArray(filterFind) && filterFind.length !== 0) {
      for (let i = 0; i < selectType.length; i++) {
        matchData.push(
          filterFind[i].length !== 0
            ? { [selectType[i]]: { $in: filterFind[i] } }
            : ``
        );
      }
    }

    // mongodb 에서 체크박스 리스트로 검색할 수 있게 $match 설정.
    const data2 = {
      $match: Object.assign({}, ...matchData)
    };

    // 키워드 검색이 비어있지 않으면 추가, 체크박스 옵션 중 하나라도 체크했다면 추가.
    let searchOp = [];
    searchInput !== "" && searchOp.push(data1);
    filterFind.some((el: string | any[]) => el.length !== 0) &&
      searchOp.push(data2, { $unset: "copies" });

    // 키워드검색과 체크박스 검색 등을 합쳐서 검색 결과 가져오기
    let products;
    let productsCount;
    let is_last;
    if (
      searchInput === "" &&
      filterFind.every((el: string | any[]) => el.length === 0)
    ) {
      [products, productsCount] = await Promise.all([
        Product.find(
          { meetingcycle, isvod: { $ne: true }, islive: { $ne: false } },
          { body: false }
        )
          .sort({ firstmeet: 1 })
          .skip((Number(page) - 1) * Numberlimit)
          .limit(Numberlimit),
        Product.find().countDocuments()
      ]);
      is_last = Math.ceil(Number(productsCount) / Numberlimit) < Number(page);
    } else {
      products = await Product.aggregate(searchOp).sort({ firstmeet: 1 });
      productsCount = await products.length;
      is_last = true;
    }
    return res.send({ products, productsCount, is_last });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default productRouter;
