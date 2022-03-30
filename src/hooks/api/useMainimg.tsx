import { IMainVis } from "@src/typings/db";
import axios from "axios";
import { useQuery } from "react-query";

const fetchMainimg = async () => {
  const res = await axios.get("/api/mainvisimg");
  return res.data;
};

const useMainimg = () => {
  return useQuery<IMainVis[], Error>("mainimgData", () => fetchMainimg());
};

export { useMainimg, fetchMainimg };
