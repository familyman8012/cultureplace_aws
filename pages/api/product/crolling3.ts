import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import axios from "axios";
import cheerio from "cheerio";
import pupetter from "puppeteer";

const infoRouter = createHandler();

const info_url = [
  "https://class101.net/products/cuFGsH09TMtTXc1LoBjJ",
  "https://class101.net/products/46XGCJBSgZ9kkLVfnxXg",
  "https://class101.net/products/zRhHZc5JwFkJgcafCJiY",
  "https://class101.net/products/DiyaOKpLFulcHhiRncVt",
  "https://class101.net/products/pBKPi79NrvxlEdy85pGG",
  "https://class101.net/products/jdYQD7pxu5I0Xaz0lHG7",
  "https://class101.net/products/hMyDgEG8BKy9F9SN1npx",
  "https://class101.net/products/s0CtSHbM1CCeYsCBvWug",
  "https://class101.net/products/VCgFENneJ7RgkELnBnlv",
  "https://class101.net/products/1bdaTqNQzKtTM0XbV8h3",
  "https://class101.net/products/omeoEAHGAKr0DAfYrzYN",
  "https://class101.net/products/wbYObi3GG4c18uCO0AHh",
  "https://class101.net/products/zGxVKSrRA54I3bfwyRfR",
  "https://class101.net/products/r1PMovoqubsIs0rQFgAa",
  "https://class101.net/products/SeanMcCtzrzt7CKQjAyB",
  "https://class101.net/products/r5PPf3O7iHTqLhtZgzPX",
  "https://class101.net/products/eGdpR2ttgQHkPVEEQHgy",
  "https://class101.net/products/w0PzcnpNJppDkKVnkUKn",
  "https://class101.net/products/0oEA21n12Hoh1pdEQt7P",
  "https://class101.net/products/oh5gWRd0tvp65OaQ9rpT"
];
const bodyCont: any[] = [];

infoRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    info_url.forEach(el =>
      bodyCont.push(
        axios.get(el).then(resp => {
          const htmlString = resp.data;
          const $ = cheerio.load(htmlString);
          const h1 = $(
            ".ParsedHtml__SanitizeHtmlContainer-sc-1nymvxu-0"
          ).html();
          //   const href = $("a").attr("href");
          //   console.log(href);
          console.log(h1);
        })
      )
    );

    res.send("된다.");
  } catch (e) {
    console.log(e);
  }
});

export default infoRouter;
