import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const WrapNotice = styled.div`
  width: 915px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;

  ${mq[0]} {
    padding: 20px;
  }

  select,
  input:not([type="checkbox"]),
  input:not([type="radio"]),
  textarea {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.4rem;
    border: 1px solid #ddd;
    padding: 1rem 3.5rem 1rem 1.5rem;
    font-size: 14px;
  }
  .area_template_select {
    align-items: center;
    p {
      width: 100px;
      color: #2c2c2a;
    }
  }
`;

export const BoxInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    width: 100px;
  }
  img {
    width: 50%;
  }
`;
const styles = () => {
  return <div></div>;
};

export default styles;
