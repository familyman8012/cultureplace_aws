import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const WrapCategory = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-content: flex-start;
  margin: 0px auto;
  max-width: 1010px;
  width: 100%;
  padding: 0px 20px;
  min-height: 1px;

  .inner {
    padding: 0px 42px;
    ${mq[0]} {
      padding: 0;
    }
  }

  h1 {
    margin: 24px 0px 16px;
    line-height: 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const WrapCategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  justify-items: center;

  ${mq[0]} {
    grid-template-columns: repeat(2, 1fr);
  }

  a {
    width: 100%;
  }
`;

export const ListItem = styled.div<{ index: number }>`
  display: flex;
  align-items: flex-end;
  height: 77px;
  border-radius: 5px;
  padding: 6px 10px;
  background-image: url(${({ index }) => `/images/link_cat${index + 1}.jpg`});
  background-color: rgb(244, 244, 244);
  background-size: cover;
  color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.48px;
  position: relative;

  .dimm {
    opacity: 0.2;
    background-color: rgb(17, 17, 17);
    height: 100%;
    width: 100%;
    left: 0px;
    bottom: 0px;
    position: absolute;
    border-radius: 5px;
  }

  .dimm_gradient {
    opacity: 0.2;
    background-image: linear-gradient(
      to right,
      rgb(3, 0, 0),
      rgba(2, 0, 0, 0.52),
      rgba(0, 0, 0, 0)
    );
    width: 94px;
    height: 100%;
    left: 0px;
    bottom: 0px;
    position: absolute;
    border-radius: 5px;
  }

  .txt {
    z-index: 1;
    color: white;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.48px;
  }
`;
