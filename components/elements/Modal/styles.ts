import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background: #fff;
  a {
    display: block;
    text-align: right;
    text-decoration: underline;
    margin-top: 10px;
  }
  ${mq[0]} {
    top: 45%;
    width: 90%;
    a {
      font-size: 13px;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  position: relative;
  height: 29px;
  margin-bottom: 41px;
  align-items: center;
  h2 {
    display: flex;
    width: calc(100% - 50px);
    margin-bottom: 0;
    font-size: 16px;
    align-items: center;
  }
  ${mq[0]} {
    margin-bottom: 20px;
    h2 {
      font-size: 14px;
      width: calc(100% - 35px);
      height: 40px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`;

export const BtnClose = styled.span`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  cursor: pointer;
  background: url("/images/btn_close.png") no-repeat left top;
  background-size: 18px;
`;

export const ModalBody = styled.div`
  background: #fff;
`;
