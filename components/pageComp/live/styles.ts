import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const ExitArea = styled.div`
  position: fixed;
  top: 50px;
  right: 100px;

  ${mq[0]} {
    top: 5px;
    right: 5px;
  }
  button {
    font-size: 20px;

    ${mq[0]} {
      font-size: 15px;
    }
  }
`;

export const LiveStreamWrap = styled.div`
  display: flex;
  max-width: 1650px;
  margin: 60px auto 0;

  ${mq[0]} {
    display: block;
    margin-top: 40px;
  }
`;

export const LiveVodWrap = styled.div`
  width: 70%;
  padding: 24px;
  ${mq[0]} {
    width: 100%;
    height: calc(50vh - 20px);
    padding: 0;
  }
`;

export const VideoArea = styled.div<{
  videoLoad: { Load: boolean; Loaded: boolean };
  videoAreaRef: React.MutableRefObject<HTMLDivElement | null>;
}>`
  position: relative;
  background: black;
  ${({ videoLoad, videoAreaRef }) =>
    videoLoad.Loaded
      ? "height:auto !important;"
      : `height:${Number(videoAreaRef?.current?.offsetWidth) * 0.563}px;`}

  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
  }
`;

export const ObsInfo = styled.div`
  .box_btn {
    display: flex;
    margin: 20px 0;
    align-items: center;

    button {
      width: fit-content;
      padding: 0 10px;
      margin-left: 10px;
    }

    ${mq[0]} {
      padding: 0 10px;
      font-size: 13px;
      button {
        font-size: 13px;
      }
    }
  }

  table {
    border-collapse: collapse;
    td {
      padding: 8px;
      &:nth-of-type(1) {
        width: 20%;
      }
      &:nth-of-type(2) {
        width: 80%;
      }
      border: 1px solid;
    }
  }
`;

export const ChatWrap = styled.div`
  ${mq[0]} {
    height: calc(50vh - 20px);
  }
`;

export const LiveChatStart = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .wrap {
    cursor: pointer;
  }

  .txtbox {
    text-align: center;
    h1 {
      margin: 10px 0;
      font-size: 30px;
    }
  }

  ${mq[0]} {
    width: 95%;
    .txtbox h1 {
      font-size: 17px;
    }
  }
`;

export const LiveRoom = styled.div`
  max-width: 382px;
  height: 100%;
  padding: 24px 12px;

  #room {
    width: 100%;
    height: 100%;

    h1 {
      display: flex;
      align-items: center;
      padding-left: 15px;
      height: 48px;
      border: 1px solid #e0e0e0;
    }

    ul {
      overflow: auto;
      height: calc(100% - 163px);
      border: 1px solid #e0e0e0;
      border-top: none;
      border-bottom: none;
      padding: 10px 15px;

      li {
        margin-bottom: 8px;
        font-size: 15px;
        .nickname {
          color: #6e6e6e;
        }
        .msg {
          color: #030352;
        }
        .notice {
          display: block;
          border-radius: 4px;
          padding: 3px 16px;
          text-align: center;
          background: #eeeeee;
        }
      }
    }
  }

  ${mq[0]} {
    padding: 0 12px;
    #room {
      h1 {
        font-size: 12px;
        height: auto;
        padding: 10px 0;
        justify-content: center;
      }
      ul {
        height: calc(100% - 95px);
      }
    }
  }
`;

export const WriteArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 45px;
  padding: 8px;
  border: 1px solid #e0e0e0;

  form {
    width: 100%;
    .box {
      display: flex;
      width: 100%;

      input {
        width: 70%;
        padding-left: 8px;
        border-radius: 5px;
        border: 1px solid #e0e0e0;
      }

      button {
        width: 28%;
        margin-left: auto;
      }
    }
  }
`;
