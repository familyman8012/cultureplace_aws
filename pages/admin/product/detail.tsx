import { useCallback } from "react";
import router from "next/router";
import { observer } from "mobx-react";
import AdminLayout from "@components/layouts/Admin/layout";
import QuillEditorView from "@components/modules/QuillEditor/QuillEditorView";
import {
  AdminBoxBtn,
  WrapQuillText
} from "@components/modules/QuillEditor/styles";
import { prodUpStore } from "@src/mobx/store";

function Detail() {
  // basicinfo 화면으로 이동
  const onPrev = useCallback(() => {
    router.push("./basicInfo");
  }, []);

  // 등록화면으로 이동 // 2022.01.27 추가 내용. vod 일 경우, 커리큘럼 추가하는 화면으로 이동.
  const onSubmit = useCallback(() => {
    {
      prodUpStore.data.genre === "vod"
        ? router.push("./curriculum")
        : router.push("./confirm");
    }
  }, []);

  return (
    <AdminLayout>
      <WrapQuillText>
        <QuillEditorView category="상품등록" />
        <AdminBoxBtn>
          <button onClick={onPrev}>이전으로 가기</button>
          <button onClick={onSubmit}>확인</button>
        </AdminBoxBtn>
      </WrapQuillText>
    </AdminLayout>
  );
}

export default observer(Detail);
