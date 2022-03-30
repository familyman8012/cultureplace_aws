import styled from "@emotion/styled";

export const InfoMemberChartBox = styled.div`
  width: 100%;
  padding: 16px 0;
  border-radius: 10px;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 7%);
  border: solid 1px rgba(0, 0, 0, 0.02);
  background-color: var(--white);
  canvas {
    margin: 0 auto 30px;
  }
  background: #fff;
`;

export const BtnBox = styled.div`
  display: flex;
  margin-top: 23px;
  justify-content: center;
`;

export const Btn = styled.div`
  height: 30px;
  margin-right: 4px;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.brand};
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.brand};
  border-radius: 4px;
  line-height: 30px;
  &.on {
    color: #fff;
    background: ${({ theme }) => theme.color.brand};
  }
`;
