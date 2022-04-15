import { useQuery } from "react-query";
import axios from "axios";
import { IMainVis } from "@src/typings/db";

const fetchMainimg = async () => {
  const res = await axios.get("/api/mainvisimg");
  return res.data;
};

const useMainimg = () => {
  return useQuery<IMainVis[], Error>("mainimgData", () => fetchMainimg());
};

export { useMainimg, fetchMainimg };
