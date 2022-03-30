import { mq } from "@components/mq";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ReviewTitle = styled.p`
  display: block;
  margin-bottom: 3.7rem;
  color: #ff8400;
  font-size: 14px;
  line-height: 1.5;
`;

export const ReviewList = styled.div`
  .rc-pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  ${mq[0]} {
    button[color="brand"] {
      margin-top: 20px;
    }
  }
`;

export const WriteBtn = css`
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

export const Item = styled.li`
  padding: 20px 0;
  border-bottom: 2px solid #eee;
  cursor: pointer;

  &:first-of-type {
    padding-top: 0;
  }
  &:nth-of-type(1),
  &:nth-of-type(2) {
    .title {
      margin-bottom: 8px;
    }
    .content {
      height: 45px;
    }
  }
  &.on {
    .title {
      margin-bottom: 8px;
    }
    .content {
      height: auto;
    }
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.56;
    letter-spacing: -0.4px;
    color: rgb(42, 42, 44);
  }
  .content {
    overflow: hidden;
    width: 95%;
    height: 0;
    font-size: 15px;
    line-height: 1.47;
    letter-spacing: -0.37px;
    color: rgba(42, 42, 44, 0.9);
  }
  .username {
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.23;
    color: rgba(0, 0, 0, 0.5);
    background: url("/images/arrow_review.webp") no-repeat right 3px;
    background-size: 16px 10px;
  }
  .del {
    margin: 0 10px;
  }
`;

export const ReviewWrite = styled.div`
  width: 95%;
  margin: 0 auto;
`;

export const ProductInfo = styled.div`
  display: flex;
  width: 100%;
  height: 100px;

  border: 1px solid #e5e5e5;
  .thumb,
  .txt {
    height: 100%;
  }
  .thumb {
    border-right: 0;
    img {
      height: 100%;
    }
  }
  .txt {
    width: 80%;
    display: flex;
    padding-left: 15px;
    align-items: center;
    margin-left: 0;
    padding: 0 5px;
  }
  ${mq[0]} {
    font-size: 13px;
  }
`;

export const WriteArea = styled.div`
  margin-top: 40px;
  input {
    padding: 5px 10px;
    border: 1px solid #e5e5e5;
    &:nth-of-type(1) {
      margin-right: 10px;
    }
  }
  textarea {
    width: 100%;
    height: 24rem;
    margin-top: 5px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #e5e5e5;
    line-height: 1.5;
  }
  ${mq[0]} {
    margin-top: 20px;
    input {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;

export const SaveButton = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  line-height: 5rem;
  border-radius: 5px;
  background: #4f4f4f;
  display: block;
  ${mq[0]} {
    margin-top: 10px;
    font-size: 14px;
    font-weight: normal;
    line-height: 40px;
  }
`;
