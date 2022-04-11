import { useQuery } from "react-query";
import axios from "axios";
import { IProductList } from "@src/typings/db";

const fetchVodProducts = async (limit: number, pageParam: number) => {
  let parse = await axios.get(
    `/api/prodcut_vod?limit=${limit}&page=${pageParam}`
  );

  const result: IProductList = parse?.data;
  return result;
};

const useVodProducts = (limit: number, pageParam: number) => {
  return useQuery<IProductList, Error>(
    ["listvod", String(pageParam)],
    async () => await fetchVodProducts(limit, pageParam),
    { keepPreviousData: true }
  );
};

export { useVodProducts, fetchVodProducts };
