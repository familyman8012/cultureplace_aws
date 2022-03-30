import { IProduct } from "@src/typings/db";
import axios from "axios";
import { useQuery } from "react-query";

const fetchVodDetail = async (_id: string) => {
  const res = await axios.get(`/api/product_vod/${_id}`);
  return res.data[0];
};

const useVodDetail = (_id: string) => {
  return useQuery<IProduct, Error>(
    ["detailVodData", _id],
    async () => await fetchVodDetail(_id)
  );
};

export { useVodDetail, fetchVodDetail };
