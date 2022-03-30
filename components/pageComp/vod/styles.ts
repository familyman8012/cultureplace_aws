import { mq } from "@components/mq";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const VodWrap = styled.div<{ listCollapse: Boolean }>`
  display: flex;
  width: 100%;
  padding-left: 360px;
  justify-content: center;

  ${mq[0]} {
    padding-left: 0px;
  }

  ${({ listCollapse }) =>
    listCollapse &&
    `
    padding-left:0;
  .wrap_vod_list {
    left: -360px;
    transition: left 0.3s;
  }
  .btn_list_collapse {
    left: 10px;
    transform: rotate(180deg);
  }
  .bottom_btn_area {width:100vw;left:0; button.prev{left:40px;}}
  ${mq[0]} {
    .wrap_vod_list {left:0;}
    .btn_list_collapse {left:auto;right:10px;transform: rotate(0deg);}
  }

  `}
`;

export const VodMenuList = styled.div<{ progressPer: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 360px;
  height: 100vh;
  transition: left 0.3s;

  ${mq[0]} {
    left: -360px;
  }

  .top {
    padding: 30px 30px 20px;
    color: #fff;
    background: #ff4949;

    .progress-text {
      margin-top: 5px;
      font-size: 14px;
    }

    .wrap_line_progress {
      position: relative;
      width: 100%;
      height: 2px;
      margin-top: 40px;
      background: rgba(0, 0, 0, 0.3);

      .inner {
        position: absolute;
        width: ${({ progressPer }) => (isNaN(progressPer) ? 0 : progressPer)}%;
        height: 100%;
        background: #fff;
        transition: width 0.3s ease-in-out;
      }

      .bubble {
        position: absolute;
        right: -20px;
        top: -32px;
        padding: 4px 8px;
        color: #fff;
        font-size: 12px;
        border-radius: 2px;
        background: rgba(0, 0, 0, 0.6);

        &:after {
          content: "";
          position: absolute;
          left: 40%;
          bottom: -10px;
          border: 5px solid;
          border-color: rgba(0, 0, 0, 0.6) transparent transparent;
        }
      }
    }
  }
  .title {
    font-size: 17px;
    font-weight: normal;
    cursor: pointer;
  }

  .simplebar {
    background: #fff;
    height: calc(100vh - 145px);
  }
`;

export const ListItemWrap = styled.div`
  border: 1px;
  h2:after {
    display: block;
    content: "";
    width: 13px;
    height: 13px;
    margin-left: auto;
    align-items: center;
  }
  .is-open {
    background: red;
    h2:after {
      background: url("/images/ico_minus.png") no-repeat left center;
      background-size: 13px;
    }
  }
  .is-closed {
    h2:after {
      background: url("/images/ico_plus.png") no-repeat left center;
      background-size: 13px;
    }
  }

  .title {
    display: flex;
    padding: 20px 35px 20px 20px;
    font-size: 15px;

    font-weight: normal;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    align-items: center;
    background: #fafafa;
  }
`;

export const ListItem = styled.li<{ lessonId: string; selLessonId: string }>`
  position: relative;
  font-size: 13.5px;
  color: #444444;
  padding: 15px 55px 15px 20px;
  ${({ lessonId, selLessonId }) =>
    lessonId === selLessonId &&
    `
  &:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 100%;
  background: #FF4949;
}
  
  `}
`;

export const BtnCollapse = styled.div`
  position: fixed;
  left: 370px;
  top: 15px;
  cursor: pointer;
  border-radius: 5px;
  height: 48px;
  width: 48px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.05);

  &:after {
    content: "";
    height: 4px;
    width: 24px;
    border-radius: 2px;
    position: absolute;
    left: 11px;
    top: 22px;
    display: block;
    background: #b4b4b4;
  }

  .wrap_arrow {
    height: 2px;
    width: 24px;
    background: #444;
    position: relative;
    margin-top: 14px;
    transition: all 0.6s;

    &:before,
    &:after {
      content: "";
      border-radius: 2px;
      position: absolute;
      top: 6px;
      left: 9px;
      width: 16px;
      height: 4px;
      background: #b4b4b4;
      transition: all 0.2s ease-in;
      transform: translateY(12px) rotate(-45deg);
    }
    &:after {
      top: 22.6px;
      transform: translateY(4px) rotate(45deg);
    }
  }

  ${mq[0]} {
    top: 10px;
    left: 10px;
    transform: rotate(180deg);
  }
`;

export const LectureStreamArea = styled.div`
  position: relative;
  width: 90%;
  max-width: 1150px;
  .top_time_area {
    position: absolute;
    top: 30px;
    right: 0;
    font-size: 11px;
    color: #bbb;
    font-weight: 600;
    .time {
      margin-left: 5px;
    }
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    margin: 60px 0 35px;

    ${mq[0]} {
      margin-top: 80px;
    }
  }

  .vod_cont {
    padding-bottom: 200px;
    .stream_area {
      margin-bottom: 30px;
      background: #000;
    }
  }
`;

export const LoadMask = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

export const StateIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: auto;
  right: 20px;
  top: 18px;
  width: 24px;
  height: 24px;
  background: #3f4c4f;
  border-radius: 50%;
  color: #fff;

  &:hover {
    background: #ff4949;
  }
`;

export const BottomBtnArea = styled.div`
  position: fixed;
  bottom: 0;
  height: 55px;
  left: 390px;
  width: calc(100% - 390px);
  background: #fff;

  button {
    position: absolute;
    top: 50%;
    font-size: 14px;
    transform: translateY(-50%);
    &.prev {
      left: 0;
    }
    &.next {
      right: 40px;
    }
    &.btn_check {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%) !important;
    }
  }

  ${mq[0]} {
    left: 0px;
    width: 100vw;
    button {
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
`;
