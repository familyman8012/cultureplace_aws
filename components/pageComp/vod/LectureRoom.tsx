import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback
} from "react";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useVod } from "@src/hooks/api/useVod/useNotice";
import { useComplete } from "@src/hooks/api/useVod/useComplete";
import { Stream, StreamPlayerApi } from "@cloudflare/stream-react";
import Collapsible from "react-collapsible";
import SimpleBar from "simplebar-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import {
  faSignal,
  faCheck,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { ICurriculum, ILesson } from "@src/typings/db";
import { css } from "@emotion/react";
import "simplebar/dist/simplebar.min.css";
import {
  BottomBtnArea,
  BtnCollapse,
  LectureStreamArea,
  ListItem,
  ListItemWrap,
  LoadMask,
  StateIcon,
  VodMenuList,
  VodWrap
} from "./styles";

interface IMenuArry {
  curriculumId: string;
  lessonId: string;
  mediaTime: Number;
}

interface ILectureRoom extends StreamPlayerApi {
  duration: number;
}

function LectureRoom({ _id, sessionId }: { _id: string; sessionId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, refetch } = useVod(String(_id));
  const { data: completeData } = useComplete(String(sessionId), String(_id));

  const [activeIndex, setActiveIndex] = useState(0);
  const [selLesson, setSelLesson] = useState<ILesson>();
  const [progressPer, setProgressPer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [complete, setComplete] = useState(false);
  const [videoLoad, setVideoLoad] = useState({ Load: false, Loaded: false });
  const [listCollapse, setListCollapse] = useState(false);

  // React.MutableRefObject<StreamPlayerApi | undefined> ??? ?????????, cloudflare????????? type ??? ???????????????.
  const videoInput:
    | React.MutableRefObject<ILectureRoom | undefined>
    | undefined = useRef();
  const interval: { current: NodeJS.Timeout | null } = useRef(null);
  const videoAreaRef = React.useRef<HTMLDivElement>(null);

  let menuArry: IMenuArry[] = useMemo(() => [], []);

  //????????? ?????????
  const handlerVideoControl = useCallback(() => {
    videoInput?.current?.play();
    interval.current = setInterval(function () {
      setCurrent(Number(videoInput?.current?.currentTime));
      setDuration(Number(videoInput?.current?.duration));
    }, 1000);
  }, []);

  // VOD (Lesson) ??? ???????????? ?????? ??????.
  const handlerSetSelLesson = useCallback(() => {
    setSelLesson(
      data?.curriculum
        .find(
          (el: ICurriculum) => el._id === menuArry[activeIndex].curriculumId
        )
        ?.lessons.find(
          (el: ILesson) => el._id === menuArry[activeIndex].lessonId
        )
    );
  }, [activeIndex, data?.curriculum, menuArry]);

  // ????????? ????????? ????????????, ????????? ??????
  const handlerShowLesson = useCallback(
    (number: number, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      setActiveIndex(number);
      handlerSetSelLesson();
    },
    [handlerSetSelLesson]
  );

  // Prev
  const handlerPrevLesson = useCallback(() => {
    setActiveIndex(activeIndex => activeIndex - 1);
    handlerSetSelLesson();
  }, [handlerSetSelLesson]);

  // Next
  const handlerNextLesson = useCallback(() => {
    setActiveIndex(activeIndex => activeIndex + 1);
    handlerSetSelLesson();
  }, [handlerSetSelLesson]);

  // ????????????????????????
  const handlerComplete = useMutation(
    () =>
      axios
        .post("/api/product/complete", {
          userId: sessionId,
          productId: _id,
          lessonId: selLesson?._id
        })
        .then(res => {}),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["complete"]);
      },
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  // ????????? ???????????? ?????? ???????????? vodmain ?????? ??????
  useEffect(() => {
    if (data && !data?.joinMembr?.includes(sessionId)) {
      router.push("/vodmain");
    }
  }, [data, data?.joinMembr, router, sessionId]);

  // 90% ????????? ????????????
  useEffect(() => {
    if (!complete && duration > 0 && current > duration * 0.9) {
      setComplete(true);
      handlerComplete.mutate();
    }
  }, [complete, current, duration, handlerComplete, interval]);

  useEffect(() => {
    // ?????? vod ??? lesson ??? menuArry ??? ?????????.
    menuArry.length = 0;
    data?.curriculum.map((el: ICurriculum) =>
      el?.lessons.map((j: ILesson) =>
        menuArry.push({
          curriculumId: el._id,
          lessonId: j._id,
          mediaTime: Number(j.mediaTime)
        })
      )
    );

    console.log("selLesson selLesson", selLesson);

    // ???????????? ?????????
    setTotalTime(
      menuArry?.reduce((acc, cur) => {
        return Number(acc) + Number(cur.mediaTime);
      }, 0)
    );

    // ????????? ?????? ?????????
    setCurTime(
      completeData?.lessonId
        .map((completeItem: string) =>
          menuArry.find(el => el?.lessonId === completeItem)
        )
        .reduce((acc: number, cur: IMenuArry) => {
          return Number(acc) + Number(cur?.mediaTime);
        }, 0)
    );

    // ?????????
    setProgressPer(Number(((curTime / totalTime) * 100).toFixed(2)));
  }, [completeData, curTime, data, menuArry, selLesson, totalTime]);

  // ????????? ?????? ?????? setSelLesson ??? ??????
  useEffect(() => {
    setSelLesson(
      data?.curriculum
        .find(
          (el: ICurriculum) => el._id === menuArry[activeIndex].curriculumId
        )
        ?.lessons.find(
          (el: ILesson) => el._id === menuArry[activeIndex].lessonId
        )
    );
  }, [activeIndex, data, menuArry]);

  const time = (seconds: number) => {
    let min =
      (seconds % 3600) / 60 < 10
        ? "0" + (seconds % 3600) / 60
        : (seconds % 3600) / 60;
    let sec = seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60;

    return parseInt(String(min)) + "??? " + sec + "???";
  };

  return data && data?.joinMembr?.includes(sessionId) ? (
    <VodWrap listCollapse={listCollapse}>
      <LectureStreamArea>
        <div className="top_time_area">
          <FontAwesomeIcon icon={faSignal}></FontAwesomeIcon>
          <span className="time">{time(Number(selLesson?.mediaTime))}</span>
        </div>
        <h1 className="title">{selLesson?.title}</h1>
        {selLesson && (
          <div className="vod_cont">
            <div
              className="stream_area"
              css={css`
                ${videoLoad.Loaded
                  ? "height:auto !important"
                  : `height:${
                      Number(videoAreaRef?.current?.offsetWidth) * 0.563
                    }px`}
              `}
              ref={videoAreaRef}
            >
              <Stream
                controls
                src={selLesson.mediaId}
                responsive={true}
                streamRef={videoInput}
                onLoadStart={() => setVideoLoad({ Load: true, Loaded: false })}
                onLoadedMetaData={() =>
                  setVideoLoad({ Load: false, Loaded: true })
                }
                onPlay={handlerVideoControl}
                preload={true}
                onPause={() =>
                  clearInterval(interval.current as NodeJS.Timeout)
                }
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: selLesson.content }} />
          </div>
        )}
        <BottomBtnArea className="bottom_btn_area">
          <button
            className="prev"
            onClick={handlerPrevLesson}
            disabled={videoLoad.Load ? true : false}
          >
            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon> ??????
          </button>
          {!completeData?.lessonId.some(
            (el: string) => el === selLesson?._id
          ) && (
            <button
              className="btn_check"
              onClick={() => handlerComplete.mutate()}
            >
              ???????????? ????????????
            </button>
          )}

          <button
            className="next"
            onClick={handlerNextLesson}
            disabled={videoLoad.Load ? true : false}
          >
            ?????? <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
          </button>
        </BottomBtnArea>
      </LectureStreamArea>
      <BtnCollapse
        className="btn_list_collapse"
        onClick={() => setListCollapse(prev => !prev)}
      >
        <span className="wrap_arrow"></span>
      </BtnCollapse>
      <VodMenuList className="wrap_vod_list" progressPer={progressPer}>
        <div className="top">
          <h1 className="title">{data?.title}</h1>
          <div>
            <div className="progress-text">
              ????????? :{" "}
              {completeData?.lessonId.length > 0
                ? completeData?.lessonId.length
                : "0"}
              ???/{menuArry?.length}??? | ?????? :{" "}
              {isNaN(Math.round(curTime / 60)) ? "0" : Math.round(curTime / 60)}
              ???/
              {Math.round(totalTime / 60)}???
            </div>
          </div>
          <div className="wrap_line_progress">
            <div className="inner">
              <span className="bubble">
                {!isNaN(progressPer) ? progressPer : 0}%
              </span>
            </div>
          </div>
        </div>
        <SimpleBar className="simplebar">
          <div
            css={css`
              min-height: calc((var(--vh, 1vh) * 100) - 249px);
            `}
          >
            {data?.curriculum.map(
              (curriculum: ICurriculum, currindex: number) => (
                <ListItemWrap key={currindex}>
                  {videoLoad.Load && <LoadMask></LoadMask>}
                  <Collapsible
                    key={currindex}
                    trigger={<h2 className="title">{curriculum.title}</h2>}
                    transitionTime={100}
                    open={currindex === 0 ? true : false}
                  >
                    <ul>
                      {curriculum?.lessons.map(
                        (lesson: ILesson, lessonindex: number) => (
                          <ListItem
                            key={lessonindex}
                            onClick={(
                              e: React.MouseEvent<HTMLLIElement, MouseEvent>
                            ) =>
                              handlerShowLesson(
                                currindex > 0
                                  ? lessonindex +
                                      data.curriculum[currindex - 1].lessons
                                        .length
                                  : lessonindex,
                                e
                              )
                            }
                            lessonId={lesson._id}
                            selLessonId={String(selLesson?._id)}
                          >
                            <StateIcon
                              css={css`
                                ${completeData?.lessonId.map((el: string) => {
                                  if (el === lesson._id) {
                                    return "background:red;";
                                  }
                                })}
                              `}
                            >
                              {completeData?.lessonId.map((el: string) => {
                                if (el === lesson._id) {
                                  return (
                                    <FontAwesomeIcon
                                      icon={faCheck}
                                    ></FontAwesomeIcon>
                                  );
                                }
                              })}
                            </StateIcon>
                            {lesson.title}
                          </ListItem>
                        )
                      )}
                    </ul>
                  </Collapsible>
                </ListItemWrap>
              )
            )}
          </div>
          <div
            css={css`
              padding: 30px;
              background: rgba(0, 0, 0, 0.05);
            `}
          >
            <button
              onClick={() => router.back()}
              css={css`
                display: block;
                width: 100%;
                padding: 12px 24px;
                color: #ff4949;
                font-size: 12px;
                text-align: center;
                border: 1px solid #ff4949;
                border-radius: 5px;
                &:hover {
                  color: #fff;
                  background: #ff4949;
                }
              `}
            >
              ????????? ????????????
            </button>
          </div>
        </SimpleBar>
      </VodMenuList>
    </VodWrap>
  ) : (
    <div></div>
  );
}

export default LectureRoom;
