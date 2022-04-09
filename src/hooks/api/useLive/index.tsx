import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { ILive } from "@src/typings/db";

const fetchLives = async () => {
  const res = await axios.get("/api/streamlive");
  return res.data;
};

const useLives = () => {
  return useQuery<ILive[], AxiosError>("liveData", () => fetchLives());
};

export { useLives, fetchLives };
