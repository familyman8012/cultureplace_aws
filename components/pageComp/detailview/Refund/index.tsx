import { useCallback, useState } from "react";
import Link from "next/link";
import Title from "../Title";
import SectionWrap from "../SectionWrap";
import Modal from "@components/elements/Modal";
import { RefundTable, ViewMore } from "./style";

function Index({ title }: { title: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => {
    setModalOpen(prev => !prev);
  }, []);
  return (
    <>
      <SectionWrap>
        <Title>환불안내</Title>
        <p>결제 당일 및 12월 03일 이전까지 전액 환불 가능</p>
        <ViewMore onClick={openModal}>더보기</ViewMore>
      </SectionWrap>

      {modalOpen && (
        <Modal title={`[${title}] 환불안내`} onClick={openModal}>
          <RefundTable>
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <thead>
              <tr>
                <th>멤버십 해지 신청 시점</th>
                <th>환불 금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1차 모임 D-8 이전</td>
                <td>210,000원</td>
              </tr>
              <tr>
                <td>
                  1차 모임 D-7
                  <br />~ 2차 모임 D-8
                </td>
                <td>97,500원</td>
              </tr>
              <tr>
                <td>
                  2차 모임 D-7
                  <br />~ 3차 모임 D-8
                </td>
                <td>65,000원</td>
              </tr>
              <tr>
                <td>
                  3차 모임 D-7
                  <br />~ 4차 모임 D-8
                </td>
                <td>32,500원</td>
              </tr>
              <tr>
                <td>4차 모임 D-7 이후</td>
                <td>환불 불가</td>
              </tr>
            </tbody>
          </RefundTable>
          <Link href="/">
            <a>환불 정책 자세히 알아보기</a>
          </Link>
        </Modal>
      )}
    </>
  );
}

export default Index;
