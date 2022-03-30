import React from "react";
import { useRouter } from "next/router";
import { useVod } from "@src/hooks/api/useVod/useNotice";
import { css } from "@emotion/react";
import LectureRoom from "@components/pageComp/vod/LectureRoom";
import { useSession } from "next-auth/client";

function Vod() {
  const router = useRouter();
  const { _id } = router.query;
  const [session] = useSession();

  return (
    <>
      {_id && session?.user.uid && (
        <LectureRoom _id={String(_id)} sessionId={session?.user.uid} />
      )}
    </>
  );
}

export default Vod;
