import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import axios from "axios";
import cheerio from "cheerio";
import puppeteer from "puppeteer";

const infoRouter = createHandler();

const info_url = (i: number) =>
  `https://taling.me/Home/Search/?page=${i}&cateMain=&cateSub=&region=&orderIdx=&query=%EC%97%B0%EA%B7%B9&code=&org=&day=&time=&tType=&region=&regionMain=`;

infoRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewport({
      width: 1440,
      height: 1080
    });
    // for (let i = 0; i < 10; i++) {
    //   await page.goto(info_url(i));
    //   const html = await page.content();
    //   const $ = cheerio.load(html);
    //   const title = $(".cont2 .title").text();
    //   console.log(title);
    // }
    await page.goto(info_url(1));
    const html = await page.content();
    const $ = cheerio.load(html);
    let hrefArray: any[] = [];
    $(".cont2_class a").each((i, el) => {
      const href = $(el).attr("href");
      const title = $(el)
        .find(".title")
        .text()
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/ /gi, "");
      const price = $(el)
        .find(".price2 > span > span > span")
        .text()
        .replace(`/시간\n`, "")
        .replace(",", "")
        .replace(/ /gi, "");
      const body = hrefArray.push({
        href,
        title,
        price
      });
    });
    console.log(hrefArray);

    //    const contentArray = [];

    // await page.screenshot({ path: "./public/images/example.png" });
    // await browser.close();
    res.send("된다.");
  } catch (e) {
    console.log(e);
  }
});

export default infoRouter;
