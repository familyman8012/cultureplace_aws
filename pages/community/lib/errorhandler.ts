import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Errorhandler(status: string) {
  const router = useRouter();

  useEffect(() => {
    if (status === "error") {
      //   toast.error("올바른 경로로 접속해주세요", {
      //     position: "top-right",
      //     autoClose: 2000
      //   });
      //   setTimeout(() => router.back(), 2000);
      router.back();
    }
  }, [router, status]);
}

export default Errorhandler;
