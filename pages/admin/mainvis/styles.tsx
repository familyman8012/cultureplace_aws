import styled from "@emotion/styled";

export const WrapMainVis = styled.div`
  margin: 0 auto;
  padding: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  a {
    display: inline-block;
    margin-bottom: 30px;
    padding: 10px 10px 10px 40px;
    color: #423630;
    border-radius: 5px;
    background: url("/images/ico_upload.png") #ffeb33 no-repeat 10px center;
  }
  > div {
    margin-bottom: 50px;
    button {
      padding: 10px;
      color: #fff;
      border-radius: 10px;
      background: #ef6973;
    }
    span {
      margin-right: 10px;
    }
    .pcimg {
      width: 550px;
    }
    .moimg {
      width: 180px;
    }
  }
`;

export const WrapDetailMV = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  padding: 25px 0;
  background: rgba(255, 255, 255, 0.2);

  select,
  input:not([type="checkbox"]),
  input:not([type="file"]) {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.4rem;
    border: 1px solid #ddd;
    padding: 1rem 3.5rem 1rem 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 14px;
  }
  .box_pc_img {
    width: 1100px;
    height: 309px;
    background: #ccc;
  }
  .box_mo_img {
    width: 360px;
    height: 408px;
    background: #ccc;
    img {
      width: 360px;
    }
  }
  button {
    padding: 10px;
    color: #423630;
    border-radius: 5px;
    background: #ffeb33;
  }
`;

const styles = () => {
  return <div></div>;
};

export default styles;
