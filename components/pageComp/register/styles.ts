import { mq } from "@components/mq";
import styled from "@emotion/styled";

const RegisterForm = styled.div`
  width: 49rem;
  margin: 3rem auto;
  h2 {
    margin-bottom: 3rem;
    font-size: 26px;
  }
  label {
    vertical-align: middle;
    margin-top: 30px;
    margin-bottom: 5px;
    display: block;
    color: #616161;
    font-size: 14px;
  }

  .login_form form {
    margin-top: 20px;
    border-top: 1px solid #ccc;
    .tit {
      font-weight: normal;
      padding: 1rem 0;
    }
    label {
      display: block;
      margin: 20px 0;
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
    input:not([type="radio"]) {
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
    input[type="submit"] {
      background: #ec5990;
      color: white;
      font-weight: 300;
    }
  }

  select,
  input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]) {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.4rem;
    border: 1px solid #ddd;
    padding: 1rem 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 14px;
  }
  .box_radio {
    input[type="radio"] {
      margin-left: 50px;
      margin-right: 10px;
      &:first-of-type {
        margin-left: 0;
      }
    }
  }

  .txt_read_yakawn {
    margin: 0 0 15px;
    padding: 15px 0;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.85);
    border-bottom: 1px solid rgba(16, 22, 26, 0.15);
    a {
      color: #1890ff;
    }
  }
  .btn_login {
    display: block;
    width: 100%;
    border-radius: 3px;
    margin-bottom: 8px;
    color: rgb(58, 58, 58);
    line-height: 48px;
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    border: 1px solid #aaa;
    .btn_inner {
      padding-left: 30px;
      margin-left: -30px;
      font-weight: 500;
    }
    &.Kakao {
      border: none;
      background-color: rgb(255, 232, 18) !important;
      .btn_inner {
        background: url("/images/ico_kakao.png") no-repeat left center;
        background-size: 24px;
      }
    }
    &.Google {
      background-color: #fff;
      .btn_inner {
        background: url("/images/ico_google.png") no-repeat left center;
        background-size: 24px;
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
  .notice_yakwan {
    font-size: 12px;
    text-align: center;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(16, 22, 26, 0.15);
  }

  ${mq[0]} {
    width: 100%;
    margin: 0;
    padding: 20px;
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

export default RegisterForm;
