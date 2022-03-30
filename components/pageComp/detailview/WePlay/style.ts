import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const PlayList = styled.div`
  display: flex;
  width: 690px;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mq[0]} {
    width: 100%;
  }
`;

export const Play = styled.dl<{ bgimg: string }>`
  width: 48%;
  margin-bottom: 30px;
  padding-top: 168px;
  background: url(${({ bgimg }) => bgimg}) no-repeat center top;
  background-size: auto 150px;
  dt,
  dd {
    text-align: center;
  }
  dt {
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.brand};
    line-height: 24px;
  }
  .desc p {
    font-size: 14px;
  }
  .subdesc {
    font-size: 13px;
    color: ${({ theme }) => theme.color.gray};
  }
  ${mq[0]} {
    dt {
      font-size: 16px;
    }
    dd.desc p {
      font-size: 13px;
    }
  }
`;
