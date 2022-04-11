import { useCallback } from "react";
import router from "next/router";
import axios from "axios";
import { prodUpStore, QuillStore } from "@src/mobx/store";
import AdminLayout from "@components/layouts/Admin/layout";
import { ConfirmView } from "./styles";
import { AdminBoxBtn } from "@components/modules/QuillEditor/styles";

function Confirm() {
  // 데이터불러오기
  if (prodUpStore.data !== null) {
    prodUpStore.data.body = QuillStore.data;
    if (
      prodUpStore.data.saleprice === "" ||
      prodUpStore.data.saleprice === null
    ) {
      prodUpStore.data.saleprice = 0;
    }
    if (!prodUpStore.data.imgurl.match(/\S*\.gif/i)) {
      prodUpStore.data.imgurl = prodUpStore.data.imgurl.replace(
        /\/cardoriginal\//,
        "/card/"
      );
    }

    //등록
    const saveProduct = () => {
      axios.post("/api/product/", prodUpStore?.data).then(function (resp) {
        prodUpStore.reset();
        router.push("/admin/product");
      });
    };

    //수정
    const modifyConfrimProduct = (_id: string) => {
      axios.put(`/api/product/${_id}`, prodUpStore?.data).then(function (resp) {
        prodUpStore.reset();
        router.push("/admin/product");
      });
    };

    return (
      <AdminLayout>
        <>
          <ConfirmView>
            <div className="list">
              <h2>대표이미지</h2>
              <div>
                <img src={prodUpStore?.data.imgurl} alt="모임대표이미지 등록" />
              </div>
              <dl>
                <dt>제목</dt>
                <dd>{prodUpStore?.data.title}</dd>
                <dt>장소</dt>
                <dd>{prodUpStore?.data.location}</dd>
                <dt>모임주기</dt>
                <dd>{prodUpStore?.data.meetingcycle}</dd>
                <dt>시작일</dt>
                <dd>{prodUpStore?.data.firstmeet}</dd>
              </dl>
              <h2>상세페이지</h2>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: prodUpStore?.data.body }}
              />
            </div>
            <p>를 등록하시겠습니까?</p>
            <AdminBoxBtn>
              <button onClick={() => router.back()}>뒤로</button>
              {prodUpStore.state === "create" ? (
                <button onClick={saveProduct}>등록</button>
              ) : (
                <button
                  onClick={() => modifyConfrimProduct(prodUpStore?.data._id)}
                >
                  수정
                </button>
              )}
            </AdminBoxBtn>
          </ConfirmView>
        </>
        )
      </AdminLayout>
    );
  }
  return <div>상품을 다시 등록해주세요</div>;
}

export default Confirm;
