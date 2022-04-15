import { useQuery } from "react-query";
import axios from "axios";

const fetchComplete = async (userid: string, productId: string) => {
  const res: { data: any } = await axios.get(
    `/api/product/complete?userId=${userid}&productId=${productId}`
  );
  return res.data[0];
};
const useComplete = (userid: string, productId: string) => {
  return useQuery(["complete"], () => fetchComplete(userid, productId));
};

export { useComplete, fetchComplete };
