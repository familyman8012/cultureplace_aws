import List from "@components/modules/Board/List";
import { useSession } from "next-auth/client";
import QuestionLayout from "./layout";
import { useEffect, useState } from "react";
import { boardStore } from "@src/mobx/store";
import { GetServerSideProps } from "next";
import { useProdDetail } from "@src/hooks/api/useProducts/useProductDetail";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import Errorhandler from "./lib/errorhandler";

function Board() {
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

  const { status, data } = useProdDetail(String(boardId));

  //에러핸들링
  Errorhandler(status);

  useEffect(() => {
    if (session === null) {
      router.push("/");
    }
  }, [router, session]);

  return (
    <>
      {boardId && session && data ? (
        <QuestionLayout data={data} _id={boardId} session={session}>
          <List
            parentId={String(boardId)}
            boardname="community"
            boardCheck={true}
          />
        </QuestionLayout>
      ) : (
        <div></div>
      )}
    </>
  );
}
export default Board;
