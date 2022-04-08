import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const WrapInfoCard = styled.div`
  position: fixed;
  top: 11rem;
  width: 124rem;
  ${mq[0]} {
    position: static;
    width: 100%;
  }
  ${mq[1]} {
    width: 100vw;
  }
`;

export const InfoCard = styled.div`
  position: absolute;
  right: -100px;
  width: 350px;
  box-shadow: 5px 10px 30px 0 rgb(93 97 112 / 21%);
  background-color: white;
  padding: 32px;
  border: none;
  ${mq[0]} {
    position: relative;
    left: 0;
    width: 100%;
    padding: 0;
    box-shadow: none;
    border-bottom: 8px solid rgb(244, 244, 244);
  }
  .txtbox {
    ${mq[0]} {
      padding: 0 20px;
    }
    h2 {
      margin: 20px 0 9px;
      color: #2a2a2c;
      font-size: 19px;
      font-weight: bold;
      line-height: 1.59;
    }

    .meetInfo {
      margin-bottom: 8px;
      div span {
        margin: 0 0 8px;
        color: #737373;
        font-size: 14px;
        font-weight: bold;
        line-height: 1.5;
      }
    }
    .comment {
      display: inline;
      padding: 1px 5px;
      font-size: 13px;
      background: rgb(229, 255, 57);
    }
    .wrap_price {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      margin-bottom: 20px;
      padding-top: 15px;

      .price {
        position: relative;
        font-size: 16px;
        font-weight: bold;
        color: #2a2a2c;
        letter-spacing: -0.25px;
        &.issale {
          margin-right: 10px;
          color: #838380;
          font-weight: normal;
          text-decoration: line-through;
        }
        &:nth-of-type(2) {
          margin-left: 10px;
        }
        .txt {
          position: absolute;
          top: -16px;
          left: 0;
          width: 100%;
          font-size: 12px;
          font-weight: 300;
          color: #aaaaaf;
          text-align: left;
        }
      }
    }
    .wrap_price2 .price {
      font-size: 20px;
      border-bottom: 1px solid;
    }
  }
  .box_btn {
    display: flex;
    button:nth-of-type(2) {
      margin: 0 5px;
    }
    button:last-of-type {
      width: 76px;
      height: auto;
      font-size: 14px;
    }
    ${mq[0]} {
      position: fixed;
      bottom: 56px;
      left: 0px;
      width: 100%;
      height: 72px;
      padding: 10px 20px 10px;
      box-shadow: rgb(0 0 0 / 8%) 0px -10px 30px -10px;
      background-color: white;
      z-index: 200;
      button {
        height: auto;
      }
    }
  }
  &.event {
    left: 0;
    right: auto;
    box-shadow: none;
    h2 {
      margin: 0 0 40px;
      padding: 0 32px;
      font-size: 32px;
      font-weight: bold;
      text-align: center;
    }
    .meetInfo {
      margin: 28px 0 32px;
      span {
        font-size: 16px;
        font-weight: normal;
        &.tit {
          color: ${({ theme }) => theme.color.brand};
          font-weight: 600;
        }
      }
    }
    .price {
      font-size: 26px;
      font-weight: bold;
      text-align: left;
    }
  }
  ${mq[0]} {
    .txtbox {
      h2 {
        margin: 10px 0 0px;
      }
      .meetInfo {
        margin-bottom: 3px;
      }

      .wrap_price {
        margin-bottom: 5px;
      }
      .wrap_price2 {
        margin-bottom: 20px;
      }
    }
  }
  ${mq[1]} {
    right: 25px;
  }
`;

export const MobileLinkArea = styled.div`
  display: none;
  ${mq[0]} {
    position: absolute;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 60px;
    z-index: 1;
    padding: 10px 12px 10px 10px;
    text-align: right;
    .link_back,
    .link_home {
      width: 32px;
      height: 32px;
    }
    .link_back {
      background: url(/images/ico_back.svg) no-repeat center;
    }
    .link_home {
      background: url(/images/ico_home.svg) no-repeat center;
    }
  }
`;

export const FavoriteState = styled.button<{ favorite: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 4px;
  background: #f4eeea;
  background-image: url(${({ favorite }) =>
    favorite ? "/images/favorite_on.png" : "/images/favorite.png"});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 22px 27px;
`;
