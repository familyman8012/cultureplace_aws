import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Success() {
  const router = useRouter();
  const { amount, orderId, paymentKey } = router.query;
  useEffect(() => {
    amount &&
      orderId &&
      paymentKey &&
      axios
        .post("/api/tosspay", { amount, orderId, paymentKey })
        .then(res => {})
        .catch(err => console.log(err));
  }, [amount, orderId, paymentKey]);

  return <div>결제승인중</div>;
}

export default Success;
