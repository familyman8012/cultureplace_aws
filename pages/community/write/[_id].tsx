import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Write from "@components/modules/Board/Write";
import { useSession } from "next-auth/client";
import { useProdDetail } from "@src/hooks/api/useProducts/useProductDetail";

function BoardWrite() {
  const router = useRouter();
  const [session] = useSession();
  // 최상위 카테고리 ID 가져오기
  const [boardId, setBoardId] = useState("");
  useEffect(() => {
    setBoardId(
      window?.location?.pathname.substring(
        window?.location?.pathname.lastIndexOf("/") + 1
      )
    );
  }, []);
  useEffect(() => {
    if (session === null) {
      router.push("/");
    }
  }, [router, session]);

  const { data: productData } = useProdDetail(String(boardId));
  const noticeManager = productData?.creator === session?.user.uid;

  return (
    <>
      {session && (
        <Write
          _id={String(boardId)}
          session={session}
          boardname="community"
          boardCheck={true}
          noticeManager={noticeManager}
        />
      )}
    </>
  );
}

export default BoardWrite;
