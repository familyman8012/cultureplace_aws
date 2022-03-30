import Button from "../components/elements/Button";
import { css } from "@emotion/react";

function Btnview() {
  return (
    <>
      <div
        css={css`
          width: 500px;
          border: 1px solid;
          Button {
            margin-bottom: 30px;
          }
        `}
      >
        <Button color="brand" size="l">
          달라지는 4개월, 지금 시작
        </Button>
        <Button color="brand" size="s">
          독서모임 캘린더 바로가기
        </Button>
        <Button color="brandbg" size="xs">
          멤버삽 신청 하러가기
        </Button>
        <Button color="brand" size="s">
          멤버삽 신청 하러가기
        </Button>
        <Button color="brand" size="m" outline>
          클럽 모두 보러가기
        </Button>
        <Button color="event" size="m" outline>
          이 이벤트는 종료 되었습니다.
        </Button>
        <Button color="gray" size="l">
          BUTTON
        </Button>
        <Button color="lightgray" size="s">
          BUTTON
        </Button>
        <Button color="lightgray" size="xs">
          BUTTON
        </Button>
      </div>
    </>
  );
}

export default Btnview;
