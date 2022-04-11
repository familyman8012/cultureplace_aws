import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Button from "@components/elements/Button";
import axios from "axios";
import { useLives } from "@src/hooks/api/useLive";
import { LiveVodWrap, VideoArea } from "./styles";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

function LiveVod() {
  const [session] = useSession();
  const router = useRouter();
  const [videoLoad, setVideoLoad] = useState({ Load: false, Loaded: false });
  const videoAreaRef = React.useRef<HTMLDivElement>(null);

  // 라이브만들기에 대한 정보를 가져온다.
  // (api 에는 cloundflare 에서 라이브를 만드는 api 와, 방을 만든 후 streamkey 를 db 에 저장하는 기능을 가지고 있다.)
  // 라이브 만들기가 활성화 된 후 obs streamkey 정보를 useLivew 가 가져온다.
  const { status, data, error, refetch } = useLives();

  //라이브 만들기

  const liveStart = useCallback(() => {
    axios
      .post(`/api/live`)
      .then(res => {
        refetch();
      })
      .catch(err => {
        console.log(err);
      });
  }, [refetch]);

  //방송삭제
  const liveDelete = useCallback(() => {
    axios
      .delete(
        `/api/live?liveid=${data && data[0]?.result?.uid}&dbid=${
          data && data[0]?._id
        }`
      )
      .then(res => {
        refetch();
      })
      .catch(err => {
        console.log(err);
      });
  }, [data, refetch]);

  return (
    <>
      <LiveVodWrap>
        <VideoArea
          css={css`
            ${videoLoad.Loaded
              ? "height:auto !important"
              : `height:${
                  Number(videoAreaRef?.current?.offsetWidth) * 0.563
                }px`}
          `}
          ref={videoAreaRef}
        >
          {data && (
            <iframe
              src={`https://iframe.videodelivery.net/${data[0]?.result?.uid}`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            ></iframe>
          )}
        </VideoArea>
        <div>
          {session?.user.role === "master" && (
            <div
              css={css`
                display: flex;
                margin: 20px 0;
                align-items: center;
              `}
            >
              OBS 설정을 위한 URL, streamkey 구하기
              {Number(data?.length) >= 1 ? (
                <Button
                  color="submit"
                  size="xs"
                  onClick={() => liveDelete()}
                  css={css`
                    width: fit-content;
                    padding: 0 10px;
                    margin-left: 10px;
                  `}
                >
                  라이브삭제
                </Button>
              ) : (
                <Button
                  color="primary"
                  size="xs"
                  onClick={liveStart}
                  css={css`
                    width: fit-content;
                    padding: 0 10px;
                    margin-left: 10px;
                  `}
                >
                  라이브만들기
                </Button>
              )}
            </div>
          )}
          {Number(data?.length) >= 1 && (
            <table
              css={css`
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
              `}
            >
              <tbody>
                <tr>
                  <td>URL</td>
                  <td>{data && data[0]?.result?.rtmps.url}</td>
                </tr>
                <tr>
                  <td>streamKey</td>
                  <td>{data && data[0]?.result?.rtmps.streamKey}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </LiveVodWrap>
    </>
  );
}

export default LiveVod;
