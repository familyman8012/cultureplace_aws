import { IPayment, ITossPay } from "@src/typings/db";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

interface ITossPayData {
  data: ITossPay;
}

const fetchPayment = async (userid: string | undefined) => {
  const res = await axios.get(`/api/payment?userid=${userid}`);
  return res.data;
};

const usePayment = (userid: string | undefined) => {
  return useQuery<ITossPayData[], AxiosError>(
    ["paymentData", userid],
    async () => await fetchPayment(userid)
  );
};

export { usePayment, fetchPayment };
