import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const InfoWrap = styled.div`
  width: 980px;
  margin: 50px auto;
  .box_info {
    .tit-heading-wrap {
      position: relative;
      height: 60px;
      margin-top: 30px;
      border-bottom: 3px solid #241d1e;
      h3 {
        display: inline-block;
        position: relative;
        height: inherit;
        margin: 0;
        background-image: none;
        color: #222;
        font-weight: 500;
        font-size: 36px;
        text-align: left;
        vertical-align: middle;
      }
      .submenu {
        position: absolute;
        top: 18px;
        right: 0;
        ul {
          overflow: hidden;
          li {
            float: left;
            margin-left: 15px;
            padding-left: 12px;
            &.on {
              background: url(https://img.cgv.co.kr/r2014/images/common/ico/ico_arrow07.png)
                no-repeat left center;
              color: #fb4357;
            }
            &:hover,
            &:focus {
              color: #fb4357;
            }
            a {
              display: inline-block;
              padding-left: 13px;
              font-weight: 500;
              font-size: 14px;
            }
            &:first-of-type {
              margin-left: 0;
            }
          }
        }
      }
    }
    .txt3 {
      margin-top: 10px;
      .infosource {
        margin-left: auto;
      }
    }
    ol {
      overflow: hidden;
      width: 100%;
      padding-top: 30px;
      > li {
        float: left;
        width: 197px;
        margin-left: 64px;
        padding-bottom: 70px;
        &:nth-of-type(1) {
          margin-left: 0;
        }
      }
    }
    [class|="sect"][class*="chart"] .box-image {
      position: relative;
      width: 197px;
      min-height: 272px;
      margin-bottom: 10px;
    }
    .rank {
      display: block;
      height: 28px;
      margin-bottom: 4px;
      /* border: 6px solid #000000; */
      background: #333333;
      color: #ffffff;
      font-size: 19px;
      text-align: center;
      line-height: 28px;
    }
    ol li:nth-of-type(4n + 1) {
      margin-left: 0;
    }
    ol li:nth-of-type(1) .rank,
    ol li:nth-of-type(2) .rank,
    ol li:nth-of-type(3) .rank {
      background: #fb4357;
    }
    .txt_about_boxoffice {
      width: 100% !important;
      p {
        font-size: 16px;
        line-height: 1.8;
      }
    }
    .img_about_boxoffice {
      width: fit-content;
      margin: 50px auto;
    }
    .box-image a {
      display: block;
    }
    .thumb-image {
      display: block;
      position: relative;
      width: 100%;
      height: 260px;
      background: #f4f4f4;
    }
    [class|="sect"][class*="chart"] .thumb-image > img {
      width: 100%;
      height: 260px;
    }
    .wrap-movie-chart .box-contents {
      height: 93px;
    }
    [class|="sect"][class*="chart"] > h4 + ol > li:first-of-type .title,
    [class|="sect"][class*="chart"] > h3 + ol > li:first-of-type .title {
      width: 90%;
    }
    [class|="sect"][class*="chart"] .title {
      font-size: 15px;
    }
    .title {
      display: block;
      color: #333333;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    [class|="sect"][class*="chart"] .txt-info {
      margin-top: 3px;
      height: 13px;
      color: #666666;
      font-weight: 500;
      white-space: nowrap;
    }
    .txt-info > strong {
      display: block;
      font-size: 11px;
    }
    .txt3 {
      display: flex;
      span {
        display: inline-block;
      }
    }
  }
  ${mq[0]} {
    width: 100%;
    margin-top: 0;
    padding: 0 20px;
    h3 {
      font-size: 24px !important;
    }
    .box_info {
      .tit-heading-wrap {
        height: auto;
        margin-top: 20px;
      }
      .tit-heading-wrap .submenu {
        position: static;
        margin: 20px 0;
        ul {
          display: grid;
          gap: 10px 10px;
          grid-template-columns: 1fr 1fr 1fr;
          li {
            margin-left: 0;
            padding: 5px 0;
            font-size: 13px;
            text-align: center;
            border: 1px solid;
            background: none !important;
          }
        }
      }
      .img_about_boxoffice {
        margin: 20px 0;
      }
    }
    .txt3 {
      display: block !important;
      font-size: 13px;
    }
    .box_info ol {
      margin: 0;
      padding: 20px 0 0 !important;
      > li {
        float: none !important;
        margin: 0 auto 30px !important;
        padding: 0 !important;
        padding-bottom: 0 !important;
        font-size: 16px !important;
      }
    }
    .box_info [class|="sect"][class*="chart"] .box-image {
      width: 100%;
    }
  }
`;

// 상세페이지
export const InfoContWrap = styled.div`
  width: 900px;
  min-height: 100vh;
  margin: 50px auto 70px;
  ${mq[0]} {
    width: 100%;
    margin: 0;
    padding: 20px;
  }
`;

export const SummaryInfo = styled.div`
  display: flex;

  .thumb {
    height: 398px;
    margin-right: 50px;
    img {
      height: 100%;
    }
  }
  .tit {
    font-size: 26px;
    font-weight: bold;
  }
  .date {
    margin-top: 10px;
  }
  dl {
    display: flex;
    margin-top: 7px;
    dt {
      width: 90px;
    }
    dd {
      width: calc(100% - 180px);
    }
  }
  ${mq[0]} {
    display: block;
    .thumb {
      margin: 0 auto;
      width: fit-content;
    }
    .tit {
      margin-top: 10px;
      font-size: 20px;
    }
    dl dd {
      width: calc(100% - 120px);
    }
  }
`;

export const DetailInfo = styled.div`
  margin-top: 70px;
  padding-top: 40px;
  border-top: 1px solid #eaeaea;
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .timeWrap {
    width: 700px;
    margin: 0 auto;
  }
  .time {
    margin-bottom: 30px;
  }
  ${mq[0]} {
    .timeWrap {
      width: 100%;
    }
  }
`;

export const BlogInfo = styled.div`
  margin-top: 70px;
  padding-top: 40px;
  border-top: 1px solid #eaeaea;
  font-family: MalgunGothic;
  h2 {
    font-size: 20px;
    display: inline-block;
    background: #000;
    color: #fff;
    padding-bottom: 0;
    font-size: 18px;
    padding: 0 10px;
  }
  ul {
    border-top: 1px solid #cdcdcd;
    li {
      padding: 10px 0 20px;
      border-bottom: 1px dashed #e7e7e7;
      &:hover .title {
        color: #4db2ec;
      }
      .title {
        -webkit-line-clamp: 1;
        margin-top: 3px;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.25px;
        font-weight: normal;
        font-family: MalgunGothic;
        font-weight: bold;
      }
      .blogInfoBox {
        margin: 10px 0 7px;
        font-size: 13px;
        .postdate {
          margin-left: 15px;
          color: #767676;
        }
        .description {
          font-size: 15px;
        }
      }
    }
  }
`;
