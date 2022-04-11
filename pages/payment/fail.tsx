import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function Success() {
  const router = useRouter();
  const { message } = router.query;
  console.log(router.query);

  useEffect(() => {
    toast.error("결제에 실패했습니다.", {
      position: "top-right",
      autoClose: 2000
    });
    setTimeout(() => router.push("/"), 2000);
  }, [router]);

  return (
    <div
      css={css`
        display: flex;
        width: 100vw;
        height: 100vh;
        align-items: center;
        justify-content: center;
      `}
    >
      {message}
      <ToastContainer />
    </div>
  );
}

export default Success;
