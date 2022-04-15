import { useQuery } from "react-query";
import axios from "axios";
import { IProduct } from "@src/typings/db";

const fetchProduct = async (_id: string) => {
  const res = await axios.get(`/api/product/${_id}`);
  return res.data[0];
};

const useProdDetail = (_id: string) => {
  return useQuery<IProduct, Error>(
    ["detailViewData", _id],
    async () => await fetchProduct(_id)
  );
};

export { useProdDetail, fetchProduct };
