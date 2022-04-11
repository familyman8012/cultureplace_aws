import React, { useEffect, useRef, useState } from "react";
import {
  Thumb,
  WrapVideoClip,
  WrapVodVisual
} from "@components/pageComp/vodmain/styles";
import { vodPreviewList } from "./VodPreviewList";

function VodVisual() {
  const [videoLoad, setVideoLoad] = useState({ Load: false, Loaded: false });
  const [sound, setSound] = useState(false);
  const [videoSource, setVideoSource] = useState("");
  const videoAreaRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const videoInput: React.MutableRefObject<HTMLVideoElement | null> =
    useRef(null);
  const [preview, setPreview] = useState(0);

  useEffect(() => {
    500 > Number(videoAreaRef?.current?.offsetWidth)
      ? setVideoSource(vodPreviewList[preview].vodmodurl)
      : setVideoSource(vodPreviewList[preview].vodurl);
  }, [preview]);

  return (
    <WrapVodVisual videoLoad={videoLoad} videoAreaRef={videoAreaRef}>
      <div className="stream_area" ref={videoAreaRef}>
        <video
          className="video_swipe"
          autoPlay
          loop
          muted={sound ? false : true}
          playsInline
          onLoadedData={() => {
            setVideoLoad({ Load: false, Loaded: true });
          }}
          ref={videoInput}
        >
          <source src={videoSource} type="video/mp4" />
        </video>
        <div className="txt-box">
          <div className="container">
            <h2>{vodPreviewList[preview].title}</h2>
            <WrapVideoClip sound={sound}>
              <ul>
                {vodPreviewList.map((el, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setPreview(index);
                      videoInput?.current?.pause();
                      videoInput?.current?.load();
                    }}
                  >
                    <Thumb preview={preview} index={index}>
                      <img src={el.imgurl} alt={el.title} />
                    </Thumb>
                    <div className="txt">
                      <p className="subject">{el.genre}</p>
                      <p className="tutor">{el.people}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="btn_sound"
                onClick={() => setSound(prev => !prev)}
              />
            </WrapVideoClip>
          </div>
        </div>
      </div>
    </WrapVodVisual>
  );
}

export default VodVisual;
