import { mq } from "@components/mq";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ViewMore = styled.span`
  display: inline-block;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
`;

export const RefundModalTitle = css`
  display: flex;
  width: 250px;
  height: 29px;
  align-items: center;
  font-size: 14px;
`;

export const RefundTable = styled.table`
  width: 628px;
  margin: 16px;
  tr {
    &:hover {
      background: #ececec;
    }
    &:last-child td {
      border-bottom: none;
    }
  }
  th {
    padding: 5px;
    text-align: center;
    background: #dadada;
    &:last-child td {
      border-bottom: none;
    }
  }
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #e2e6e9;
  }
  ${mq[0]} {
    width: 100%;
    margin: 0;
    th,
    td {
      font-size: 13px;
    }
  }
`;
