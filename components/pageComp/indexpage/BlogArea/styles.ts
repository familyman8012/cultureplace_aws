import { mq } from "@components/mq";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const WrapBlogArea = styled.div`
  .cont {
    display: flex;
    justify-content: space-between;
  }

  .blogwidth {
    width: 31%;
  }

  Title {
    margin: 12rem 0 3.6rem;
  }
  ${mq[0]} {
    display: none;
  }
`;

export const NoticeTitle = css`
  margin: 12rem 0 3.6rem;
`;

export const WrapBlogCont = styled.div`
  display: flex;
  justify-content: space-between;
  ${mq[0]} {
    display: block;
    padding: 0 20px;

    .blogwidth {
      display: block;
      width: 100%;
      margin-bottom: 30px;
      &:last-of-type {
        display: none;
      }
    }
  }
`;
