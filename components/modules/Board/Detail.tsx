import { useCallback } from "react";
import { Session } from "next-auth";
import { NextRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { runInAction } from "mobx";
import axios from "axios";
import { boardStore } from "@src/mobx/store";
import { IBoard } from "@src/typings/db";
import { DayCal } from "lib";
import { WrapPost } from "./styles";

export interface IEmProduct {
  creator: string;
}

function Detail({
  _id,
  data,
  session,
  router,
  boardname,
  boardCheck
}: {
  _id: string;
  data: IBoard;
  session: Session;
  router: NextRouter;
  boardname: string;
  boardCheck: boolean;
}) {
  const queryClient = useQueryClient();

  //게시물 수정하러가기
  const modifyBoard = useCallback(() => {
    runInAction(() => {
      boardStore.moveModifyBoard(_id, `${boardname}`, boardCheck);
    });
  }, [_id, boardCheck, boardname]);

  //게시물 삭제
  const deleteMutation = useMutation(
    (_id: string) =>
      axios.delete(`/api/board/${_id}`).then(res => {
        return res.data;
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["boardlist", _id]);
        router.push(`/${boardname}/${data?.productId}`);
      },
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  //답글 날짜
  const DayFunc = useCallback(() => DayCal(data.createdAt), [data.createdAt]);

  return (
    <WrapPost>
      <div className="wrap_header">
        <div className="header_title">
          {data?.noticecheck && <em className="badge_notice">공지</em>}
          <h1 className="title">{data?.title}</h1>
        </div>
        <div className="header__sub-title">
          <span className="nickname">{data?.nickname}</span>
          <span className="creat-at">{DayFunc()}</span>
          <div className="btn_box">
            <button
              onClick={() => router.push(`/${boardname}/${data?.productId}`)}
            >
              목록
            </button>
            {(session.user.uid === data.userid ||
              session.user.role === "master") && (
              <>
                <button
                  onClick={() => {
                    modifyBoard();
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    deleteMutation.mutate(_id);
                  }}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="content">
        {data && (
          <div dangerouslySetInnerHTML={{ __html: String(data.body) }} />
        )}
      </div>
    </WrapPost>
  );
}

export default Detail;
