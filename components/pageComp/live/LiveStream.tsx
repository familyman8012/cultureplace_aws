import React, { useCallback, useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import { useLives } from "@src/hooks/api/useLive";
import Button from "@components/elements/Button";
import { LiveVodWrap, ObsInfo, VideoArea } from "./styles";

function LiveStream() {
  const [session] = useSession();
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
          videoLoad={videoLoad}
          videoAreaRef={videoAreaRef}
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
        <ObsInfo>
          {session?.user.role === "master" && (
            <div className="box_btn">
              OBS 설정을 위한 URL, streamkey 구하기
              {Number(data?.length) >= 1 ? (
                <Button color="submit" size="xs" onClick={() => liveDelete()}>
                  라이브삭제
                </Button>
              ) : (
                <Button color="primary" size="xs" onClick={liveStart}>
                  라이브만들기
                </Button>
              )}
            </div>
          )}
          {Number(data?.length) >= 1 && (
            <table>
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
        </ObsInfo>
      </LiveVodWrap>
    </>
  );
}

export default LiveStream;
