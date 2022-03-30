import { ChangeEvent, useCallback } from "react";
import router from "next/router";
import axios from "axios";
import useMediaUp from "@src/hooks/useMediaUp";
import { observer } from "mobx-react";
import { noticeStore, QuillStore } from "@src/mobx/store";
import QuillEditorView from "@components/modules/QuillEditor/QuillEditorView";
import {
  AdminBoxBtn,
  WrapQuillText
} from "@components/modules/QuillEditor/styles";
import AdminLayout from "@components/layouts/Admin/layout";
import { BoxInput, WrapNotice } from "./styles";
import { css } from "@emotion/react";

function Detail() {
  const [imgData, onImgUpHadler] = useMediaUp("noticeoriginal");

  const onTitle = (e: ChangeEvent<HTMLInputElement>) => {
    QuillStore.titleData = e.currentTarget.value;
  };

  const onSummary = (e: ChangeEvent<HTMLInputElement>) => {
    noticeStore.summary = e.currentTarget.value;
  };

  const onCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    noticeStore.selCategory = e.currentTarget.value;
  };

  // 이전 : 이전 내용을 바꾸고 싶다면
  const onPrev = useCallback(() => {
    router.back();
  }, []);

  const onModify = () => {
    axios
      .put(`/api/notice/${QuillStore.modifyId}`, {
        title: QuillStore.titleData,
        body: QuillStore.data,
        imgurl: imgData !== "" ? imgData : noticeStore.imgurl,
        category: noticeStore.selCategory,
        summary: noticeStore.summary
      })
      .then(function (resp) {
        router.push("/admin/notice");
        noticeStore.reset();
      });
  };

  // 다음 : 상세정보 등록 : 확인하고 db로 저장하기
  const onSubmit = useCallback(() => {
    axios
      .post("/api/notice/", {
        title: QuillStore.titleData,
        body: QuillStore.data,
        imgurl: imgData,
        category: noticeStore.selCategory,
        summary: noticeStore.summary
      })
      .then(function (resp) {
        router.push("/admin/notice");
        noticeStore.reset();
      });
    //router.push("./confirm");
  }, [imgData]);

  console.log("noticeStore", noticeStore);

  console.log("imgData 느느느느??!23213", typeof imgData);

  return (
    <AdminLayout>
      <WrapNotice>
        <WrapQuillText>
          <BoxInput>
            <span>제목</span>
            <input
              type="text"
              name="title"
              onChange={onTitle}
              defaultValue={QuillStore.titleData}
            />
          </BoxInput>
          <BoxInput>
            <span>요약</span>
            <input
              type="text"
              name="title"
              onChange={onSummary}
              defaultValue={noticeStore.summary}
            />
          </BoxInput>
          <div>
            <BoxInput>
              {imgData !== "" ? (
                <img src={imgData} alt="모임대표이미지 등록" />
              ) : noticeStore.imgurl !== null ? (
                <img src={noticeStore.imgurl} alt="모임대표이미지 등록" />
              ) : null}
            </BoxInput>
            <BoxInput>
              <span>대표 이미지</span>
              <input
                type="file"
                id="upload"
                className="image-upload"
                onChange={onImgUpHadler}
              />
            </BoxInput>
          </div>
          <div>
            <BoxInput>
              <span>카테고리</span>
              <select
                onChange={onCategory}
                defaultValue={noticeStore.selCategory}
              >
                {noticeStore?.categoryData.map((item: string) => (
                  <option defaultValue={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </BoxInput>
          </div>
          <QuillEditorView category="상품등록" />
          <AdminBoxBtn>
            <button onClick={onPrev}>이전으로 가기</button>
            {QuillStore.state === "create" ? (
              <button onClick={onSubmit}>글등록</button>
            ) : (
              <button onClick={onModify}>글수정</button>
            )}
          </AdminBoxBtn>
        </WrapQuillText>
      </WrapNotice>
    </AdminLayout>
  );
}

export default observer(Detail);
