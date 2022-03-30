import { useQuery } from "react-query";
import axios from "axios";
import { IProductList } from "@src/typings/db";
import { getSession } from "next-auth/client";

const fetchProducts = async (
  limit: number,
  pageParam: number,
  genre?: string,
  creator?: string
) => {
  let session;
  if (creator !== undefined) {
    session = await getSession();
  }
  console.log("creator creator creator느느느느는", session?.user.uid);
  let parse = await axios.get(
    `/api/product?limit=${limit}&page=${pageParam}${
      genre ? `&genre=${genre}&` : `&`
    }${creator !== undefined ? `creator=${session?.user.uid}` : ``}`
  );

  const result: IProductList = parse?.data;
  return result;
};

const useProducts = (
  limit: number,
  pageParam: number,
  genre?: string,
  creator?: string,
  initialData?: any
) => {
  return useQuery<IProductList, Error>(
    ["list", genre, String(pageParam)],
    async () => await fetchProducts(limit, pageParam, genre, creator),
    { keepPreviousData: true, initialData }
  );
};

export { useProducts, fetchProducts };
