import Link from "next/link";
import BlogCard from "@components/elements/BlogCard";
import Title from "@components/elements/Title";
import { INotice } from "@src/typings/db";
import { NoticeTitle, WrapBlogArea, WrapBlogCont } from "./styles";

export interface IBlogData {
  blogData: INotice[];
}

function index({ blogData }: IBlogData) {
  return (
    <WrapBlogArea>
      <Title css={NoticeTitle} url="/notice">
        블로그
      </Title>
      <WrapBlogCont>
        {blogData?.map(el => (
          <Link href={`/notice/${el._id}`} key={el._id}>
            <a className="blogwidth">
              <BlogCard type="blog" data={el} />
            </a>
          </Link>
        ))}
      </WrapBlogCont>
    </WrapBlogArea>
  );
}

export default index;
