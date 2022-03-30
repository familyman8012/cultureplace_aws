import Button from "@components/elements/Button";
import React, { useState, useCallback, Dispatch, SetStateAction } from "react";
import { WrapCurriculumAddLayer } from "./styles";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ISetuCrriculumInfo } from "./VodManagement";

function LayerCurriculumAdd({
  _id,
  curriculumInfo,
  setCurriculumInfo
}: ISetuCrriculumInfo) {
  const queryClient = useQueryClient();

  // 커리큘럼 제목
  const [writeCurriculumTitle, setWriteCurriculumTitle] = useState("");

  // 커리큘럼 제목 쓰기
  const writeCurriculumTiltle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setWriteCurriculumTitle(e.target.value);
    },
    []
  );

  //커리큘럼추가
  const handlerAddCuriculumn = useMutation(
    () =>
      axios
        .patch(`/api/curriculum/${_id}`, {
          curriculum: {
            title: writeCurriculumTitle
          }
        })
        .then(res => {
          console.log(res);
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["curriculum"]);
        setCurriculumInfo({
          addCurriculumLayer: false,
          lessonLayer: false,
          _id: "",
          curriculumId: ""
        });
        setWriteCurriculumTitle("");
      },
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  //커리큘럼 수정
  const handlerModifyCuriculumn = useMutation(
    (curriculumId: string) =>
      axios
        .put(`/api/curriculum/${_id}?curriculumId=${curriculumId}`, {
          curriculum: {
            title: writeCurriculumTitle
          }
        })
        .then(res => {
          console.log(res);
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["curriculum"]);
        setCurriculumInfo({
          addCurriculumLayer: false,
          lessonLayer: false,
          _id: "",
          curriculumId: ""
        });
        setWriteCurriculumTitle("");
      },
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  //커리큘럼 추가 레이어 닫기  : 커리큘럼 닫을 때, 레슨 레이어에 있는 정보도 모두 리셋
  const closeCurriAddLayer = useCallback(() => {
    setWriteCurriculumTitle("");
    setCurriculumInfo({
      addCurriculumLayer: false,
      lessonLayer: false,
      _id: "",
      curriculumId: ""
    });
  }, [setCurriculumInfo]);

  return (
    <WrapCurriculumAddLayer>
      <div>
        <span className="title">제목 :</span>
        <input
          type="text"
          name="title"
          onChange={writeCurriculumTiltle}
          value={writeCurriculumTitle}
        />
      </div>
      <div className="box_btn_group">
        {curriculumInfo._id === "" ? (
          <Button
            color="brand"
            size="xs"
            width="49%"
            onClick={() => handlerAddCuriculumn.mutate()}
          >
            추가
          </Button>
        ) : (
          <Button
            color="brand"
            size="xs"
            width="49%"
            onClick={() =>
              handlerModifyCuriculumn.mutate(curriculumInfo.curriculumId)
            }
          >
            수정
          </Button>
        )}
        <Button color="gray" size="xs" width="49%" onClick={closeCurriAddLayer}>
          닫기
        </Button>
      </div>
    </WrapCurriculumAddLayer>
  );
}

export default LayerCurriculumAdd;
