import { useCallback } from "react";
import { css } from "@emotion/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useVod } from "@src/hooks/api/useVod/useNotice";
import { ICurriculum, ISetuCrriculumInfo } from "./VodManagement";
import Button from "@components/elements/Button";
import { WrapCurriculumLayer } from "./styles";

function LayerCurriculumMain({
  _id,
  handlerCloseVodModal,
  curriculumInfo,
  setCurriculumInfo
}: ICurriculum & ISetuCrriculumInfo) {
  const queryClient = useQueryClient();

  //Vod 커리큘럼 정보가져오기. 해당 product 전체정보를 가져온다.
  const { data } = useVod(String(_id));

  //레슨관리 레이어 보기 버튼
  const handlerShowLessonLayer = useCallback(
    (_id: string, curriculumId: string) => {
      setCurriculumInfo({
        addCurriculumLayer: false,
        lessonLayer: true,
        _id,
        curriculumId
      });
    },
    [setCurriculumInfo]
  );

  //커리큘럼 레이어 수정 버튼
  const handlerShowModifyLayer = useCallback(
    (_id: string, curriculumId: string) => {
      setCurriculumInfo({
        addCurriculumLayer: true,
        lessonLayer: false,
        _id,
        curriculumId
      });
    },
    [setCurriculumInfo]
  );

  //커리큘럼 레이어 삭제 버튼
  const handlerDelCuriculumn = useMutation(
    (curriculumId: string) =>
      axios.delete(`/api/curriculum/${_id}?curriculumId=${curriculumId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["curriculum"]);
      },
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  // 커리큘럼 레이어닫기
  const curriculumLayerClose = useCallback(() => {
    handlerCloseVodModal();
    setCurriculumInfo({
      addCurriculumLayer: false,
      lessonLayer: false,
      _id: "",
      curriculumId: ""
    });
  }, [handlerCloseVodModal, setCurriculumInfo]);

  return (
    <WrapCurriculumLayer>
      <div className="head">
        <span>{data?.title}</span>
        <Button
          color="brand"
          size="xs"
          width="auto"
          css={css`
            margin-left: 30px;
            padding: 0 10px;
          `}
          onClick={() =>
            setCurriculumInfo({
              ...curriculumInfo,
              addCurriculumLayer: true
            })
          }
        >
          {" "}
          커리큘럼추가
        </Button>
        <span className="btn_close" onClick={curriculumLayerClose}>
          x
        </span>
      </div>

      <div className="cont">
        <ul>
          {data &&
            data?.curriculum.map(
              (el: { _id: string; title: string }, i: number) => (
                <li key={i}>
                  <span className="title">{el.title}</span>
                  <span className="box_btn_group">
                    <button onClick={() => handlerShowLessonLayer(_id, el._id)}>
                      레슨관리
                    </button>
                    <button onClick={() => handlerShowModifyLayer(_id, el._id)}>
                      수정
                    </button>
                    <button onClick={() => handlerDelCuriculumn.mutate(el._id)}>
                      삭제
                    </button>
                  </span>
                </li>
              )
            )}
        </ul>
      </div>
    </WrapCurriculumLayer>
  );
}

export default LayerCurriculumMain;
