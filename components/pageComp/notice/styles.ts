import { mq } from "@components/mq";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BannerWrap = styled.div`
  ${mq[0]} {
    display: none;
  }
`;

// 인덱스
export const NotiBnrInner = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 100px 50px;
  color: #fff;
  .txt1 {
    font-size: 28px;
  }
  .txt2 {
    font-size: 18px;
  }
`;

// 상세보기
export const NoticeView = styled.div`
  width: 840px;
  margin: 0 auto;
  padding-top: 50px;
  min-height: 100vh;
  .top {
    display: flex;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    svg {
      margin-right: 10px;
      font-size: 11px;
    }
    color: ${({ theme }) => theme.color.brand};
    .anticon-left {
      font-size: 10px;
      margin-right: 15px;
    }
  }
  h2 {
    margin-top: 10px;
    font-size: 26px;
  }
  h3 {
    margin: 10px 0 8px;
  }
  img {
    display: block;
    margin: 32px 0;
  }
  ${mq[0]} {
    width: 100%;
    padding: 20px;
    img {
      margin: 20px 0;
    }
    h2 {
      font-size: 18px;
    }
  }
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 26px;
  text-align: center;
  ${mq[0]} {
    padding: 0 5px;
    font-size: 20px;
    margin: 20px 0 10px;
  }
`;

export const CreateAt = styled.div`
  font-size: 14px;
  color: rgb(123, 123, 123);
  text-align: center;
`;

export const NoticeButton = css`
  display: block;
  margin: 100px auto;
  height: 46px;
  border-radius: 28px;
  ${mq[0]} {
    margin: 50px auto 20px;
  }
`;

export const SectionNotice = styled.div`
  max-width: 1100px;
  margin: 50px auto;
  ${mq[0]} {
    width: 100%;
    padding: 0 20px;
    margin: 0;
  }
`;
export const TabNotice = styled.ul`
  display: flex;
  justify-content: center;
  margin: 16px 0 30px;
  li {
    padding: 4px 12px;
    font-size: 16px;
    &.on {
      font-weight: bold;
      border-bottom: 2px solid rgb(255, 121, 0);
    }
  }
  ${mq[0]} {
    justify-content: space-around;
    padding: 0 5px;
    li {
      padding: 0;
      font-size: 14px;
    }
  }
`;

export const WrapNotice = styled.div`
  display: grid;
  gap: 70px 10px;
  grid-template-columns: 1fr 1fr 1fr;
  ${mq[0]} {
    display: block;
    margin-top: 20px;
    a {
      display: block;
      margin-bottom: 25px;
      .txtbox {
        dt {
          font-size: 16px;
        }
        .desc {
          font-size: 14px;
        }
      }
    }
  }
  ${mq[1]} {
    width: 80%;
    margin: 0 auto;
    gap: 70px 20px;
    grid-template-columns: 1fr 1fr;
  }
`;
