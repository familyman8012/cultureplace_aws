import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const CurriculumList = styled.div`
  border-top: 1px solid #f3f3f6;

  margin: 48px 0 0;
  padding: 30px 20px;
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: rgb(26, 26, 26);
    line-height: 34px;
    letter-spacing: -0.4px;
    margin: 0px;
    word-break: keep-all;
  }
  p {
    margin: 12px 0px 16px;
    font-size: 14px;
    line-height: 24px;
    text-align: left;
    color: rgb(26, 26, 26);
  }
  h3 {
    margin-top: 20px;
    font-size: 20px;
    line-height: 28px;
    font-weight: normal;
    color: rgb(162, 162, 162);
  }
  ul li {
    font-size: 14px;
    font-weight: normal;
    line-height: 20px;
    letter-spacing: -0.15px;
    margin-top: 12px;
    flex: 1 1 auto;
    color: rgb(26, 26, 26);
  }
`;
