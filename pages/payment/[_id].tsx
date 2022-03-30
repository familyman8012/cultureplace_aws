import PaymentInfo from "@components/pageComp/payment/PaymentInfo";
import PaymentComplete from "@components/pageComp/payment/PaymentComplete";
import { useProdDetail } from "@src/hooks/api/useProducts/useProductDetail";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Payment() {
  const [session] = useSession();

  const router = useRouter();
  const { _id } = router.query;

  const [completeData, setcompleteData] = useState<any>({
    data: { item_name: "", order_id: "", payment_data: "" }
  });
  const [payComplete, setpayComplete] = useState(false);

  const { status, data, error, isLoading, isError } = useProdDetail(
    String(_id)
  );

  console.log("dataaa", data);

  useEffect(() => {
    !session && router.push("/signin");
  }, [router, session]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      {!payComplete ? (
        data && session ? (
          <PaymentInfo
            data={data}
            session={session}
            setcompleteData={setcompleteData}
            setpayComplete={setpayComplete}
          />
        ) : (
          <div></div>
        )
      ) : (
        <PaymentComplete completeData={completeData} />
      )}
    </>
  );
}

export default Payment;
