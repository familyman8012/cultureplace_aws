import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { IBoard } from "@src/typings/db";

const fetchBoard = async (_id: string) => {
  const res = await axios.get(`/api/board/${_id}`);

  return res.data;
};

const useBoardDetail = (_id: string) => {
  return useQuery<IBoard, AxiosError<{ err: string }>>(
    ["detailBoardData", _id],
    async () => await fetchBoard(_id)
  );
};

export { useBoardDetail, fetchBoard };
