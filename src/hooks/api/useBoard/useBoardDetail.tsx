import { IBoard } from "@src/typings/db";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

const fetchBoard = async (_id: string) => {
  const res = await axios.get(`/api/board/${_id}`);

  return res.data;
};

const useBoardDetail = (_id: string) => {
  return useQuery<IBoard, AxiosError<{ err: string }>>(
    ["detailBoardData", _id],
    async () => await fetchBoard(_id),
    {
      refetchOnWindowFocus: false
    }
  );
};

export { useBoardDetail, fetchBoard };
