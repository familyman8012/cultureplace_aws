import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const FaqWrap = styled.div`
  .Collapsible {
    padding: 30px 0;
    border-bottom: 1px solid #dedede;
  }
  .Collapsible p {
    margin-bottom: 10px;
    line-height: 1.5;
  }
  .Collapsible__trigger {
    cursor: pointer;
  }
  .is-open + .Collapsible__contentOuter {
    display: block;
    margin-top: 15px;
    padding: 15px;
    background: #f8f8f8;
  }
`;
