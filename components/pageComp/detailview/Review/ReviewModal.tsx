import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Modal from "@components/elements/Modal";
import { IProduct, IReviewEdit } from "@src/typings/db";
import React, { Dispatch, SetStateAction } from "react";
import { UseMutationResult } from "react-query";
import { ProductInfo, ReviewWrite, SaveButton, WriteArea } from "./style";

interface IReviewModal {
  openModal: () => void;
  saveReviewMutation: UseMutationResult<void, unknown, void, unknown>;
  updateReviewMutation: UseMutationResult<void, unknown, string, unknown>;
  review: IReviewEdit;
  setReview: Dispatch<SetStateAction<IReviewEdit>>;
  modalState: { _id: string; state: string };
  item: IProduct;
}

function index({
  openModal,
  saveReviewMutation,
  updateReviewMutation,
  review,
  setReview,
  modalState,
  item
}: IReviewModal) {
  const onWriteReview = (
    target: string,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview({ ...review, [target]: e.target.value });
  };

  const { imgurl, title, todo } = item;

  return (
    <Modal title="리뷰등록" onClick={openModal}>
      <ReviewWrite>
        <ProductInfo>
          <span className="thumb">
            <img src={imgurl} alt={title} />
          </span>
          <span className="txt">{title}</span>
        </ProductInfo>
        <WriteArea>
          <input
            type="text"
            id="title"
            placeholder="제목"
            value={review.title}
            onChange={e => onWriteReview("title", e)}
          />
          <input
            type="text"
            id="username"
            value={review.username}
            onChange={e => onWriteReview("username", e)}
            placeholder="이름"
          />
          <textarea
            id="content"
            css={css`
              border: 1px solid;
            `}
            value={review.content}
            onChange={e => onWriteReview("content", e)}
            placeholder="어떤 점이 좋으셨나요?"
          ></textarea>
          {modalState.state === "save" && (
            <SaveButton
              onClick={() => {
                saveReviewMutation.mutate();
                openModal();
              }}
            >
              글등록
            </SaveButton>
          )}
          {modalState.state === "modify" && (
            <SaveButton
              onClick={() => {
                updateReviewMutation.mutate(modalState._id);
                openModal();
              }}
            >
              수정
            </SaveButton>
          )}
        </WriteArea>
      </ReviewWrite>
    </Modal>
  );
}

export default index;
