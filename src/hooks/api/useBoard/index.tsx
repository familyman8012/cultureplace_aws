import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { IBoardList } from "@src/typings/db";

const fetchBoard = async (
  boardCheck: boolean,
  parentId: string,
  limit?: number,
  pageParam?: number,
  searchKeyword?: string
) => {
  // const { searchInput, filterFind } = searchStore.searchOption;

  let parse = await axios.get(
    `/api/board?parentId=${parentId}${
      boardCheck
        ? `&boardCheck=${true}&limit=${limit}&page=${pageParam}&searchKeyword=${searchKeyword}`
        : `&boardCheck=${false}`
    }`
  );
  const result: IBoardList = parse?.data;
  return result;
};

const useBoard = (
  boardCheck: boolean,
  parentId: string,
  limit?: number,
  pageParam?: number,
  searchKeyword?: string
) => {
  return useQuery<IBoardList, AxiosError>(
    ["boardlist", parentId, String(pageParam)],
    async () =>
      await fetchBoard(boardCheck, parentId, limit, pageParam, searchKeyword),
    { keepPreviousData: true }
  );
};

export { useBoard, fetchBoard };
