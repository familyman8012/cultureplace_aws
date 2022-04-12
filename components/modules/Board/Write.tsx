import { ChangeEvent, useCallback, useEffect, useState } from "react";
import router from "next/router";
import axios, { AxiosResponse } from "axios";
import { observer } from "mobx-react";
import { boardStore, QuillStore } from "@src/mobx/store";
import { runInAction } from "mobx";
import QuillEditorView from "@components/modules/QuillEditor/QuillEditorView";
import { AdminBoxBtn } from "@components/modules/QuillEditor/styles";
import { WrapCommunityWrite } from "./styles";
import { useMutation, useQueryClient } from "react-query";
import { css } from "@emotion/react";
import { Session } from "next-auth";
import { IBoardWrite } from "@src/typings/db";

function Write({
  _id,
  session,
  boardname,
  boardCheck,
  noticeManager,
  listMove
}: {
  _id: string;
  session: Session;
  boardname: string;
  boardCheck: boolean;
  noticeManager: boolean;
  listMove?: string;
}) {
  const queryClient = useQueryClient();

  const [noticeCheckBox, setnoticeCheckBox] = useState(
    boardStore.noticeCheckBox
  );

  const onTitle = (e: ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      QuillStore.titleData = e.currentTarget.value;
    });
  };

  // 이전 : 이전화면으로 돌아가기
  const onPrev = useCallback(() => {
    boardCheck ? router.back() : router.push(`/community/${listMove}`);
    QuillStore.reset();
  }, [boardCheck, listMove]);

  // 글쓰기
  const onSubmitMutation = useMutation(
    () =>
      axios
        .post("/api/board/", {
          productId: _id,
          parentId: _id,
          noticecheck: noticeCheckBox,
          title: boardCheck ? QuillStore.titleData : "comment",
          body: QuillStore.data,
          userid: session?.user.uid,
          nickname: session?.user.nickname
        })
        .then((resp: AxiosResponse<IBoardWrite>) => {
          boardCheck && router.push(`/${boardname}/detail/${resp.data._id}`);
          let qlEditor = document.querySelector(".ql-editor");
          if (qlEditor !== null) qlEditor.innerHTML = "";
          boardStore.reset();
        }),
    {
      onSuccess: () => queryClient.invalidateQueries(["boardlist", _id]),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  // 글 수정
  const onModifyMutation = useMutation(
    () =>
      axios
        .patch(`/api/board/${QuillStore.modifyId}`, {
          noticecheck: noticeCheckBox,
          title: QuillStore.titleData,
          body: QuillStore.data
        })
        .then((resp: AxiosResponse<IBoardWrite>) => {
          let qlEditor = document.querySelector(".ql-editor");
          if (qlEditor !== null) qlEditor.innerHTML = "";
          boardStore.reset();
          boardCheck && router.back();

          // router.back();
          // noticeStore.reset();
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["boardlist", _id]);
        if (!boardCheck) {
          runInAction(() => {
            boardStore.replyModify = false;
          });
        }
      },
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  return (
    <>
      <WrapCommunityWrite className={boardStore.replyModify ? "on" : "off"}>
        {boardCheck && (
          <>
            <div>
              <input
                type="text"
                name="title"
                onChange={onTitle}
                value={undefined}
                defaultValue={QuillStore.titleData}
                placeholder="제목을 입력해 주세요."
              />
            </div>
            {noticeManager && (
              <div className="box_notice_chk">
                <input
                  type="checkbox"
                  name="notice"
                  id="noticeChk"
                  value="noticeChk"
                  checked={noticeCheckBox}
                  onChange={() => setnoticeCheckBox((prev: boolean) => !prev)}
                />
                <label
                  htmlFor="noticeChk"
                  css={css`
                    cursor: pointer;
                  `}
                >
                  공지로 등록
                </label>
              </div>
            )}
          </>
        )}
        <div className={boardCheck ? "post" : "reply"}>
          {!boardCheck && (
            <div className="comment__header flex-row">
              <div className="flex-column">
                <h5 className="comment__user-name">
                  {session.user.nickname}님, 답글을 남겨보세요!
                </h5>
              </div>
            </div>
          )}
          <QuillEditorView category="board" />
          <AdminBoxBtn>
            <button onClick={onPrev} className="btn_go_list">
              목록으로 이동
            </button>
            {QuillStore.state === "modify" ? (
              <button
                onClick={() => {
                  onModifyMutation.mutate();
                }}
              >
                {boardCheck && "글수정"}
                {!boardCheck && boardStore.replyModify && "글수정"}
                {!boardCheck && !boardStore.replyModify && "답글등록"}
              </button>
            ) : (
              <button
                onClick={() => {
                  if (
                    QuillStore.data === "" ||
                    QuillStore.data === "<p><br></p>"
                  ) {
                    alert("답글을 남겨보세요!");
                  } else {
                    onSubmitMutation.mutate();
                  }
                }}
              >
                {boardCheck ? "글등록" : "답글등록"}
              </button>
            )}
          </AdminBoxBtn>
        </div>
      </WrapCommunityWrite>

      <div className="dimm"></div>
    </>
  );
}

export default observer(Write);
