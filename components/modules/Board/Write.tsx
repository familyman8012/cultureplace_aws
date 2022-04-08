import { ChangeEvent, useCallback, useState } from "react";
import router from "next/router";
import axios from "axios";
import { observer } from "mobx-react";
import { boardStore, QuillStore } from "@src/mobx/store";
import { runInAction } from "mobx";
import QuillEditorView from "@components/modules/QuillEditor/QuillEditorView";
import { AdminBoxBtn } from "@components/modules/QuillEditor/styles";
import { WrapCommunityWrite } from "./styles";
import { useMutation, useQueryClient } from "react-query";
import { css } from "@emotion/react";
import { Session } from "next-auth";

function Write({
  _id,
  session,
  boardname,
  boardCheck,
  noticeManager
}: {
  _id: string;
  session: Session;
  boardname: string;
  boardCheck: boolean;
  noticeManager: boolean;
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
    router.back();
    QuillStore.reset();
  }, []);

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
        .then((resp: any) => {
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
        .then((resp: any) => {
          boardCheck && router.back();
          let qlEditor = document.querySelector(".ql-editor");
          if (qlEditor !== null) qlEditor.innerHTML = "";
          boardStore.reset();
          // router.back();
          // noticeStore.reset();
        }),
    {
      onSuccess: () => queryClient.invalidateQueries(["detailBoardData", _id]),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  return (
    <WrapCommunityWrite>
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
      <QuillEditorView category="board" />
      <AdminBoxBtn>
        <button onClick={onPrev}>이전으로 가기</button>
        {QuillStore.state === "modify" ? (
          <button onClick={() => onModifyMutation.mutate()}>글수정</button>
        ) : (
          <button onClick={() => onSubmitMutation.mutate()}>글등록</button>
        )}
      </AdminBoxBtn>
    </WrapCommunityWrite>
  );
}

export default observer(Write);
