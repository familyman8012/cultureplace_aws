import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { IBoardList } from "@src/typings/db";

const fetchBoard = async (
  parentId: string,
  limit?: number,
  pageParam?: number,
  searchKeyword?: string
) => {
  // const { searchInput, filterFind } = searchStore.searchOption;

  let parse = await axios.get(
    `/api/board?parentId=${parentId}&limit=${limit}&page=${pageParam}&searchKeyword=${searchKeyword}`
  );
  const result: IBoardList = parse?.data;
  return result;
};

const useBoard = (
  parentId: string,
  limit?: number,
  pageParam?: number,
  searchKeyword?: string
) => {
  return useQuery<IBoardList, AxiosError>(
    ["boardlist", parentId, String(pageParam)],
    async () => await fetchBoard(parentId, limit, pageParam, searchKeyword),
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );
};

export { useBoard, fetchBoard };
