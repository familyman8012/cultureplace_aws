import { useState, Dispatch, SetStateAction } from "react";
import LayerCurriculumAdd from "./LayerCurriculumAdd";
import LayerCurriculumMain from "./LayerCurriculumMain";
import LessonManagement from "./LessonManagement";

export interface ICurriculum {
  _id: string;
  handlerCloseVodModal: () => void;
}

interface ICurriculumInfo {
  addCurriculumLayer: boolean;
  lessonLayer: boolean;
  _id: string;
  curriculumId: string;
}

export interface ISetuCrriculumInfo {
  _id: string;
  curriculumInfo: ICurriculumInfo;
  setCurriculumInfo: Dispatch<SetStateAction<ICurriculumInfo>>;
}

function VodManagement({ _id, handlerCloseVodModal }: ICurriculum) {
  // 레슨레이어에 정보넘기기
  const [curriculumInfo, setCurriculumInfo] = useState({
    addCurriculumLayer: false,
    lessonLayer: false,
    _id: "",
    curriculumId: ""
  });

  //LayerCurriculumMain 커리큘럼 레이어, LayerCurriculumAdd 커리큘럼 추가 레이어,
  //LessonManagement 레슨 관리 레이어

  return (
    <>
      <LayerCurriculumMain
        _id={_id}
        handlerCloseVodModal={handlerCloseVodModal}
        curriculumInfo={curriculumInfo}
        setCurriculumInfo={setCurriculumInfo}
      />
      {curriculumInfo.addCurriculumLayer && (
        <LayerCurriculumAdd
          _id={_id}
          curriculumInfo={curriculumInfo}
          setCurriculumInfo={setCurriculumInfo}
        />
      )}
      {curriculumInfo.lessonLayer && (
        <LessonManagement
          _id={curriculumInfo._id}
          curriculumId={curriculumInfo.curriculumId}
          curriculumInfo={curriculumInfo}
          setCurriculumInfo={setCurriculumInfo}
        />
      )}
    </>
  );
}

export default VodManagement;
