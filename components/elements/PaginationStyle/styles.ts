import { mq } from "@components/mq";
import { css } from "@emotion/react";

export const PaginationStyle = css`
  width: fit-content;
  margin: 20px auto;
  ${mq[0]} {
    li {
      height: 24px;
        padding: 0;
        min-width: 24px;
        a {font-size:14px;}
      }
    }
  }
`;
