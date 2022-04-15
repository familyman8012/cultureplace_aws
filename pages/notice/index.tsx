import { useState } from "react";
import { dbConnect, Notice } from "../../pages/api";
import Link from "next/link";
import { dehydrate, QueryClient } from "react-query";
import { NewsSeo } from "@components/elements/CommonSeo";
import BannerImg from "@components/elements/BannerImg";
import BlogCard from "@components/elements/BlogCard";
import Layout from "@components/layouts";
import {
  NotiBnrInner,
  SectionNotice,
  TabNotice,
  WrapNotice
} from "@components/pageComp/notice/styles";
import { INotice } from "@src/typings/db";
import { css } from "@emotion/react";

interface INoticeList {
  noticeData: INotice[];
}

function Index({ noticeData }: INoticeList) {
  //불러오기

  const TabNoticeList = [
    "전체보기",
    "공지사항",
    "가이드",
    "블로그",
    "사람들",
    "소식"
  ];

  const [tab, setTab] = useState(0);

  let noticeView = noticeViewFunc(tab);
  function noticeViewFunc(tab: number) {
    if (tab === 0) {
      return noticeData;
    } else {
      return noticeData.filter(el => el.category === TabNoticeList[tab]);
    }
  }

  return (
    <Layout>
      <NewsSeo />
      <div
        css={css`
          display: none;
        `}
      >
        <BannerImg height="360px" bgimg="/images/bg1.jpg">
          <NotiBnrInner>
            <p className="txt1">문화는 추억이다.</p>
            <p className="txt2">
              그리고 이제 새로운 추억을 만들어야 할 시간이다.
            </p>
          </NotiBnrInner>
        </BannerImg>
      </div>
      <SectionNotice>
        <TabNotice>
          {TabNoticeList.map((txt: string, i: number) => (
            <li
              key={i}
              onClick={() => setTab(i)}
              className={tab === i ? "on" : ""}
            >
              {txt}
            </li>
          ))}
        </TabNotice>
        {noticeView && (
          <WrapNotice>
            {noticeView?.map((el: INotice) => {
              return (
                <Link href={`/notice/${el._id}`} key={el._id}>
                  <a>
                    <BlogCard type="notice" data={el} />
                  </a>
                </Link>
              );
            })}
          </WrapNotice>
        )}
      </SectionNotice>
    </Layout>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await dbConnect();

  const result = await Notice.find({}, { body: false }).lean();
  const noticeData = JSON.parse(JSON.stringify(result));

  await queryClient.prefetchQuery("noticeData", () => noticeData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      noticeData
    }
  };
}

export default Index;
