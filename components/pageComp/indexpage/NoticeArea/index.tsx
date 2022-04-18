import Link from "next/link";
import Title from "@components/elements/Title";
import dayjs from "dayjs";
import { INotice } from "@src/typings/db";
import { NoticeBox, NoticeWidth, TitleML, WrapNoticeArea } from "./styles";

export interface INoticeData {
  noticeData: INotice[];
}

function index({ noticeData }: INoticeData) {
  return (
    <WrapNoticeArea>
      <Title css={TitleML} url="/notice">
        컬쳐플레이스 공지
      </Title>
      <div className="box">
        {noticeData.map(el => {
          const { _id, title, summary, updatedAt } = el;
          const upadateDay = dayjs(updatedAt).format("YYYY.MM.DD");
          return (
            <Link href={`/notice/${_id}`} key={_id}>
              <a css={NoticeWidth}>
                <NoticeBox>
                  <dt>{title}</dt>
                  <dd className="desc">{summary}</dd>
                  <dd className="writtenDate">{updatedAt}</dd>
                </NoticeBox>
              </a>
            </Link>
          );
        })}
      </div>
    </WrapNoticeArea>
  );
}

export default index;
