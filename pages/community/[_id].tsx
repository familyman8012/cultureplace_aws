import List from "@components/modules/Board/List";
import { useSession } from "next-auth/client";
import QuestionLayout from "../../components/pageComp/community/layout";
import { useEffect, useState } from "react";
import { useProdDetail } from "@src/hooks/api/useProducts/useProductDetail";
import { useRouter } from "next/router";
import Errorhandler from "lib";
import { ToastContainer } from "react-toastify";

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
        <div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
export default Board;
