import { useEffect, useState } from "react";
import Detail from "@components/modules/Board/Detail";
import List from "@components/modules/Board/List";
import {
  WrapBoardDetail,
  WrapBoardReplyArea
} from "@components/modules/Board/styles";
import Write from "@components/modules/Board/Write";
import { useBoardDetail } from "@src/hooks/api/useBoard/useBoardDetail";
import { Errorhandler } from "lib";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BoardDetail() {
  const router = useRouter();
  const [session] = useSession();
  const [productId, setProductId] = useState("");

  useEffect(() => {
    setProductId(
      window?.location?.pathname.substring(
        window?.location?.pathname.lastIndexOf("/") + 1
      )
    );
  }, []);

  // const { _id } = params;

  // 게시물 리스트 가져오기
  const { status, data, error } = useBoardDetail(String(productId));

  //에러핸들링
  Errorhandler(status);

  return (
    <WrapBoardDetail>
      <>
        {status === "loading" ? (
          <div></div>
        ) : status === "error" ? (
          <>
            {/* <span>Error: {error.response?.data.err}</span> */}
            <ToastContainer />
          </>
        ) : (
          <>
            {productId !== "" && session && data ? (
              <>
                <Detail
                  _id={String(productId)}
                  data={data}
                  session={session}
                  router={router}
                  boardname="community"
                  boardCheck={true}
                />
                <WrapBoardReplyArea>
                  <List
                    parentId={String(productId)}
                    boardname="community"
                    boardCheck={false}
                  />
                  {productId !== "" && (
                    <Write
                      _id={String(productId)}
                      session={session}
                      boardname="community"
                      boardCheck={false}
                      noticeManager={false}
                      listMove={data.productId}
                    />
                  )}
                </WrapBoardReplyArea>
              </>
            ) : (
              <div>
                <ToastContainer />
              </div>
            )}
          </>
        )}
      </>
    </WrapBoardDetail>
  );
}

export default BoardDetail;
