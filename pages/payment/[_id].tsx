import PaymentInfo from "@components/pageComp/payment/PaymentInfo";
import PaymentComplete from "@components/pageComp/payment/PaymentComplete";
import { useProdDetail } from "@src/hooks/api/useProducts/useProductDetail";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PaymentCompleteSeo, PaymentSeo } from "@components/elements/CommonSeo";

function Payment() {
  const [session] = useSession();

  const router = useRouter();
  const { _id } = router.query;

  const { status, data, error, isLoading, isError } = useProdDetail(
    String(_id)
  );

  useEffect(() => {
    !session && router.push("/");
  }, [router, session]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      {data && session && (
        <>
          <PaymentSeo />
          <PaymentInfo data={data} session={session} />
        </>
      )}
    </>
  );
}

export default Payment;
