import { IProductType2 } from "@src/typings/db";
import axios from "axios";
import { useQuery } from "react-query";

const fetchProduct = async (_id: string) => {
  const res = await axios.get(`/api/product/${_id}`);
  return res.data[0];
};

const useProdDetail = (_id: string) => {
  return useQuery<IProductType2, Error>(
    ["detailViewData", _id],
    async () => await fetchProduct(_id)
  );
};

export { useProdDetail, fetchProduct };
