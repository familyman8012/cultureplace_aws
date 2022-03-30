import { mq } from "@components/mq";
import { css } from "@emotion/react";

export const moreBtn = css`
  display: block;
  width: 33.6rem;
  margin: 120px auto 0;
  ${mq[0]} {
    width: calc(100% - 40px);
    height: 40px;
    margin: 20px;
  }
`;
