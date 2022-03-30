import styled from "@emotion/styled";
import { mq } from "@components/mq";

export const Mainvis = styled.div`
  overflow: hidden;
  position: relative;
  ${mq[0]} {
    .swiper .swiper-button-prev,
    .swiper .swiper-button-next {
      display: none;
    }
  }
`;

export const SlideItem = styled.div<{ i: number; on: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 65.5rem;
  background: url(/images/mainvis${({ i }) => i}.jpg) no-repeat center center;
  background-size: cover;
  .txtbox {
    opacity: 0;
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    transition: 1s all;
    p {
      color: #fff;
      letter-spacing: -0.3rem;
      line-height: 1;
      text-align: center;
    }
    .txt1,
    .txt2 {
      font-family: OTWelcomeBA;
    }
    .txt1 {
      font-size: 5rem;
    }
    .txt2 {
      font-size: 7.7rem;
      margin: 1.5rem 0 1rem;
    }
    .txt3 {
      letter-spacing: 0;
      line-height: 1.5;
    }
    a {
      display: block;
      width: 15.5rem;
      height: 4.8rem;
      line-height: 4.8rem;
      margin: 2rem auto 0;
      text-align: center;
      font-family: auto;
      font-size: 1.4rem;
      background: rgb(255, 217, 54);
      &:hover {
        background: rgb(218, 178, 0);
      }
    }
  }

  ${({ on }) =>
    on === "on" &&
    `.txtbox {
    opacity: 1;
    transform: translate(-50%, -50%);
    
  }`}
  ${mq[0]} {
    height: 192px;
    background: url(/images/mo_mainvis${({ i }) => i}.jpg) no-repeat center
      center;
    background-size: cover;
    .txtbox {
      display: none;
      width: 90%;

      .txt1 {
        font-size: 24px;
      }
      .txt2 {
        font-size: 30px;
      }
      .txt3 {
        font-size: 14px;
      }
      a {
        display: block;
        width: 90px;
        height: auto;
        padding: 1px 0;
        font-size: 12px;
        color: #262626;
      }
    }
  }
`;

export const TxtBox = styled.div``;
