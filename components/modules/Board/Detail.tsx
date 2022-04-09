import { useCallback, useMemo, useState } from "react";
import { runInAction } from "mobx";
import { Session } from "next-auth";
import axios from "axios";
import { NextRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { boardStore } from "@src/mobx/store";
import { IBoard } from "@src/typings/db";
import { WrapPost } from "./styles";
import dayjs from "dayjs";
import { DayCal } from "lib";

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

  // 버튼클릭시 2번 안눌리게
  const [btnDisable, setbtnDisable] = useState(false);

  //게시물 수정하러가기
  const modifyBoard = useCallback(() => {
    runInAction(() => {
      boardStore.moveModifyBoard(_id, `${boardname}`, boardCheck);
    });
    setbtnDisable(false);
  }, [_id, boardCheck, boardname]);

  //게시물 삭제
  const deleteMutation = useMutation(
    (_id: string) =>
      axios.delete(`/api/board/${_id}`).then(res => {
        return res.data;
      }),
    {
      onSuccess: () => {
        setbtnDisable(false);
        queryClient.invalidateQueries(["boardlist", _id]);
        router.push(`/${boardname}/${data?.productId}`);
      },
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
        setbtnDisable(false);
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
                    modifyBoard;
                    setbtnDisable(true);
                  }}
                  disabled={btnDisable}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    deleteMutation.mutate(_id);
                    setbtnDisable(true);
                  }}
                  disabled={btnDisable}
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
