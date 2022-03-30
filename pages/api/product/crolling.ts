import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import axios from "axios";
import cheerio from "cheerio";
import pupetter from "puppeteer";
import fs from "fs";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Product from "../models/product";

const infoRouter = createHandler();

const info_url = `https://cdn-gql-prod2.class101.net/graphql?operationName=ProductKeywordSearch&variables=%7B%22limit%22%3A20%2C%22offset%22%3A0%2C%22productFilter%22%3A%7B%22isHidden%22%3Afalse%2C%22keyword%22%3A%22%EA%B2%BD%EC%A0%9C%EC%A0%81%20%EC%9E%90%EC%9C%A0%22%7D%2C%22productOrder%22%3A%7B%22orderBy%22%3A%22accuracyOrder%22%2C%22direction%22%3A-1%7D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2290003222cda34a6c32d39d4df623d0fb75107385cb99cb0331777d6e2f0cef41%22%7D%7D`;

infoRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let productArray: any[] = [];
    let bodyUrl: any[] = [];

    await axios
      .get(info_url)
      .then(
        async (resp: {
          data: { data: { productsSearch: { products: any[] } } };
        }) => {
          const htmlString = resp.data.data.productsSearch.products;
          htmlString.forEach(el =>
            bodyUrl.push(`https://class101.net/products/${el.firestoreId}`)
          );
          console.log(bodyUrl);
          const bodyCont = await Promise.all(
            bodyUrl.map(el2 =>
              axios.get(el2).then(resp => {
                const htmlString2 = resp.data;
                const $ = cheerio.load(htmlString2);
                const bodyContent = $(
                  ".ParsedHtml__SanitizeHtmlContainer-sc-1nymvxu-0"
                ).html();

                return bodyContent;
                //   const href = $("a").attr("href");
                //   console.log(href);
              })
            )
          );

          const classType = ["oneday", "month", "oneday", "month"];
          const locationType = [
            "강남",
            "신촌",
            "홍대",
            "이태원",
            "대학로",
            "종로",
            "온라인"
          ];
          productArray = htmlString.map((el, i) => {
            let firstmeetday = `2022-0${
              Math.floor(Math.random() * (2 - 1)) + 1
            }-${Math.floor(Math.random() * (28 - 10)) + 10}T18:00`;
            return {
              imgurl: el.coverImageUrl,
              title: el.title,
              price:
                el.packagePricePreview !== null
                  ? el.packagePricePreview.listPrice
                  : 0,
              saleprice:
                el.packagePricePreview !== null
                  ? el.packagePricePreview.netPrice
                  : 0,
              body: "" + bodyCont[i],
              location: locationType[Math.floor(Math.random() * (7 - 0)) + 0],
              genre: "wisdom",
              firstmeet: firstmeetday,
              meetday: dayjs(firstmeetday).format("ddd요일"),
              meetingcycle: classType[Math.floor(Math.random() * (4 - 0)) + 0],
              people: el.author.nickName
            };
          });
          fs.writeFile(
            "./pages/api/product/product.json",
            JSON.stringify(productArray),
            (err: any) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("success file write");
            }
          );
          const productMany = await Product.insertMany(productArray);
          res.send("된다.");
        }
      );
    // .then(resp2 => {
    //   console.log("body를 가져오렴", bodyUrl);
    //   bodyUrl.forEach(el2 =>
    //     bodyCont.push(
    //       axios.get(el2).then(resp => {
    //         const htmlString2 = resp.data;
    //         const $ = cheerio.load(htmlString2);
    //         const h1 = $(
    //           ".ParsedHtml__SanitizeHtmlContainer-sc-1nymvxu-0"
    //         ).html();
    //         console.log(h1);
    //         //   const href = $("a").attr("href");
    //         //   console.log(href);
    //       })
    //     )
    //   );
    //   console.log(bodyCont);
    // });
  } catch (e) {
    console.log(e);
  }
});

export default infoRouter;
