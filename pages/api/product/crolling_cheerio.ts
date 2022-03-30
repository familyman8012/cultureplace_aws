import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import axios from "axios";
import cheerio from "cheerio";
import pupetter from "puppeteer";

const infoRouter = createHandler();

const info_url = `https://www.tistory.com/category/getMoreCategoryPost.json?category=life&lastPublished=0&first=true`;

infoRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    axios.get(info_url).then(resp => {
      const htmlString = resp.data;
      const $ = cheerio.load(htmlString);
      const h1 = $(".talent_title").text();
      console.log(h1);
      //   const href = $("a").attr("href");
      //   console.log(href);
      res.send("된다.");
    });
  } catch (e) {
    console.log(e);
  }
});

export default infoRouter;
