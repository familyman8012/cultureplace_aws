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
    width: 100%;
    p {
      text-align: center;
      color: #fff;
    }
  }
  .rc-pagination {
    display: flex;
    margin-top: 30px;
    justify-content: center;
  }

  .btn_box {
    display: flex;

    button {
      width: 100px;
      margin: 15px 0 0 auto;
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
`;

// 글쓰기 게시판
export const WrapCommunityWrite = styled.div`
  max-width: 915px;
  width: 98%;
  margin: 0 auto;
  padding: 30px 0;
  background: #fff;

  input[name="title"] {
    width: 100%;
    padding: 5px;
  }

  .box_notice_chk {
    display: flex;
    align-items: center;
    margin: 15px 0;
    font-size: 13px;

    input[type="checkbox"] {
      margin-right: 7px;
    }
  }

  .ql-container.ql-snow {
    height: 60vh;
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
  max-width: 750px;
  margin: 0 auto;

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
`;

export default styles;
