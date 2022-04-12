import { mq, tvq } from "@components/mq";
import styled from "@emotion/styled";

export const WrapCategoryView = styled.div`
  ${tvq} {
    width: 95%;
  }
  width: 128rem;
  margin: 5rem auto;
  > div {
    display: grid;
    gap: 2.2rem 2.7rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  ${mq[0]} {
    width: 100%;
    padding: 0 20px;
    > div {
      gap: 2.2rem 13px;
      grid-template-columns: 1fr 1fr;
    }
  }
`;
