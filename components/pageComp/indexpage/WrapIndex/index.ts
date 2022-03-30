import styled from "@emotion/styled";
import { mq } from "@components/mq";

const WrapIndex = styled.div`
  max-width: 1150px;
  width: 100%;
  margin: 0 auto;
  ${mq[0]} {
    width: 100%;
  }
  ${mq[1]} {
    padding: 0 65px;
  }
`;

export default WrapIndex;
