import React from "react";
import styled from "@emotion/styled";
import Title from "../Title";
import SectionWrap from "../SectionWrap";
import { Play, PlayList } from "./style";
import { css } from "@emotion/react";

const memberTxtList = [
  {
    id: "play1",
    title: "직접 하고,",
    desc: (
      <p>
        뮤지컬, 연극, 요리, 그림,
        <br /> 공예, 사진 등 각종 문화의
        <br /> 주인공은 바로 당신입니다.
      </p>
    ),
    subDesc: ""
  },
  {
    id: "play2",
    title: "보고,",
    desc: (
      <p>
        컬쳐플레이스의 친구들과
        <br /> 함께 영화, 공연, 전시회등을 놀러가요.
      </p>
    )
  },
  {
    id: "play3",
    title: "즐기고, 배우고",
    desc: (
      <p>
        카르페디엠, 현재를 즐겨요.
        <br /> 컬쳐플레이스는 즐기고, 배우기 위해
        <br /> 만들어진 곳입니다.
      </p>
    ),
    subDesc: (
      <p
        css={css`
          margin-top: 10px;
          font-size: 12px;
        `}
      >
        지적허영은 NoNo, 컬쳐플레이스는
        <br />
        새로운 친구를 사귀고 즐기는 곳이에요.
      </p>
    )
  },
  {
    id: "play4",
    title: "추억하자.",
    desc: (
      <p>
        메모리얼 리뷰, 블로그,
        <br /> 인스타, 틱톡, 유튜브등
        <br />
        다양한 곳에 우리의 즐거웠던
        <br /> 순간들을 기록합니다.
      </p>
    ),
    subDesc: (
      <p
        css={css`
          margin-top: 10px;
          font-size: 12px;
        `}
      >
        시간이 지나 뒤돌아 봤을 때, 이때 우리는 이랬었구나 추억할 수 있을
        거에요.
      </p>
    )
  }
];

function index() {
  return (
    <SectionWrap>
      <Title>컬쳐플레이스 클럽의 멤버가 되면? 👀</Title>
      <PlayList>
        {memberTxtList.map((item, i) => (
          <Play
            key={item.id}
            id={item.id}
            bgimg={`/images/ico_play${i + 1}.jpg`}
          >
            <dt>{item.title}</dt>
            <dd className="desc">{item.desc}</dd>
            {/* <dd className="subdesc">{item.subDesc}</dd> */}
          </Play>
        ))}
      </PlayList>
    </SectionWrap>
  );
}

export default index;
