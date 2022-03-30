import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import convert from "xml-js";

const infoRouter = createHandler();

const servicekey = "0b6e49379ade4cf98c956ca55d40b5a4";

infoRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, title }: { [key: string]: string | string[] } = req.query;
    const info_url = `http://www.kopis.or.kr/openApi/restful/pblprfr/${id}?service=${servicekey}`;
    const blog_url = `https://openapi.naver.com/v1/search/blog?query=${encodeURI(
      String(title)
    )}&display=25&start=1&sort=sim`;
    const [result, result2] = await Promise.all([
      axios.get(info_url),
      axios.get(blog_url, {
        headers: {
          "X-Naver-Client-Id": "ie9BKWPG17OliQXhjOOz",
          "X-Naver-Client-Secret": "R8Z_9g4fgD"
        }
      })
    ]);
    return res.send([convert.xml2js(result.data), result2.data]);
  } catch {
    res.status(500).send(err);
  }
});

export default infoRouter;
function err(err: any) {
  throw new Error("Function not implemented.");
}
