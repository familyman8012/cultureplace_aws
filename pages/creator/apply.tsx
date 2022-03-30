import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/client";
import router from "next/router";
import { useCallback, useEffect } from "react";

function Apply() {
  const [session] = useSession();

  // useEffect(() => {
  //   session?.user.role === "creator" && router.push("./");
  // }, [session?.user.role]);

  console.log("session?.user.role", session?.user.role);

  const apply = useCallback(() => {
    axios
      .patch(`/api/user/user?_id=${session?.user.uid}`, {
        role: "creator"
      })
      .then((res: AxiosResponse<any>) => {
        if (res?.data === "creator")
          alert("팀리더가 되셨습니다. 모임을 열어보세요.");
        router.push("./");
      })
      .catch(error => console.log(error));
  }, [session?.user.uid]);
  return (
    <div>
      모임을 열어보세요 <button onClick={apply}>확인</button>
      <br />
      로그아웃 후 새롭게 로그인 하신 후부터 적용됩니다.
    </div>
  );
}

export default Apply;
