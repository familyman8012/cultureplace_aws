import React, { useMemo } from "react";
import Title from "../Title";
import SectionWrap from "../SectionWrap";
import { ClubInfoTable } from "./style";
import { IDetail } from "pages/detailview/[_id]";
import dayjs from "dayjs";

function Index({ item }: IDetail) {
  const {
    firstmeet,
    location,
    meetday,
    title,
    meetingcycle,
    quanity,
    joinMembr
  } = item;
  const day = useMemo(
    () => dayjs(firstmeet).add(4, "month").format("YYYY년 MM월 DD일"),
    [firstmeet]
  );

  const meetCycleArray: string[] = [];

  const meetCycleDay = (i = 0) => {
    return `${i + 1}회차 ${dayjs(firstmeet)
      .add(1 * i, "week")
      .format("YYYY.MM.DD(ddd)")}`;
  };

  const meetCycleFunc = () => {
    let num;
    meetingcycle === "oneday" ? (num = 1) : (num = 4);
    for (let i = 0; i < num; i++) {
      meetCycleArray.push(meetCycleDay(i));
    }
  };
  meetCycleFunc();
  return (
    <SectionWrap>
      <Title>클럽 상세 안내</Title>
      <ClubInfoTable>
        <tbody>
          <tr>
            <th scope="row">멤버십</th>
            <td>결제일부터 {day}까지</td>
          </tr>
          <tr>
            <th scope="row">장소</th>
            <td>{location}</td>
          </tr>
          <tr>
            <th scope="row">모임일정</th>
            <td>
              {meetday}
              <br />
              {meetCycleArray.map(el => (
                <React.Fragment key={el}>
                  {el}
                  <br />
                </React.Fragment>
              ))}
            </td>
          </tr>
          <tr>
            <th scope="row">메모리얼 리뷰</th>
            <td>
              매 모임 2일 전까지 클럽 모임 페이지에 제출 | 최소 글자수 400자
            </td>
          </tr>
          <tr>
            <th scope="row">공지사항</th>
            <td>
              <ul>
                <li>
                  [{title}]의 모임 인원은 최대 {quanity}명입니다.{" "}
                  {joinMembr.length > quanity / 3 &&
                    `현재 ${joinMembr.length} 명이 신청 중입니다.`}
                </li>
                <li>
                  첫 모임 9일 전까지 모임 인원이 충족되지 않으면 모집 기간
                  연장을 위해 전체 일정을 1주 ~ 1개월 연기할 수 있습니다.
                </li>
                <li>
                  오프라인에서 진행되는 클럽입니다. 사회적 거리두기 4단계에서는
                  시설 이용 시간 제한(22시까지)으로 모임 시간이 19시~22시로
                  조정될 수 있습니다.
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </ClubInfoTable>
    </SectionWrap>
  );
}

export default Index;
