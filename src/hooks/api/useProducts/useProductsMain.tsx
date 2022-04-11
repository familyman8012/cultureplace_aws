import { useQuery } from "react-query";
import axios from "axios";
import { IProductList } from "@src/typings/db";

const fetchProductsMain = async (limit: number, pageParam: number) => {
  let parse = await axios.get(`/api/product?limit=${limit}&page=${pageParam}`);

  const result: IProductList = parse?.data;
  return result;
};

const useProductsMain = (products: IProductList) => {
  return useQuery<IProductList, Error>(
    ["list", "main"],
    async () => await fetchProductsMain(90, 1),
    { refetchOnWindowFocus: false, initialData: products }
  );
};

export { useProductsMain, fetchProductsMain };
