import { mq } from "@components/mq";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const WrapVodVisual = styled.div<{
  videoLoad: { Load: boolean; Loaded: boolean };
  videoAreaRef: React.MutableRefObject<HTMLDivElement | null>;
}>`
  overflow: hidden;

  .stream_area {
    overflow: hidden;
    position: relative;
    width: calc(100vw - 13px);
    background: #fff;
    max-height: calc(100vh - 12.4rem);
    ${({ videoLoad, videoAreaRef }) =>
      videoLoad.Loaded
        ? "height:auto !important;"
        : `height:${Number(videoAreaRef?.current?.offsetWidth) * 0.563}px;`}

    ${mq[0]} {
      width: 100vw;
      height: calc(100vh - 116px) !important;
      max-height: 100vh;
    }
    ${mq[1]} {
      width: 100vw;
    }
  }

  .video_swipe {
    width: 100%;
    margin-top: -135px;
    ${mq[0]} {
      margin-top: 0;
    }
    ${mq[1]} {
      margin-top: 0;
    }
  }

  .txt-box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    padding: 50px 0 158px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.46),
      rgba(0, 0, 0, 0)
    );

    .container {
      display: flex;
      max-width: 1040px;
      margin: 0 auto;

      h2 {
        width: calc(100% - 600px);
        margin-bottom: 20px;
        font-size: 30px;
        line-height: 42px;
        letter-spacing: -0.75px;
        color: #fff;
        font-weight: 300;
      }
    }
    ${mq[0]} {
      height: auto;
      padding: 0 0 20px 0;

      .container {
        display: block;
        h2 {
          width: 100vw;
          font-size: 20px;
          padding: 0 20px;
          line-height: 1.5;
        }
      }
    }
  }
`;

export const WrapVideoClip = styled.div<{ sound: boolean }>`
  display: flex;
  margin-left: auto;
  ul {
    display: flex;
    width: 355px;
    margin-left: auto;
    justify-content: space-around;
    align-items: baseline;

    li {
      cursor: pointer;

      .thumb {
        display: inline-block;
        width: 50px;
        height: 50px;
        opacity: 0.75;
        overflow: hidden;
        border-radius: 50%;
      }

      .txt {
        text-align: center;
        p {
          line-height: 17px;
          color: rgba(255, 255, 255, 0.5);
          word-break: break-all;
        }
        .subject {
          font-size: 14px;
          margin: 5px 0;
        }
        .tutor {
          font-size: 12px;
        }
      }
    }
  }
  ${mq[0]} {
    ul {
      width: 270px;
      margin-left: 10px;
      li {
        .txt {
          .subject {
            font-size: 13px;
          }
          .tutor {
            font-size: 11px;
          }
        }
      }
    }
  }
  .btn_sound {
    width: 42px;
    height: 42px;
    margin: 20px 0 0 20px;
    border-radius: 10px;
    background: url(https://front-img.taling.me/Content/Images/Vod/icon_sound_${({
        sound
      }) => (sound ? "on" : "off")}.png)
      no-repeat center rgba(0, 0, 0, 0.2);
    background-size: 21px 18px;
  }
`;

export const Thumb = styled.div<{
  preview: number;
  index: number;
}>`
  display: inline-block;
  width: 50px;
  height: 50px;
  opacity: 0.75;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  ${({ preview, index }) =>
    preview === index &&
    `
      width: 60px;
      height: 60px;
      opacity: 1;
      border: 2px solid #fff;
      `}
  ${mq[0]} {
    width: 40px;
    height: 40px;
  }
`;
