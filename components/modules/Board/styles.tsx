import { mq } from "@components/mq";
import styled from "@emotion/styled";

const styles = () => {
  return <div></div>;
};

// 리스트 레이아웃
export const WrapBoardContent = styled.div`
  width: 95%;
  margin: 0 auto;

  ${mq[0]} {
    padding: 10px 0 30px 0;
  }
  .rc-pagination {
    display: flex;
    margin-top: 30px;
    justify-content: center;
    ${mq[0]} {
      transform: scale(0.8);
    }
  }

  .btn_box {
    display: flex;

    button {
      width: 80px;
      height: 34px;
      margin: 15px 0 0 auto;
      font-size: 14px;
    }
  }
`;

// 리스트 게시판
export const BoardTable = styled.table`
  * {
    font-family: "Apple SD Gothic Neo", "맑은 고딕", "Malgun Gothic", 돋움,
      dotum, sans-serif;
  }
  width: 100%;
  margin-top: 20px;
  tr.noticeTr {
    background: #f9f9f8;

    td.title {
      color: #ff4e59;
      font-weight: bold;
    }
  }
  th,
  td {
    font-size: 14px;
  }
  th {
    padding: 12px 0;
    color: #4e4e4e;
    border-top: 1px solid #333;
    border-bottom: 1px solid #f2f2f2;
  }
  td {
    padding: 8px 0;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid #f2f2f2;
    .comment_count {
      margin-left: 7px;
      color: #ff2f3b;
      font-weight: bold;
    }
    .badge_notice {
      display: block;
      width: 56px;
      height: 21px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 800;
      line-height: 19px;
      border: 1px solid #ffc6c9;
      background-color: #ffe3e4;
      color: #ff4e59;
    }
    &:nth-of-type(1) {
      padding: 0 7px 0 0;
    }
    color: #000;
  }
  ${mq[0]} {
    width: 100%;
    th,
    td {
      font-size: 12px;
    }
    col:nth-of-type(1),
    th:nth-of-type(1),
    td:nth-of-type(1) {
      display: none;
    }
    th:nth-of-type(2),
    td:nth-of-type(2) {
      text-align: left;
      padding-left: 10px;
      width: 70%;
    }
  }
`;

// 글쓰기 게시판
export const WrapCommunityWrite = styled.div`
  max-width: 915px;
  width: 98%;
  margin: 0 auto;
  padding: 30px 0;

  &.on {
    position: fixed;
    z-index: 5;
    width: 98%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50px);
    padding: 0;
    margin-top: -100px;

    .btn_go_list {
      display: none;
    }
  }

  input[name="title"] {
    width: 100%;
    padding: 5px;
    margin-bottom: 15px;
  }

  .box_notice_chk {
    display: flex;
    align-items: center;
    margin: 0 0 15px;
    font-size: 13px;

    input[type="checkbox"] {
      margin-right: 7px;
    }
  }

  .ql-container.ql-snow {
    height: 60vh;
  }
  .reply {
    max-width: 750px;
    margin: 0 auto;
    .ql-container.ql-snow {
      height: 200px;
    }
    .comment__header {
      padding: 20px 29px;
      border-bottom: none;
      background: #fff;
      position: relative;
      border: 1px solid #e9ecef;
      border-bottom: none;
      border-radius: 8px 8px 0px 0px;
      background-color: #fff;
    }
    .comment__user-name {
      margin-bottom: 4px;
      font-size: 15px;
      font-weight: 700;
      color: #1b1c1d;
      line-height: 1.47;
    }
  }

  &.on + .dimm {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
  }

  .area_template_select {
    align-items: center;
    p {
      width: 100px;
      color: #2c2c2a;
    }
  }
`;

// 상세보기
export const WrapBoardDetail = styled.div`
  width: 100%;
`;

export const WrapBoardReplyArea = styled.section`
  width: 100%;
  border-top: 1px solid #f1f3f5;
  border-bottom: 1px solid #f1f3f5;
  background-color: #f8f9fa;
`;

// 게시물
export const WrapPost = styled.section`
  width: 95%;
  max-width: 750px;
  margin: 43px auto 30px;
  ${mq[0]} {
    margin: 20px auto 30px;
  }
  .wrap_header {
    padding: 0 0 15px;
    border-bottom: 1px solid #ccc;
  }
  .header_title {
    display: flex;
    .badge_notice {
      display: none;
    }
    h1 {
      display: inline;
      word-break: break-all;
      font-size: 24px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.42;
      letter-spacing: -0.3px;
      color: #212529;
      margin-bottom: 10px;
      align-items: center;
    }
  }
  .header__sub-title {
    display: flex;
    flex-direction: row;
    height: 20px;

    .nickname {
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.43;
      color: #495057;
    }

    .creat-at {
      height: 20px;
      margin-left: 5px;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.43;
      color: #adb5bd;
    }

    .btn_box {
      display: flex;
      align-items: center;
      margin-left: auto;

      button {
        color: #616568;
        text-decoration: underline;
        border: unset;
        background-color: unset;
        font-weight: 500;
        padding: 0 12px;
        height: 40px;
        line-height: 1.43;
        font-size: 14px;
        letter-spacing: -0.3px;
      }
    }
  }
  .content {
    padding: 16px 0;
    margin-bottom: 16px;
    line-height: 1.5;
    word-wrap: break-word;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeSpeed;
  }
`;

// 답글
export const WrapReply = styled.div`
  width: 95%;
  max-width: 820px;
  margin: 0 auto;

  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
  }
  .flex-right {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .answer-info__header {
    padding: 16px 30px 8px;
    .header__title {
      margin-bottom: 0;
      height: 42px;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: -0.3px;
      color: #616568;
    }
  }
  .answer__comment {
    position: relative;
    margin-bottom: 16px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background-color: #fff;
  }
  .comment__index {
    position: absolute;
    top: 16px;
    left: -40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #e9bd05;
    border: 1px solid #e2b600;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
  }
  .comment__card {
    padding: 20px 29px;
    border-bottom: 1px solid #f1f3f5;
    overflow-x: auto;
    .comment__header {
      padding-bottom: 20px;
      align-items: center;
      border-bottom: 1px solid #f1f3f5;
    }

    .comment__user-profile {
      margin-right: 8px;
      width: 48px;
      height: 48px;
      border-radius: 100px;
      border: 1px solid #f1f3f5;
      -o-object-fit: cover;
      object-fit: cover;
    }
    .comment__updated-at {
      font-size: 13px;
      font-weight: 400;
      color: #abb0b5;
      letter-spacing: -0.3px;
      line-height: 1.38;
    }
    .comment__body {
      padding: 20px 0;
      overflow-x: auto;
      .comment__features {
        overflow-x: auto;
      }
      .content {
        margin-bottom: 20px;
      }
      .ac-button {
        text-decoration: underline;
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.43;
        color: #616568;
        margin-left: 16px;
      }
    }
  }
`;

export default styles;
