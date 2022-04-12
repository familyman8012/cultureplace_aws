import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { mq, tvq } from "@components/mq";

export const CardWrap = styled.div<{ type: string }>`
  overflow: hidden;
  margin: 0 auto 2.2rem auto;

  dl,
  dt,
  dd {
    margin: 0;
    padding: 0;
    font-family: MalgunGothic;
    span {
      font-family: MalgunGothic;
    }
  }

  .imgbox {
    overflow: hidden;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      transform: scale(1);
      transition: transform 0.3s ease 0s, opacity 0.1s linear 0s !important;
    }
  }
  .txtbox {
    position: relative;
    padding: 0.5rem 1rem 1.5rem;

    dd {
      &.title {
        font-size: 15px;
      }
      &.meetinfobox {
        margin-top: 0.5rem;
        margin-bottom: 0;
        font-size: 11px;
      }
      &.todo {
        color: #1778b5;
        font-weight: 600;
        line-height: 1.8;
      }
      &.people {
        font-size: 14px;
      }
      span {
        color: ${({ theme }) => theme.color.gray};
      }
    }
  }
  ${({ type }) =>
    type === "basic" &&
    `
      border-radius: 0.3rem;
      .imgbox {
        position: relative;
        height: 20.7rem;
      }
      .txtbox {
        dt {
          padding: 0.7rem 0 0.2rem;
          font-size: 12px;
          font-weight: bold;
        }
        dd {
          &.title {
            font-size: 14px;
            font-weight: normal;
            line-height: 20px;
            letter-spacing: -0.15px;
            color: rgb(26, 26, 26);
            height: 40px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin: 0.4rem 0px 0.8rem;
          }
          &.favoriteNumber {
            font-size: 11px;
            font-weight: normal;
            line-height: 16px;
            letter-spacing: normal;
            margin: 0px 0.8rem 0px 0px;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            color: #a2a2a2;
            svg {
              margin-right: 2px;
              color: #d7d7d7;
            }
          }
          &.wrap_price,
          .priceNum {
            display: flex;
            font-size: 13px;
            font-weight: 700;
            ${tvq} {
              font-size:11px;
            }
            .saleper {
              color: #fd3049;
            }
            .priceNum {
              .price:nth-of-type(1) {
                margin: 0 0.5rem;
                color: #000;
              }
              .price:nth-of-type(2) {
                font-weight: normal;
                text-decoration: line-through;
              }
            }
          }
        }
      }     
    `}
  ${({ type }) =>
    type === "other" &&
    `
    width: 100%;
    border: none;
    border-radius: 0;
    .imgbox {
      position: relative;
    }
    .txtbox {
      padding: 1.2rem 0;
      dt {
        font-size: 16px;
        font-weight: 500;
        color: #7b7b7b;
      }
      dd {
        &.desc {
          font-size: 15px;
        }
        &.meetinfobox {
          position: static;
          font-size: 14px;
        }
      }
    }`}
    ${({ type }) =>
    type === "event" &&
    `
    border-radius: 0;
      border: 1px solid #d8d8d8;
      .imgbox {
        height: 23.2rem;
      }
      .txtbox {
        position: relative;
        padding: 0;
        dt {
          height: 6rem;
          margin-bottom: 1rem;
          margin: 1.5rem 1.5rem 0;
          font-size: 20px;
          border-bottom: 1px solid #d8d8d8;
        }
        dd {
          &.people {
            margin: 1rem;
          }
          &.meetinfobox {
            position: static;
            padding: 1rem 1.5rem;
            border-top: 1px solid #d8d8d8;
            background: #f7f7f7;
          }
        }
      }
    `}
    ${mq[0]} {
    .wrap_price {
      border-top: 1px solid #f8f8f8;
      padding-top: 5px;
      margin-top: 5px;
    }
  }
`;
