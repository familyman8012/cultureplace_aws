import { useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useProdDetail } from "@src/hooks/api/useProducts/useProductDetail";
import PaymentInfo from "@components/pageComp/payment/PaymentInfo";
import { PaymentSeo } from "@components/elements/CommonSeo";

function Payment() {
  const [session] = useSession();

  const router = useRouter();
  const { _id } = router.query;

  const { data, error, isLoading, isError } = useProdDetail(String(_id));

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
