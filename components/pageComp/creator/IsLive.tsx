import React, { Dispatch, SetStateAction, useCallback } from "react";
import axios from "axios";

interface IShowLive {
  show: boolean;
  productId: string;
  productName: string;
  islive: boolean;
}

interface ILive {
  showLiveModal: IShowLive;
  setShowLiveModal: Dispatch<SetStateAction<IShowLive>>;
  refetch: () => void;
}

function IsLive({ showLiveModal, setShowLiveModal, refetch }: ILive) {
  //레이어모달 - islive 닫기
  const handlerCloseLiveModal = useCallback(() => {
    setShowLiveModal({
      show: false,
      productId: "",
      productName: "",
      islive: false
    });
  }, [setShowLiveModal]);

  //레이어모달 - islive 상태 변경
  const handlerChangeLiveModal = useCallback(() => {
    axios
      .patch(`/api/product/${showLiveModal.productId}`, {
        islive: !showLiveModal.islive
      })
      .then(res => {
        handlerCloseLiveModal();
        refetch();
      });
  }, [
    handlerCloseLiveModal,
    refetch,
    showLiveModal.islive,
    showLiveModal.productId
  ]);

  return (
    <>
      <span className="btn_close" onClick={handlerCloseLiveModal}>
        x
      </span>
      <div className="cont">
        {showLiveModal.productName} 을{" "}
        {showLiveModal.islive ? "unlive" : "live"} 상태로 변경하시겠습니까?
      </div>
      <div className="box_btn">
        <button onClick={handlerChangeLiveModal}>확인</button>
        <button onClick={handlerCloseLiveModal}>취소</button>
      </div>
    </>
  );
}

export default IsLive;
