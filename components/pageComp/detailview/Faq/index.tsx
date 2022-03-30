import React from "react";
import Title from "../Title";
import styled from "@emotion/styled";
import Accordion from "../../../modules/Accordion";
import Link from "next/link";
import SectionWrap from "../SectionWrap";
import Collapsible from "react-collapsible";
import { css } from "@emotion/react";
import { FaqWrap } from "./style";

function index() {
  const FaqList = [
    {
      title: "1. 컬쳐플레이스 멤버가 되면 어떤 혜택이 있나요?",
      text: (
        <>
          <p>
            <strong>문화모임</strong> 월 1회, 총 4번의 컬쳐플레이스 문화모임에
            참여하게 됩니다. (일부 6회)
          </p>
          <p>
            <strong>이벤트</strong> 보고 경험하고 주인공이 될 수 있는 사랑스러운
            이벤트에 참여하실 수 있어요.
          </p>
          <p>
            <strong>아지트</strong> 컬쳐플레이스 멤버가 모여 함께 하고 놀 수
            있는 공간이 제공돼요.
          </p>
        </>
      )
    },
    {
      title: "2. 메모리얼 리뷰를 제출하지 않으면 정말 모임에 참가할 수 없나요?",
      text: (
        <>
          <p>컬쳐플레이스는 적극적 참여로 만들어지는 모임입니다.</p>
          <p>
            추억을 쌓고 취미를 즐기고 함께 하며, 희노애락을 함께 하는 것들을
            기록해주세요.
          </p>
          <p>
            시간이 지나 뒤돌아 보면, 그땐 그랬지 하고 좋은 추억이 쌓여있을
            거에요.
          </p>
        </>
      )
    },
    {
      title: "3. 모임 진행 순서는 어떻게 되나요?",
      text: (
        <>
          <p>
            <strong>자신에게 맞는 모임 선택</strong> 모임을 선택해서 결제.
          </p>
          <p>
            <strong>단톡방</strong> 시즌 시작 후, 순차적으로 단톡방을 개설하여
            초대해드립니다.
          </p>
          <p>
            <strong>메모리얼 리뷰</strong> 모임 이후 메모리얼 리뷰를 3일
            이후까지 제출해주세요! (컬쳐플레이스 홈페이지&gt; 마이페이지)
          </p>
          <p>
            <strong>모임참석</strong> 상세페이지에 안내된 첫 모임, 장소에서
            정해진 발제문으로 대화를 나누어요.
          </p>
          <p>
            <strong>뒷풀이&amp;번개</strong> 모임 이후 함께 뒷풀이를 가거나, 한
            달에 한 번 번개에 참여해요.
          </p>
        </>
      )
    },
    {
      title: "4. 어떤 이야기를 나누나요?",
      text: (
        <>
          <p>컬쳐플레이스에서 우린 어떤 대화를 나누게 될까요?</p>
          <p>
            우리는 서로 가진 의견을 꺼내어 생각을 발전시킬 수 있는 주제, 또는
            서로 의견이 달라 논쟁할 수 있는 주제로 이야기를 나누게 될 거예요.
          </p>
        </>
      )
    }
  ];
  return (
    <SectionWrap>
      <Title>FAQ</Title>
      <FaqWrap>
        {FaqList.map((el, i) => (
          <Collapsible
            key={i}
            trigger={el.title}
            transitionTime={200}
            open={i === 0 ? true : false}
          >
            {el.text}
          </Collapsible>
        ))}
      </FaqWrap>
    </SectionWrap>
  );
}

export default index;
