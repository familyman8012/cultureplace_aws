import dayjs from "dayjs";
import "dayjs/locale/ko";
import { INotice } from "@src/typings/db";
import { BlogCardWrap } from "./styles";

dayjs.locale("ko");

interface IBlogCard {
  type?: string;
  data: INotice;
}

function Card({ type = "blog", data, ...rest }: IBlogCard) {
  return (
    <BlogCardWrap type={type} {...rest}>
      <div className="imgbox">
        <img src={data.imgurl} alt="모임사진" />
      </div>
      <dl className="txtbox">
        <dt>{data.title}</dt>
        <dd className="desc">{data.summary}</dd>
        <dd className="create_at">2021.09.23</dd>
      </dl>
    </BlogCardWrap>
  );
}

export default Card;
