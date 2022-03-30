import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const ClubInfoTable = styled.table`
  width: 100%;
  th,
  td {
    padding-bottom: 12px;
    vertical-align: top;
    ul {
      margin-left: 0;
    }
    li {
      list-style: disc;
    }
  }
  th {
    width: 120px;
    text-align: left;
  }
  ${mq[0]} {
    th,
    td,
    td ul li {
      font-size: 13px;
      line-height: 1.5;
    }
    li {
      margin-bottom: 10px;
    }
  }
`;
