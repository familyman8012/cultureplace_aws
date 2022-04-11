import { MouseEventHandler } from "react";
import {
  ModalOverlay,
  ModalWrap,
  ModalHeader,
  ModalBody,
  BtnClose
} from "./styles";

interface IModal {
  title: string;
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLSpanElement>;
}

function Modal({ title, children, onClick }: IModal) {
  return (
    <ModalOverlay>
      <ModalWrap>
        <ModalHeader>
          <h2>{title}</h2>
          <BtnClose onClick={onClick}>
            <span className="hiddenZoneV">닫기</span>
          </BtnClose>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalWrap>
    </ModalOverlay>
  );
}

export default Modal;
