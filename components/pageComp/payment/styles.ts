import { mq } from "@components/mq";
import styled from "@emotion/styled";

const WrapPayment = styled.div<{ type?: string }>`
  background: #f3f3f3;
  ${({ type }) => type === "complete" && "background: #fff;"}
  .wrap_box_area {
    display: flex;
    justify-content: center;
    padding-bottom: 7rem;
  }
  h2 {
    padding: 5rem 0 3rem;
    font-size: 28px;
    text-align: center;
  }
  h3 {
    font-size: 16px;
    margin-bottom: 1.5rem;
  }
  .info {
    margin-right: 1.5rem;
  }
  .box {
    padding: 2.4rem 1.6rem;
    background: #fff;
    &.box_product {
      width: 52rem;
      margin-bottom: 1.5rem;
      .cont {
        display: flex;
      }
    }
    &.box_user {
      .tel {
        width: 80%;
        height: 30px;
        margin-top: 1rem;
        padding-left: 1rem;
        border: 1px solid #ccc;
      }
    }
    &.box_price {
      width: 32.5rem;
      margin-bottom: 1.5rem;

      p {
        display: flex;
      }
      .price {
        margin-left: auto;
        font-size: 20px;
      }
    }
    .thumb {
      height: 90px;
      margin-right: 15px;
      img {
        height: 100%;
      }
    }
    .price {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .box_agree {
    input {
      margin-right: 1rem;
    }
    font-size: 13px;
  }
  .btn_pay {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 53px;
    cursor: pointer;
    background: #000;
  }
  ${mq[0]} {
    h2 {
      font-size: 20px;
    }
    .wrap_box_area {
      display: block;
      padding: 0 10px;
      .info {
        margin-right: 0;
      }
      .box {
        width: 100% !important;
      }
    }
    .btn_pay {
      margin-top: 10px;
    }
  }

  .wrap_pay_complete {
    width: 60rem;
    margin: 5rem auto;
    background: #fff;
    p {
      margin-top: 0;
      margin-bottom: 1em;
    }
    ul {
      margin: 3rem 0 0;
      li {
        border: 1px solid #ccc;
        border-bottom: 0;
        padding: 1.5rem 0;

        span {
          display: inline-block;
          &:first-of-type {
            width: 14rem;
            padding-left: 1.5rem;
          }
        }
      }
    }
    .box_btns {
      width: 60rem;
      border-top: 1px solid #6a6a6a;
      a {
        display: inline-block;
        width: 50%;
        text-align: center;
        border: 1px solid #6a6a6a;
        border-top: none;
        padding: 10px 0;
        background: #7a7a7a;
        color: #fff;
        &:hover {
          background: #6a6a6a;
        }
        &:last-child {
          color: #404040;
          background: #fff;
          &:hover {
            color: #404040;
            background: #e5e5e5;
          }
        }
      }
    }
  }
`;

export default WrapPayment;
