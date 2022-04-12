import { mq, tvq } from "@components/mq";
import styled from "@emotion/styled";

// 마이페이지 index.tsx
export const MypageWrap = styled.div`
  display: flex;
  width: 1000px;
  min-height: 100vh;
  margin: 72px auto;

  .wrap_menu {
    li {
      margin-top: 15px;
    }
    min-width: 200px;
    margin-right: 78px;
    .userName {
      font-size: 30px;
      line-height: 40px;
      font-weight: 700;
    }
    .email {
      color: rgb(162, 162, 162);
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      letter-spacing: -0.15px;
      margin: 0px;

      margin-bottom: 40px;
    }
  }
  ${tvq} {
    width: 95%;
    .wrap_menu {
      min-width: 150px;
      margin-right: 30px;
    }
  }
  .wrap_cont {
    font-size: 18px;
    font-weight: bold;
    color: rgb(26, 26, 26);
    line-height: 24px;
    letter-spacing: -0.45px;
    margin: 0px;
    padding-top: 15px;
    .myjoin {
      margin-bottom: 100px;
    }
  }
  ${mq[0]} {
    display: block;
    width: 100%;
    margin: 0;
    .wrap_menu,
    .wrap_cont,
    .etcMenu {
      padding: 20px;
    }
    .wrap_menu {
      padding-bottom: 20px;
      .userName {
        font-size: 20px;
      }
      .email {
        margin-bottom: 20px;
      }
    }
    .wrap_cont {
      border-top: 8px solid rgb(244, 244, 244);
      border-bottom: 8px solid rgb(244, 244, 244);
      .myjoin {
        margin-bottom: 30px;
      }
    }
    .etcMenu {
      h2 {
        padding-bottom: 10px;
        color: rgb(202, 202, 202);
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
      }
      li {
        display: flex;
        margin-bottom: 15px;
        font-size: 14px;
        &:after {
          display: block;
          content: ">";
          margin-left: auto;
          color: rgb(202, 202, 202);
        }
      }
    }
  }
`;

// 마이페이지  컴포넌트
export const MypageComponent = styled.div`
  h3 {
    margin-bottom: 10px;
    font-size: 18px;
  }
  .nodata {
    width: 100%;
    margin-top: 30px;
    text-align: center;
    font-weight: normal;
  }
  .myMeet {
    display: grid;
    gap: 22px 27px;
    grid-template-columns: 1fr 1fr 1fr;
    .imgbox svg {
      display: none;
    }
  }
  ${mq[0]} {
    .myMeet {
      gap: 22px 5px;
      grid-template-columns: 1fr 1fr;
    }
  }
`;

// 내 결제
export const WrapPayedInfo = styled.div`
  .payed_list {
    margin-left: auto;
    &.no {
      margin: 30px 0 0 100px;
    }
  }
  .userInfo {
    .name {
      font-size: 20px;
      font-weight: bold;
    }
    .withdrawal {
      margin-top: 10px;
      color: #aaa;
    }
  }
  .item {
    margin-top: 50px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .top {
    display: flex;
    font-weight: normal;
    margin-bottom: 10px;
    .txt_pay_date {
      margin-left: auto;
    }
  }
  .box_payment_info {
    display: flex;
    padding: 1.5rem 0;
    border: 1px solid #ccc;
    .box {
      &:nth-of-type(1) {
        padding-left: 20px;
        width: 30%;
      }
      &:nth-of-type(2) {
        padding-left: 20px;
        width: 25%;
      }
      &:nth-of-type(3) {
        padding-left: 20px;
        width: 20%;
      }
      &:nth-of-type(4) {
        padding-left: 20px;
        width: 25%;
      }
    }
    dl,
    .box_btns {
      font-weight: normal;
    }
    dt {
      margin-bottom: 1rem;
      color: #999;
      font-size: 11px;
    }
    .box_btns {
      margin: 0 10px 0 auto;
      .button {
        border: 1px solid #ccc;
        padding: 3px;
        cursor: pointer;
        border-radius: 50px;
        &:first-of-type {
          margin-right: 10px;
        }
      }
    }
  }
  ${mq[0]} {
    .item {
      margin-top: 30px;
    }
    .top {
      font-size: 12px;
    }
    .box_payment_info {
      display: block;
      padding: 20px;
      dl {
        width: 100% !important;
        margin-bottom: 20px;
        padding-left: 0 !important;
        dt {
          font-size: 12px;
        }
        dd {
          font-size: 14px;
        }
      }
    }
    .box_btns a,
    .button {
      font-size: 14px !important;
    }
  }
`;
