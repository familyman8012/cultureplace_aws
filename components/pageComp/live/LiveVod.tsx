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

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

function LiveVod() {
  const [session] = useSession();
  const router = useRouter();
  const [videoLoad, setVideoLoad] = useState({ Load: false, Loaded: false });
  const videoAreaRef: React.MutableRefObject<any> = useRef();

  //
  const { status, data, error, refetch } = useLives();

  // 방송
  const [btnDisable, setbtnDisable] = useState(false);

  //방송시작
  const [liveStartData, setliveStartData] = useState<any>(null);
  const liveStart = useCallback(() => {
    setbtnDisable(true);
    axios
      .post(`/api/live`)
      .then((res: any) => {
        console.log(res);
        setliveStartData(res);
        setbtnDisable(false);
        refetch();
      })
      .catch(err => {
        console.log(err);
        setbtnDisable(false);
      });
  }, [refetch]);

  useEffect(() => {
    console.log(liveStartData);
  }, [liveStartData]);

  //방송삭제
  const liveDelete = useCallback(() => {
    setbtnDisable(true);
    axios
      .delete(
        `/api/live?liveid=${data && data[0]?.result?.uid}&dbid=${
          data && data[0]?._id
        }`
      )
      .then((res: any) => {
        console.log(res);
        setbtnDisable(false);
        refetch();
      })
      .catch(err => {
        console.log(err);
        setbtnDisable(false);
      });
  }, [data, refetch]);

  return (
    <>
      <div
        css={css`
          width: 70%;
          padding: 24px;
        `}
      >
        <div
          css={css`
            position: relative;
            background: black;
            ${videoLoad.Loaded
              ? "height:auto !important"
              : `height:${videoAreaRef?.current?.offsetWidth * 0.563}px`}
          `}
          ref={videoAreaRef}
        >
          <iframe
            src={`https://iframe.videodelivery.net/${
              data && data[0]?.result?.uid
            }`}
            css={css`
              border: none;
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
            `}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
          {/* <Stream
            controls
            src="dd37c67942b733e6babf2fd879b79e5a"
            responsive={true}
            onLoadStart={() => setVideoLoad({ Load: true, Loaded: false })}
            onLoadedMetaData={() => setVideoLoad({ Load: false, Loaded: true })}
            preload={true}
          /> */}
        </div>
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
                  disabled={btnDisable}
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
                  disabled={btnDisable}
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
      </div>
    </>
  );
}

export default LiveVod;
