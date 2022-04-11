import { Iinfinity } from "@src/typings/db";
import axios from "axios";
import { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { searchStore } from "@src/mobx/store";

const fetchPosts = async (querykey: string, pageParam = 0) => {
  const { searchInput, filterFind } = searchStore.searchOption;

  let res;
  if (searchInput || filterFind) {
    const res = await axios.post(
      `/api/product/search?meetingcycle=${querykey}&limit=12&page=${pageParam}`,
      searchStore.searchOption
    );
    return res.data;
  }

  let url;
  if (querykey === "oneday" || querykey === "month") {
    url = `/api/product?meetingcycle=${querykey}&limit=12&page=${pageParam}`;
  } else {
    url = `/api/product?genre=${querykey}&limit=8&page=${pageParam}`;
  }
  res = await axios.get(`${url !== undefined && url}`);
  return res.data;
};

const useInfinity = (querykey: string) => {
  const pageNum = useRef(1);

  return useInfiniteQuery(
    ["list", querykey],
    async ({ pageParam = pageNum.current }) => {
      const res = await fetchPosts(querykey, pageParam);
      pageNum.current = pageNum.current + 1;
      return res;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage: Iinfinity) => {
        if (lastPage.isLast) {
          return pageNum.current;
        }

        return 1;
      },
      staleTime: 3000
    }
  );
};

export { fetchPosts, useInfinity };
