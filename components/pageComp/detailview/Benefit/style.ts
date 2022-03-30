import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const BenefitTxt = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const BenefitWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mq[0]} {
    display: block;
  }
`;

export const BenefitList = styled.dl<{ bgimg: string }>`
  width: 45%;
  margin-bottom: 17px;
  dt {
    margin-bottom: 4px;
    padding-left: 22px;
    background: url(${({ bgimg }) => bgimg}) no-repeat left top;
    background-size: 19px 22px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.56;
    letter-spacing: -0.43px;
  }
  ${mq[0]} {
    width: 100%;
    margin-bottom: 30px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;
