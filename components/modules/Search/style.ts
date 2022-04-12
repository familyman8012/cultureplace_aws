import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const SearchWrap = styled.form`
  position: relative;
  padding: 18px;
  margin-bottom: 30px;
  z-index: 70;
  background: #f1f1f1;
  &.on {
    display: block;
  }

  .title {
    width: 100px;
  }

  label,
  input[name="searchInput"],
  button {
    display: inline-block;

    color: #000;
    font-size: 14px;
    font-weight: normal;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 0 4px;
    text-align: center;
    box-sizing: border-box;
    padding: 7px 15px;
    cursor: pointer;
  }
  input[type="checkbox"] {
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  input[type="checkbox"]:checked + label {
    color: #ff005a;
    border: 1px solid #ff005a;
  }
  button {
    color: #fff;
    border: none;
    font-weight: normal;
  }
  .onSubmit {
    background: #4497ea;
  }
  .onReset {
    background: #000;
  }
  .txt_notice {
    display: none;
    font-size: 12px;
    margin-top: 15px;
  }

  .box_item {
    display: flex;
  }

  ${mq[0]} {
    display: none;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    height: fill-available;
    padding: 0;
    margin: 0;
    background: #fff;

    .title {
      width: 65px;
      font-size: 13px;
    }

    ul {
      li {
        display: block;
        margin: 15px 0;
        &:nth-of-type(1) {
          margin-top: 0;
        }

        .title {
          margin-bottom: 7px;
          font-size: 13px;
        }
        .box_item {
          display: grid;
          gap: 10px 5px;
          grid-template-columns: 1fr 1fr 1fr 1fr;

          div label {
            width: 100%;
            padding: 7px 0;
            font-size: 13px;
            &:nth-of-type(1) {
              margin-left: 0;
            }
          }
        }
      }
    }
  }
`;

export const MobileLayerHead = styled.div`
  display: none;
  ${mq[0]} {
    display: flex;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 12px;
    border-bottom: 1px solid #f4f4f4;
    h1 {
      width: calc(100% - 60px);
      text-align: center;
    }
  }
`;

export const Content = styled.div`
  ${mq[0]} {
    padding-top: 72px;
  }
`;

export const FilterFindWrap = styled.ul`
  > li {
    display: flex;
    align-items: center;
    padding: 8px 0;
    &:first-of-type {
      padding: 0;
    }
  }
  ${mq[0]} {
    padding: 0 18px;
  }
`;

export const SearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 15px;
  input[name="searchInput"] {
    width: 300px;
    text-align: left;
  }
  ${mq[0]} {
    padding: 0 18px;
    input[name="searchInput"] {
      font-size: 12px;
    }
  }
`;

export const ResultBtnWrap = styled.div`
  display: flex;
  align-items: center;
  ${mq[0]} {
    .title {
      display: none;
    }
    .box_btn {
      position: fixed;
      bottom: 0;
      width:100%;
    }
    .onSubmit,  .onReset {
     
      width: 50%;
      height: 50px;
      margin: 0;

      border-radius: 0;
      background: #ff005a;
    }
      .onSubmit {
        color: #fff;
        border: 1px solid #ff005a;
        background: #ff005a;
      }

      .onReset {
        color: #ff005a;
        border: 1px solid #ff005a;
        background: #fff;
      }
    }
  }
`;
