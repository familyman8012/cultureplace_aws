import React from "react";
import { ICurriculum, ILesson } from "@src/typings/db";
import { CurriculumList } from "./style";

function Curriculum({ data }: any) {
  return (
    <CurriculumList>
      <h2>커리큘럼</h2>
      <p>
        클래스를 신청하신 분들이 배우고 있는 커리큘럼입니다. 콘텐츠는 배우기
        쉽게 영상과 그에 대한 설명으로 구성되어있습니다.
      </p>
      {data?.curriculum?.map((el: ICurriculum) => (
        <React.Fragment key={el._id}>
          <h3>{el.title}</h3>
          {el.lessons.map((lessonItem: ILesson) => (
            <ul key={lessonItem._id}>
              <li>{lessonItem.title}</li>
            </ul>
          ))}
        </React.Fragment>
      ))}
    </CurriculumList>
  );
}

export default Curriculum;
