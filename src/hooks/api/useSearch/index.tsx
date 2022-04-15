import { useQuery } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IProduct } from "@src/typings/db";

interface ISearch {
  productsCount?: number;
  products?: IProduct[];
}

const fetchSearch = async (keyword: string) => {
  let parse = await axios.post<{ searchInput: string }, AxiosResponse<ISearch>>(
    `/api/product/search?meetingcycle=oneday&page=1`,
    {
      searchInput: String(keyword)
    }
  );

  const result: ISearch = parse?.data;
  return result;
};

const useSearch = (keyword: string) => {
  return useQuery<ISearch, AxiosError>(
    ["list", "search"],
    async () => await fetchSearch(keyword),
    { refetchOnWindowFocus: false }
  );
};

export { useSearch, fetchSearch };
