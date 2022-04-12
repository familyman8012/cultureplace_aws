import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { mq, tvq } from "@components/mq";

export const WrapIndexContent = styled.div`
  width: 95%;
  margin: 0 auto;

  .wrap_search {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  ${mq[0]} {
    width: 100%;
    .wrap_search {
      display: block;
      width: 80%;
      margin: 30px auto;
      form {
        margin-top: 30px;
      }
    }

    p {
      text-align: center;
      color: #fff;
    }
  }
  .rc-pagination {
    display: flex;
    margin-top: 30px;
    justify-content: center;
    .rc-pagination-item,
    .rc-pagination-item-link {
      border: 1px solid #fff;
      background-color: rgba(255, 255, 255, 0.2);
      a {
        color: #fff;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.5);
      }
    }

    .rc-pagination-item-active {
      background: rgba(255, 194, 112, 0.5);
    }
  }
`;

export const IndexTable = styled.table`
  width: 100%;
  box-shadow: 0 0 20px rgb(0 0 0 / 10%);

  ${tvq} {
    colgroup {
      display: none;
    }
  }
  ${mq[0]} {
    width: 80%;
    margin: 30px auto;
    colgroup {
      display: none;
    }
  }
  tbody tr {
    &:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.5);
    }
    ${mq[0]} {
      display: block;
      overflow: hidden;
      margin-bottom: 30px;
      border: 1px solid #ccc;
      border-radius: 10px;
      &:hover {
        background-color: inherit;
      }
    }
  }
  th {
    padding: 15px 0;
    color: #fff;
    font-weight: 400;
    background-color: #55608f;

    ${mq[0]} {
      display: none;
    }
    ${tvq} {
      font-size: 11px;
      &:nth-of-type(3) {
        width: 28%;
      }
    }
  }
  td {
    .layerMember {
      display: none;
    }
    padding: 10px 0;
    text-align: center;
    color: #fff;
    font-weight: 100;
    img {
      width: 100px;
    }
    background-color: rgba(255, 255, 255, 0.2);

    &.info_creator {
      span {
        display: block;
        margin-bottom: 5px;
      }
    }
    &.live_status {
      button {
        text-decoration: underline;
        color: #31d2f2;
      }
    }
    &.btn_wrap {
      .box_btn_group {
        display: flex;
        width: fit-content;
        margin: 0 10px 0 auto;
      }

      ${mq[0]} {
        display: flex;
        .box_btn_group {
          width: fit-content;
          margin: 0 auto;
          padding: 20px 0;
        }
      }

      button {
        font-size: 12px;
        background: #000 !important;
        padding: 10px;
        color: #fff;
        border-radius: 10px;
        background: #ef6973;
        &.btn_vod {
          margin-right: 10px;
        }
        &:last-of-type {
          margin-left: auto;
        }
      }
    }
    ${mq[0]} {
      display: block;
      padding: 5px 0;
    }
    ${mq[1]} {
      font-size: 13px;
      img {
        width: 80px;
      }
      button {
        padding: 8px;
        font-size: 13px;
      }
    }

    ${tvq} {
      font-size: 11px;
    }
  }
`;

const glowing = keyframes`
0% { background-position: 0 0; }
50% { background-position: 400% 0; }
100% { background-position: 0 0; }
`;

export const AdminModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 3rem;

  .btn_close {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
    ${mq[0]} {
      padding: 0 10px;
    }
  }

  .box_btn {
    width: fit-content;
    margin: 30px auto 0;
    button {
      padding: 10px;
      color: #fff;
      background: #0b5ed7;
      &:last-of-type {
        margin-left: 20px;
        background: #000;
      }
    }
  }
`;

export const Dimm = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  content: "";
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

export const GlowBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 40px;
  margin-left: auto;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  ${mq[0]} {
    margin: 50px auto;
  }
  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${glowing} 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }
  &:active {
    color: #000;
    &:after {
      background: transparent;
    }
  }
  &:hover:before {
    opacity: 1;
  }
  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
  }
`;

export const BasicInfoForm = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0 1px 1px rgb(0 0 0 / 11%), 0 2px 2px rgb(0 0 0 / 11%),
    0 4px 4px rgb(0 0 0 / 11%), 0 8px 8px rgb(0 0 0 / 11%),
    0 16px 16px rgb(0 0 0 / 11%), 0 32px 32px rgb(0 0 0 / 11%);

  .box_imgupload {
    display: flex;
    .imgArea {
      overflow: hidden;
      width: 255px;
      height: 170px;
      border: 1px solid #ddd;
      img {
        width: 100%;
      }
    }
    input:not([type="checkbox"]),
    input:not([type="radio"]) {
      width: calc(100% - 255px);
      height: 170px;
      margin-bottom: 0;
    }
  }

  h2,
  label {
    display: block;
    margin: 15px 0 5px;
    font-weight: bold;
    color: #aaa;
  }

  select,
  input:not([type="checkbox"]),
  input:not([type="radio"]) {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.4rem;
    border: 1px solid #ddd;
    padding: 1rem 3.5rem 1rem 1.5rem;
    margin-bottom: 1.5rem;
    font-size: 14px;
  }

  #isvod {
    display: inline;
    width: auto;
    margin-left: 0;
    text-align: left;
  }

  .box_check_area {
    display: flex;
    align-items: center;
    label {
      margin: 0;
    }
    input {
      width: fit-content !important;
      margin: 0 0 0 50px !important;
    }
  }
  .box_radio_area {
    display: flex;
    h2,
    label {
      width: 80px;
      display: flex;
      align-items: center;
      height: fit-content;
      &:nth-of-type(3) {
        margin-left: 50px;
      }
    }
    input {
      margin: 0 !important;
    }
  }
  input[type="checkbox"],
  input[type="radio"] {
    border: 1px solid;
    appearance: auto;
    margin-left: 30px;
  }

  input[type="submit"],
  .button {
    background: #ec5990;
    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 2rem;
    padding: 1rem;
    font-size: 16px;
    font-weight: bold;
    display: block;
    appearance: none;
    border-radius: 0.4rem;
    width: 100%;
    font-weight: lighter;
  }

  ${mq[1]} {
    width:70vw;
    padding;0;
    .box_imgupload {
    .imgArea, #upload {width:50vw;height:auto;}
    }
  }
  ${mq[0]} {
    width:100vw;
    padding;0;
    .box_imgupload {
    .imgArea, #upload {width:50vw;height:auto;}
    }
  }
`;

export const ErrorTxt = styled.p`
  color: red;
`;

export const ConfirmView = styled.div`
  width: 907px;
  margin: 0 auto;
  .box_basic_info {
    display: flex;
  }
  .thumb {
    overflow: hidden;
    width: 417px;
    max-height: 230px;
    margin-right: 10px;
  }
  p {
    margin-top: 10px;
    font-size: 20px;
  }
  .list {
    p {
      font-size: 20px;
    }

    dl {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      dt,
      dd {
        width: 80%;
        padding: 10px 0;
        border: 1px solid #ddd;
        box-sizing: border-box;

        background: #fff;
      }
      dt {
        width: 20%;
        text-align: center;
      }
      dd {
        padding-left: 30px;
      }
    }
  }
  .content {
    overflow-y: auto;
    width: 100%;
    min-height: 800px;
    max-height: 800px;
    padding: 14px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    background: #fff;
    h2 {
      font-size: 28px;
      margin-bottom: 30px;
    }
    p {
      font-size: 18px;
      line-height: 1.56;
    }
    [data-list="bullet"] {
      .ql-ui {
        display: none;
      }
    }
  }
  ${mq[0]} {
    width: 90vw;
    padding-bottom: 20px;
    .box_basic_info {
      display: block;
      margin-bottom: 10px;

      .thumb {
        width: 100%;
        margin-bottom: 10px;
      }
    }
  }
`;

// 모임정보 Layer
export const MeetInfoLayer = styled.div`
  width: 426px;
  height: 300px;
  ${mq[0]} {
    width: 80%;
    * {
      font-size: 13px;
    }
    td {
      font-size: 11px;
    }
  }
  .btn_close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    color: #000;
  }
  td {
    padding: 10px;
  }
  .memberArea {
    overflow: auto;
    max-height: 500px;
    margin-top: 10px;
  }
`;

//커리큘럼 Layer
export const WrapCurriculumLayer = styled.div`
  max-width: 530px;
  width: 90vw;
  ${mq[0]} {
    * {
      font-size: 13px;
    }
  }
  .head {
    display: flex;
    margin-bottom: 20px;
    ${mq[0]} {
      button {
        font-size: 12px;
        margin-left: 30px;
        padding: 0 10px;
      }
    }
  }
  .cont {
    overflow: auto;
    max-height: 500px;
    li {
      display: flex;
      margin-bottom: 10px;
      padding: 20px;
      border: 1px solid;

      .title {
        width: 300px;
      }
      .box_btn_group {
        margin-left: auto;
        button {
          margin-right: 20px;
          &:last-of-type {
            margin-right: 0;
          }
        }
      }
      ${mq[0]} {
        padding: 10px 5px;
        .title {
          width: 195px;
        }
        .box_btn_group {
          button {
            margin-right: 10px;
          }
        }
      }
    }
  }
`;

// 커리큘럼 추가 layer
export const WrapCurriculumAddLayer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 20px;
  transform: translate(-50%, -50%);
  border: 1px solid;
  background: #fff;

  ${mq[0]} {
    * {
      font-size: 13px;
    }
    width: 90vw;
  }

  .title {
    display: inline-block;
    width: 50px;
  }

  input {
    width: calc(100% - 50px);
    margin-top: 5px;
  }

  .btn_close {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .box_btn_group {
    display: flex;
    justify-content: space-between;

    button {
      margin-top: 20px;
      padding: 0 10px;
    }
  }
`;

// 레슨 관리자 layer
export const WrapLessonManagement = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  border: 1px solid;
  background: #fff;

  .head {
    display: flex;
    padding: 15px;
    .box_btn_group {
      margin-left: auto;
    }
  }

  .wrap_lesson_list {
    overflow: auto;
    max-height: 600px;

    ul {
      li {
        cursor: grab;
        padding: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;

        .item {
          display: flex;
        }
        .box_btn_group {
          margin-left: auto;
        }
      }
    }
  }
  .bottom {
    display: flex;
    align-items: center;

    .notice {
      margin-left: auto;
      font-size: 13px;
    }
  }
  ${mq[0]} {
    * {
      font-size: 13px;
    }
    width: 100vw;
    .title {
      width: 195px;
    }
    .bottom {
      button {
        width: 110px;
      }
    }
  }
`;

// 레슨 추가 layer
export const WrapLessonAdd = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  padding: 20px 0;
  border: 1px solid;
  background: #fff;

  ${mq[0]} {
    width: 100vw;
    * {
      font-size: 13px;
    }
  }

  .head {
    display: flex;
    align-items: center;
    padding: 0 20px 20px;
    input {
      width: 350px;
      padding: 5px 10px;
      margin-left: 10px;
    }
    input {
      border: 1px solid;
    }
    button {
      margin-left: auto;
      font-size: 20px;
    }
  }
  .cont {
    #vid {
      display: none;
    }
    .box_inp_file {
      margin: 15px 0;
      padding: 0 20px;
    }
    .wrap_send_file {
      position: relative;
      width: 100%;
      height: 20px;
      margin: 20px 0;
      background: #d1d1d1;
    }
  }
  .box_btn_group {
    display: flex;
    button {
      margin: 0 20px 0 auto;
    }
  }
`;

export const WrapSendFile = styled.div<{ percent?: number }>`
  position: relative;
  width: 100%;
  height: 25px;
  margin: 20px 0;
  background: #d1d1d1;

  .bar {
    width: ${({ percent }) => percent}%;
    height: 20px;
    background: #fdc53f;
  }
  .txt {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const WrapLessonDetailView = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80vh;
  padding: 20px;
  border: 1px solid;
  transform: translate(-50%, -50%);
  background: #fff;

  .head {
    margin-bottom: 20px;
    .close {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 20px;
    }
  }

  .video_area {
    width: 300px;
    height: 169px;
    margin: 20px 0;
    background: #000;
  }
  .cont_txt {
    overflow: auto;
    max-height: 400px;
  }
`;
