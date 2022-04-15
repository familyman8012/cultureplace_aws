import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { toast, ToastContainer } from "react-toastify";
import PaymentComplete from "@components/pageComp/payment/PaymentComplete";
import { ITossPay } from "@src/typings/db";

interface ITossSuccess {
  amount: number;
  orderId: string;
  paymentKey: string;
}

function Success() {
  const router = useRouter();
  const [session] = useSession();
  const { amount, orderId, paymentKey, productid } = router.query;

  const [completeData, setcompleteData] = useState<ITossPay | null>(null);

  // amount, orderId, paymentkey 가 파라미터로 들어오면, 토스서버로 결제신호를 보내고, 성공하면 (DONE) completeData 에 저장한다.
  useEffect(() => {
    amount &&
      orderId &&
      paymentKey &&
      axios
        .post<ITossSuccess, AxiosResponse<ITossPay>>("/api/tosspay", {
          amount: Number(amount),
          orderId: String(orderId),
          paymentKey: String(paymentKey)
        })
        .then(res => {
          if (res?.data?.status === "DONE") {
            setcompleteData(res.data);
          } else {
            // DONE 이 아니면 TOSS 에서 알려주는 MESSAGE 를 사용자에게 보여주고, 메인페이지로 이동
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 2000
            });
            setTimeout(() => router.push("/"), 3000);
          }
        })
        .catch(err => console.log(err));
  }, [amount, orderId, paymentKey, router]);

  // completeData 의  status 가 done 이되면, DB에 저장하기 위해, payment  api 로 접근해서, 결제내역과 각 모임의 joinmember 에 입력
  useEffect(() => {
    if (completeData?.status === "DONE") {
      axios
        .post("/api/payment", {
          _id: productid,
          data: completeData,
          userid: session?.user?.uid
        })
        .then(res => {
          setcompleteData({ ...completeData, status: "SUCCESS" });
        })
        .catch(err => {
          console.log(err.response?.data.message);
          // router.push("/");
        });
    }
  }, [completeData, productid, router, session?.user?.uid]);

  return (
    <>
      {completeData?.status === "SUCCESS" ? (
        <PaymentComplete completeData={completeData} />
      ) : (
        <div></div>
      )}
      <ToastContainer />
    </>
  );
}

export default Success;
