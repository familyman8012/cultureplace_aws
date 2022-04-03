import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const LoginWrapper = styled.div`
  display: flex;
  height: calc((var(--vh, 1vh) * 100) - 28px);
  * {
    font-family: "Noto Sans KR", "Arial", sans-serif;
    line-height: 1;
  }

  .login_area {
    display: flex;
    width: 50%;
    flex-direction: column;
    background: #fff;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 18px;
      font-weight: 500;
    }
    h2 {
      margin: 3rem 0;
      font-size: 36px;
      font-weight: 500;
    }
    .login_form {
      width: 37.6rem;
    }
  }

  .login_mv {
    width: 50%;
    background: url("/images/login_bg.jpg") no-repeat center top;
    background-size: cover;
  }

  .btn_login {
    display: block;
    width: 100%;
    border-radius: 3px;
    margin-bottom: 8px;
    color: rgb(58, 58, 58);
    line-height: 48px;
    text-align: center;
    font-weight: bold;
    border: 1px solid #aaa;
    .btn_inner {
      padding-left: 3rem;
      margin-left: -3rem;
      font-weight: 500;
    }
    &.Kakao {
      border: none;
      background-color: rgb(255, 232, 18) !important;
      .btn_inner {
        background: url("/images/ico_kakao.png") no-repeat left center;
        background-size: 2.4rem;
      }
    }
    &.Google {
      background-color: #fff;
      .btn_inner {
        background: url("/images/ico_google.png") no-repeat left center;
        background-size: 2.4rem;
      }
    }
    &.otherLogin {
      font-weight: normal;
      border: none;
      background: rgb(248, 248, 248);
      &:hover {
        background: #dfdfdf;
      }
    }
  }

  .txt_read_yakawn {
    margin-top: 10px;
    font-size: 11px;
    color: #cacaca;
    a {
      color: rgb(0, 78, 195);
    }
  }

  .login_form form {
    margin-top: 30px;
    padding: 20px 0;
    border-top: 1px solid #ccc;
    .tit {
      font-weight: normal;
      padding: 1rem 0;
    }
    label {
      display: block;
      margin-bottom: 15px;
      &:nth-of-type(2) {
        margin-bottom: 10px;
      }
      .tit {
        color: rgb(58, 58, 58);
        font-family: "맑은고딕";
        font-weight: normal;
        font-size: 14px;
      }
    }
    input {
      display: block;
      border: 1px solid rgb(239, 239, 239);
      border-radius: 3px;
      appearance: none;
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      letter-spacing: -0.15px;
      background-color: white;
      height: 48px;
      width: 100%;
      color: rgb(26, 26, 26);
      box-sizing: border-box;
      padding: 0px 16px;
      &::placeholder {
        color: #cacaca;
      }
    }
  }

  .btn_submit_login {
    display: block;
    background: #ec5990;
    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 40px;
    padding: 1.5rem;
    font-size: 16px;
    font-weight: bold;
    display: block;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 0.4rem;
    width: 100%;
    font-weight: lighter;
  }
  ${mq[0]} {
    padding: 0 20px;
    .login_area {
      width: 100%;
      .login_form {
        width: 100%;
      }
    }
    .login_mv {
      display: none;
    }
    .btn_login {
      .btn_inner {
        padding-left: 24px;
        margin-left: -24px;
        font-weight: normal;
        background-size: 18px !important;
      }
    }
  }
`;

export const InfoRegArea = styled.div`
  display: flex;
  span {
    font-size: 12px;
    color: #cacaca;
  }
  .reg {
    margin-left: auto;
  }
`;

export const BtnLogin = styled.button`
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 15px;
  color: white;
  font-size: 16px;
  font-weight: 300;
  border: none;
  border-radius: 4px;
  background: #ec5990;
  appearance: none;
`;
