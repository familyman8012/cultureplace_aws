import { IProduct } from "@src/typings/db";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { searchStore } from "@src/mobx/store";

const useInfinity = (querykey: string) => {
  // useInfiniteQuery에서 쓸 함수
  const fetchPosts = async ({ pageParam = 1 }) => {
    const response = await axios.post(
      `/api/product/search?meetingcycle=${querykey}&limit=12&page=${pageParam}`,
      searchStore.searchOption
    );
    const result: { products: IProduct[]; is_last: boolean } = response.data;

    return {
      products: result.products,
      nextPage: pageParam + 1,
      isLast: result.is_last
    };
  };

  const query = useInfiniteQuery(["list", querykey], fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return lastPage.nextPage;
      return undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1
  });

  return query;
};

export { useInfinity };
