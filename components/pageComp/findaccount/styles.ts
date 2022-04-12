import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const FindAccountWrap = styled.div`
  width: 100vw;
  justify-content: center;

  ul.tab {    
    display: flex;
    width: 49rem;
    margin: 3rem auto;
     margin-bottom: 50px;

     ${mq[0]} {
       width:100%;
       margin:20px 25px;
     }
    
     li{      
      margin-right:10px;
      padding: 10px 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      
      &.on {
      color:#fff;
      background:#ff005a;
      border:none;
    }
  }
}
  }
`;
export const FindIdPwdWrap = styled.div`
  min-height: 450px;
`;
export const ResultBox = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid;
  border-top: 3px solid #6097f7;

  ul {
    display: block;
    width: 80%;
    text-align: center;
    margin-top: 10px;
    padding: 10px;
    background: lightgray;

    li {
      border: none;
    }
  }

  button {
    display: block;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 3px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    font-size: 14px;
    font-weight: normal;
    line-height: 20px;
    letter-spacing: -0.15px;
    height: 48px;
    width: 100%;
    color: rgb(26, 26, 26);
    box-sizing: border-box;
    padding: 0px 16px;
    background: #6097f7;
    color: white;
    font-weight: 300;
    margin-top: 10px;
  }
`;
