import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const TitleArea = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  margin: 3rem 1rem 2.5rem 0;
  ${({ type }) => type === "first" && "margin-top : 4rem"};

  h2 {
    display: inline-block;
    margin: 2px 0 0 3px;
    font-size: 21px;
    font-weight: bold;
    color: #222222;
    &:before {
      display: inline-block;
      width: 3px;
      height: 22px;
      margin-right: 8px;
      margin-bottom: -3px;
      content: "";
      background-color: #70b8ff;
    }
  }
  a {
    margin-left: 8px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.brand};
    svg {
      margin-left: 5px;
    }
  }
  ${mq[0]} {
    padding: 0 20px;
    h2 {
      margin-left: 0;
    }
    &:nth-of-type(1) {
      h2:after {
        display: inline;
      }
    }
    h2 {
      font-size: 18px;
      &:before {
        display: none;
      }
    }
    a {
      display: none;
      margin-left: auto;
      font-size: 14px;
      font-weight: normal;
      color: #000;
      svg {
        display: none;
      }
    }
  }
`;
