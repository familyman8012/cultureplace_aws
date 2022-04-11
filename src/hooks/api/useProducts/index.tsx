import { useQuery } from "react-query";
import axios from "axios";
import { IProduct, IProductList } from "@src/typings/db";
import { getSession } from "next-auth/client";

const fetchProducts = async (
  limit: number,
  pageParam: number,
  genre?: string,
  searchKeyword?: string,
  creator?: string
) => {
  let session;
  if (creator !== undefined) {
    session = await getSession();
  }
  console.log("creator creator creator느느느느는", session?.user.uid);
  console.log("findKeyWord findKeyWord findKeyWord", searchKeyword);
  let parse = await axios.get(
    `/api/product?searchKeyword=${searchKeyword}&limit=${limit}&page=${pageParam}${
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
  searchKeyword?: string,
  creator?: string,
  initialData?: IProductList
) => {
  return useQuery<IProductList, Error>(
    ["list", genre, String(pageParam)],
    async () =>
      await fetchProducts(limit, pageParam, genre, creator, searchKeyword),
    { refetchOnWindowFocus: false, keepPreviousData: true, initialData }
  );
};

export { useProducts, fetchProducts };
