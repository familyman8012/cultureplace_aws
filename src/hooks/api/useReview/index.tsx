import { IProduct, IReview } from "@src/typings/db";
import axios from "axios";
import { useQuery } from "react-query";

interface IReivewData {
  count: number;
  reviews: IReview[];
}

const fetchReview = async (_id: string, page: number) => {
  console.log("fetchReview");
  const res = await axios.get(`/api/review/${_id}?page=${page}`);
  console.log("review res", res);
  return res.data;
};

const useReview = (_id: string, page: number) => {
  return useQuery<IReivewData | null, Error>(
    ["reviewData", _id, page],
    async () => await fetchReview(_id, page),
    { keepPreviousData: true }
  );
};

export { useReview, fetchReview };
