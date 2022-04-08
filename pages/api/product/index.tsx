import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Product from "../models/product";
import User from "../models/user";
import { omitBy, isUndefined, isEmpty } from "lodash";

const productRouter = createHandler();

productRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { genre, creator, page, limit } = req.query;
  const Numberlimit = Number(limit);
  const searchOption = omitBy({ genre, creator }, isUndefined);

  console.log("creator, creator", creator);

  // 크리에이터 레벨에 따라, 마스터의 경우는 모든 걸 보여주고, 그외에는 자신이 등록한 것만 보여주도록 함.
  let creatorLevel;
  if (creator === "61c9a8f21179d30608ba85d7") {
    creatorLevel = {};
  } else {
    creatorLevel = { creator };
  }

  try {
    if (isEmpty(searchOption)) {
      const [products, productsCount] = await Promise.all([
        Product.find(
          { isvod: { $ne: true }, islive: { $ne: false } },
          { body: false }
        )
          .sort({ firstmeet: 1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Product.find({}).countDocuments()
      ]);
      return res.send({ products, productsCount });
    } else if (genre) {
      const [products, productsCount] = await Promise.all([
        Product.find(
          { genre, isvod: { $ne: true }, islive: { $ne: false } },
          { body: false }
        )
          .sort({ firstmeet: 1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Product.find({ genre }).countDocuments()
      ]);
      return res.send({ products, productsCount });
    } else if (!genre) {
      console.log("메인페이지");
      const user = User.find({ _id: creator });
      const [products, productsCount] = await Promise.all([
        Product.find(creatorLevel, { body: false })
          .populate("creator", "name email phone")
          .populate("joinMembr", "name email phone")
          .sort({ firstmeet: 1 })
          .limit(Numberlimit)
          .skip((Number(page) - 1) * Numberlimit),
        Product.find({}).countDocuments()
      ]);
      return res.send({ products, productsCount });
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

productRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = new Product(req.body);
    await products.save();
    return res.send(products);
  } catch {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

export default productRouter;
function err(err: any) {
  throw new Error("Function not implemented.");
}
