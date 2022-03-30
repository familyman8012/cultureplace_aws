import { IPayment } from "@src/typings/db";
import axios from "axios";
import { useQuery } from "react-query";

const fetchPayment = async (userid: string | undefined) => {
  const res = await axios.get(`/api/payment?userid=${userid}`);
  return res.data;
};

const usePayment = (userid: string | undefined) => {
  return useQuery<IPayment[], Error>(
    ["paymentData", userid],
    async () => await fetchPayment(userid)
  );
};

export { usePayment, fetchPayment };
