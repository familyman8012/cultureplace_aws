import { mq } from "@components/mq";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const WrapNoticeArea = styled.div`
  margin: 12rem 0 10rem;
  .box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  ${mq[0]} {
    .box {
      display: block;
      padding: 0 20px;
      a {
        display: block;
        margin-bottom: 20px;
      }
    }
  }
`;

export const TitleML = css`
  margin-left: 0;
  a {
    display: block;
  }
`;

export const NoticeWidth = css`
  margin-bottom: 55px;
`;

export const NoticeBox = styled.dl`
  width: 50rem;
  padding-bottom: 1.4rem;
  border-bottom: 1px solid #ecece9;
  background: url("/images/arrow_notice.png") no-repeat right center;
  dt {
    font-size: 16px;
    margin-bottom: 1rem;
  }

  .desc {
    font-size: 14px;
    margin-bottom: 1.8rem;
    line-height: 14px;
  }
  .writtenDate {
    font-size: 12px;
    color: #838380;
  }
  ${mq[0]} {
    width: 100%;
    dt {
      font-size: 14px;
    }
    .desc {
      padding-right: 60px;
      font-size: 12px;
      line-height: 1.5;
    }
  }
`;
