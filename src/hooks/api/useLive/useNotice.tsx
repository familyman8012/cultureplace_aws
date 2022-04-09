import { INotice } from "@src/typings/db";
import axios from "axios";
import { useQuery } from "react-query";

const fetchNotice = async (_id: string) => {
  if (_id === "undefined") return null;
  const res = await axios.get(`/api/notice/${_id}`);
  return res.data[0];
};

const useNotice = (_id: string) => {
  return useQuery<INotice | null, Error>(["noticeViewData", _id], () =>
    fetchNotice(_id)
  );
};

export { useNotice, fetchNotice };
