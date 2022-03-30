/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import Button from "../Button";

interface StyledComponentProps {
  type?: string;
}

const FloatingArea = styled.div`
  * {
    margin: 0;
    padding: 0;
  }
  width: 38rem;
  padding: 3.2rem;
  box-shadow: 5px 10px 30px 0 rgb(93 97 112 / 21%);
  background-color: white;
  .txt_info {
    margin-top: 2rem;
    .people {
      font-weight: 600;
    }
    .title {
      margin: 0.8rem 0;
      font-size: 22px;
      font-weight: bold;
    }
    .meetInfo p {
      font-size: 14px;
      font-weight: 600;
      color: #737373;
    }
  }
  .price {
    margin: 0.8rem 0;
    font-size: 20px;
    text-align: right;
  }
  .btn_box {
    display: flex;
    place-content: space-between;
  }
  ${({ type }: StyledComponentProps) =>
    type === "event" &&
    css`
      width: 32rem;
      padding: 0;
      box-shadow: none;
      .eventInfo {
        margin: 2.4rem 0 3.2rem;
        p span {
            font-weight:600;
          color:  #ff7900}
        }
      }
      .price_event {
        .cost {
            color: gray;
            text-decoration:
            line-through;font-size: 20px;
        }
      }
      .sale {
          font-size:2.6rem;
          font-weight:bold;
          span {letter-spacing:-1;color:  #ff7900}
      }
    `};
`;

function Floating({ type = "event" }: StyledComponentProps) {
  return (
    <FloatingArea type={type}>
      <div className="thumb">
        <img src="/images/thumb3.png" alt="" />
      </div>
      {type === "basic" && (
        <>
          <div className="txt_info">
            <p className="people">정체성 탐구에 진심인 심리학자 박선웅 님의</p>
            <p className="title">본 아이덴티티</p>
            <div className="meetInfo">
              <p>
                <span>강남 아지트</span>
                <span>매달 네 번째 목요일</span>
              </p>
              <p>시작일날 11.25(목) 19:40 ~ 22:40</p>
            </div>
          </div>

          <div className="price">월 77,500원</div>
          <div className="btn_box">
            <Button color="darkgray" size="l" favorite>
              <span className="hiddenZoneV">즐겨찾기</span>
            </Button>
            <button className="favorite">
              <span className="hiddenZoneV">즐겨찾기</span>
            </button>
            <Button color="brand" size="l">
              달라지는 4개월, 지금 시작
            </Button>
          </div>
        </>
      )}
      {type === "event" && (
        <>
          <div className="eventInfo">
            <p>
              <span>일시:</span> 2021.9.9(목) 오후07시40분 ~ 10시 50분
            </p>
            <p>
              <span>장소:</span> 2021.9.9(목) 오후07시40분 ~ 10시 50분
            </p>
          </div>
          <div className="price_event">
            <div className="cost">비멤버 59,000원</div>
            <div className="sale">
              멤버 45,000원 <span>(24%)</span>
            </div>
          </div>
        </>
      )}
    </FloatingArea>
  );
}

export default Floating;
