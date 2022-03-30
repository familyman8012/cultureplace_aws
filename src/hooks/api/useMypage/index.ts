import { useQuery } from "react-query";
import axios from "axios";
import { IProduct } from "@src/typings/db";

const fetchFavorite = async (userid: string) => {
  const res = await axios.get(`/api/mypage/favorite?userid=${userid}`);
  return res.data;
};

const useFavorite = (userid: string) => {
  return useQuery<IProduct[], Error>(["list", "favoriteData"], () =>
    fetchFavorite(userid)
  );
};

const fetchJoin = async (userid: string) => {
  const res = await axios.get(`/api/mypage/join?userid=${userid}`);
  return res.data;
};

const useJoin = (userid: string) => {
  return useQuery<IProduct[], Error>(["list", "joinfavoriteData"], () =>
    fetchJoin(userid)
  );
};

export { useFavorite, fetchFavorite, useJoin, fetchJoin };
