import { useQuery } from "react-query";
import axios from "axios";
import { INotice } from "@src/typings/db";

const fetchNotices = async () => {
  const res = await axios.get("/api/notice");
  return res.data;
};

const useNotices = () => {
  return useQuery<INotice[], Error>("noticeData", () => fetchNotices());
};

export { useNotices, fetchNotices };
