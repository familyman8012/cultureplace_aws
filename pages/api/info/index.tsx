import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import dayjs from "dayjs";
import axios from "axios";
import convert from "xml-js";
import { IncomingMessage } from "http";

const infoRouter = createHandler();

const servicekey = "0b6e49379ade4cf98c956ca55d40b5a4";
const today = dayjs().format("YYYYMMDD");
const info_url = (code: string) =>
  `http://kopis.or.kr/openApi/restful/boxoffice?service=${servicekey}&ststype=week&date=${today}&catecode=${code}&area=11`;

const getInfoData = async () => {
  const axiosgetData = ["AAAA", "AAAB", "CCCA", "CCCC", "EEEA"];

  try {
    const getData = await Promise.all(
      axiosgetData.map(el => axios.get(info_url(el)))
    );
    return getData;
  } catch (e) {
    console.log(e);
  }
};

infoRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  getInfoData().then(getData => {
    const sendData = getData?.map(el => convert.xml2json(el.data));
    getData && res.json(sendData);
  });
});

export default infoRouter;
