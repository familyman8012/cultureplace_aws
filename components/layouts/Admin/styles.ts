import { tvq } from "@components/mq";
import styled from "@emotion/styled";

const breakpoints = [760, 1100];
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

export const WrapLayout = styled.div`
  display: flex;
  .left {
    width: 150px;
    padding: 10px;
    background: #001529;
    ul {
      li {
        color: #fff;
        margin-bottom: 15px;
      }
    }
    ${mq[0]} {
      display: none;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: calc(100vw - 150px);
    min-height: 100vh;
    padding: 50px 0;
    background: linear-gradient(45deg, #49a09d, #5f2c82);

    ${tvq} {
      padding: 0 15px;
    }
    ${mq[1]} {
      align-items: flex-start;
      padding-top: 50px;
    }
    ${mq[0]} {
      width: 100%;
      padding: 0;
    }
  }
`;
