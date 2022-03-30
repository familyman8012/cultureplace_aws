import { mq } from "@components/mq";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SearchWrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  ${mq[0]} {
    width: 100%;
    padding: 20px;
  }
`;

export const CardWrap = styled.div`
  display: grid;
  margin-top: 30px;
  gap: 22px 27px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  ${mq[0]} {
    margin-top: 20px;
    gap: 22px 5px;
    grid-template-columns: 1fr 1fr;
  }
`;
