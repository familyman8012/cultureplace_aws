import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const BlogCardWrap = styled.div<{ type: string }>`
  overflow: hidden;

  dl,
  dt,
  dd {
    margin: 0;
    padding: 0;
  }

  .imgbox {
    overflow: hidden;
    width: 100%;
    border-radius: 10px;
    img {
      width: 100%;
    }
  }
  .txtbox {
    position: relative;
    dt {
      margin: 8px 0;
      font-size: 18px;
      font-weight: bold;
    }
    dd {
      &.desc {
        color: #464646;
        font-size: 14px;
      }
      &.create_at {
        margin-top: 8px;
        font-size: 12px;
        line-height: 12px;
        color: #838380;
      }
      span {
        display: block;
        color: ${({ theme }) => theme.color.gray};
      }
    }
  }
  ${({ type }) => {
    return (
      type === "notice" &&
      `
    .imgbox {display:flex;height:179px;border-radius:10px;
      ${mq[0]} {height:150px;}
    }
    dt {font-weight:bold;}
    .txtbox {
      dd{
        &.desc {font-size:16px;}    
        &.create_at {font-size:14px}
    }
  }
    `
    );
  }}
  ${mq[0]} {
    .txtbox {
      dt {
        font-size: 14px;
      }
      dd.desc {
        font-size: 12px;
      }
      dd.create_at {
        font-size: 11px;
      }
    }
  }
`;
