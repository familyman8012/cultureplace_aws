import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useVod } from "@src/hooks/api/useVod/useNotice";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { observer } from "mobx-react";
import { QuillStore } from "@src/mobx/store";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { WrapLessonManagement } from "./styles";
import { ISetuCrriculumInfo } from "./VodManagement";
import { ICurriculum, ILesson } from "@src/typings/db";
import Button from "@components/elements/Button";
import LayerLessonAdd from "./LayerLessonAdd";
import LayerLessonView from "./LayerLessonView";

interface ILessonManagement extends ISetuCrriculumInfo {
  curriculumId: string;
}

function LessonManagement({
  _id,
  curriculumId,
  curriculumInfo,
  setCurriculumInfo
}: ILessonManagement) {
  const queryClient = useQueryClient();
  const { data, refetch } = useVod(String(_id));

  // 윈도우 로드 상태
  const [winReady, setwinReady] = useState(false);

  // 선택한 커리큘럼 정보
  const [selCurriculum, setSelCurriculum] = useState<ICurriculum | undefined>({
    _id: "",
    title: "",
    lessons: []
  });

  // 레슨관리 레이어
  const [lessonLayer, setLessonLayer] = useState({
    state: "",
    show: false,
    selectIndex: 0
  });

  // 레슨 정보 자세히보기
  const [showDetailLesson, setShowDetailLesson] = useState<ILesson | undefined>(
    undefined
  );

  //지워야하는 미디어ID
  const [delMediaId, setdelMediaId] = useState("");

  useEffect(() => {
    setwinReady(true);
  }, []);

  useEffect(() => {
    setSelCurriculum(
      data?.curriculum.find((el: ICurriculum) => el._id === curriculumId)
    );
  }, [curriculumId, data]);

  //레슨 삭제 -> video 까지.
  const deleteVideoHandler = (lessonId: string, mediaId: string) => {
    axios
      .delete(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT}/stream/${mediaId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN}`
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          alert("동영상이 삭제 되었습니다.");
          axios
            .delete(
              `/api/lesson/${_id}?curriculumId=${curriculumId}&lessonId=${lessonId}`
            )
            .then(res => {
              alert("레슨 삭제되었습니다.");
              refetch();
            });
        }
      })
      .catch(error => console.log(error));
  };

  // 레슨 수정 레이어
  const showModLessonLayer = (
    lessonId: string,
    index: number,
    mediaId: string
  ) => {
    const modLesson = selCurriculum?.lessons.find(
      (el: ILesson) => el._id === lessonId
    );
    QuillStore.titleData = modLesson?.title;
    QuillStore.data = modLesson?.content;
    setLessonLayer({ state: "modify", show: true, selectIndex: index });
    setdelMediaId(mediaId);
  };

  //레슨 디테일 수정

  // 레슨 순서 수정
  const handlerModLessonList = useMutation(
    () =>
      axios.put(
        `/api/lesson/${_id}?curriculumId=${curriculumId}`,
        selCurriculum?.lessons
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["curriculum"]);
      },
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  //드래그 & 드로그
  const handleChange = (result: any) => {
    if (!result.destination) return;
    const items = selCurriculum && [...selCurriculum.lessons];
    const [reorderedItem] =
      result.destination && items?.splice(result.source.index, 1);
    items?.splice(result.destination.index, 0, reorderedItem);
    setSelCurriculum(
      selCurriculum && items && { ...selCurriculum, lessons: [...items] }
    );
  };

  const handleShowLayerLesson = (_id: string) => {
    setShowDetailLesson(
      selCurriculum &&
        selCurriculum.lessons.find((el: { _id: string }) => el._id === _id)
    );
  };

  return (
    <>
      <WrapLessonManagement>
        <div className="head">
          <span className="tit">{selCurriculum?.title}</span>
          <div className="box_btn_group">
            <Button
              color="brand"
              size="xs"
              width="auto"
              css={css`
                margin-left: 50px;
                padding: 0 10px;
              `}
              onClick={() =>
                setLessonLayer({ state: "add", show: true, selectIndex: 0 })
              }
            >
              레슨추가
            </Button>

            <Button
              color="gray"
              size="xs"
              width="auto"
              css={css`
                margin-left: 10px;
                padding: 0 10px;
              `}
              onClick={() =>
                setCurriculumInfo({
                  ...curriculumInfo,
                  lessonLayer: false
                })
              }
            >
              닫기
            </Button>
          </div>
        </div>
        {winReady && selCurriculum && (
          <div className="wrap_lesson_list">
            <DragDropContext onDragEnd={handleChange}>
              <Droppable droppableId="vodList">
                {provided => (
                  <ul
                    className="vodList"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {selCurriculum?.lessons?.map(
                      (el: ILesson, index: number) => (
                        <Draggable
                          key={el._id}
                          draggableId={el._id}
                          index={index}
                        >
                          {provided => (
                            <li
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <div className="item">
                                <span className="title">{el.title}</span>
                                <div className="box_btn_group">
                                  <button
                                    onClick={() =>
                                      showModLessonLayer(
                                        el._id,
                                        index,
                                        el.mediaId
                                      )
                                    }
                                  >
                                    수정
                                  </button>
                                  <button
                                    css={css`
                                      margin: 0 20px;
                                    `}
                                    onClick={() =>
                                      handleShowLayerLesson(el._id)
                                    }
                                  >
                                    자세히
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteVideoHandler(el._id, el.mediaId)
                                    }
                                  >
                                    삭제
                                  </button>
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            <div className="bottom">
              <p className="notice">
                * 레슨 순서는 Drag&amp;Drop 으로 변경가능합니다.
              </p>
              <Button
                color="submit"
                size="xs"
                width="auto"
                css={css`
                  padding: 0 10px;
                  margin: 10px;
                `}
                onClick={() => handlerModLessonList.mutate()}
              >
                레슨순서 저장
              </Button>
            </div>
          </div>
        )}
      </WrapLessonManagement>
      {lessonLayer.show && (
        <LayerLessonAdd
          lessonLayer={lessonLayer}
          _id={_id}
          curriculumId={curriculumId}
          delMediaId={delMediaId}
          setLessonLayer={setLessonLayer}
          refetch={refetch}
        />
      )}
      {showDetailLesson && (
        <LayerLessonView
          showDetailLesson={showDetailLesson}
          setShowDetailLesson={setShowDetailLesson}
        />
      )}
    </>
  );
}

export default observer(LessonManagement);
