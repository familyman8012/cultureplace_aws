import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Success() {
  const router = useRouter();
  const { amount, orderId, paymentKey } = router.query;
  console.log(router.query);
  useEffect(() => {
    amount &&
      orderId &&
      paymentKey &&
      axios
        .post("/api/tosspay", { amount, orderId, paymentKey })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
  }, [amount, orderId, paymentKey]);

  return <div>결제승인중</div>;
}

export default Success;
