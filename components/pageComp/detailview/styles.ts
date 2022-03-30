import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const DetailViewWrap = styled.div`
  max-width: 1240px;
  min-height: 100vh;
  margin: 5rem auto;
  ${mq[0]} {
    overflow: hidden;
    max-width: 100vw;
    margin: 0;
  }
`;

export const Content = styled.div`
  width: calc(100% - 380px);
  margin-top: 30px;
  &.event {
    margin-left: calc(320px + 5%);
    InfoCard {
      left: 0;
      right: auto;
    }
  }
  ${mq[0]} {
    width: auto;

    p img {
      width: calc(100% + 40px);
      max-width: calc(100% + 40px);
      margin-left: -20px;
    }
  }
  ${mq[1]} {
    padding: 0 40px;
  }
`;

export const EditTxt = styled.div`
  * {
    font-size: 16px;
    line-height: 1.8;
  }

  h2 {
    font-size: 20px;
    font-weight: bold;
  }
  h4,
  h4 strong {
    font-size: 20px;
    font-weight: bold;
    margin: 36px 0 0;
    line-height: 28px;
  }

  li {
    margin-left: 5rem;
    list-style: disc;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-size-small {
    display: block;
    font-size: 14px;
    line-height: 1.5;
  }

  hr {
    border-top: none;
  }
  ${mq[0]} {
    padding: 0 20px;
  }
`;
