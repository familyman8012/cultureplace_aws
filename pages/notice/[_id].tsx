import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Button from "@components/elements/Button";
import Layout from "@components/layouts";
import { useNotice } from "@src/hooks/api/useNotices/useNotice";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  CreateAt,
  NoticeButton,
  NoticeView,
  Title
} from "@components/pageComp/notice/styles";

import { dehydrate, QueryClient, useQuery } from "react-query";
import { dbConnect, Notice } from "../../pages/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function DetailView() {
  const router = useRouter();
  const { _id } = router.query;
  const { status, data, error, isFetching } = useNotice(String(_id));

  const createTime = useMemo(
    () => dayjs(data?.updatedAt).format(`YYYY.MM.DD`),
    [data?.updatedAt]
  );

  console.log(data);

  return (
    <Layout>
      <NoticeView>
        {data && (
          <>
            <div className="top" onClick={() => router.back()}>
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
              목록
            </div>
            <Title>{data?.title}</Title>
            <CreateAt>{createTime}</CreateAt>
            <img src={data?.imgurl} alt={data?.title} />
            <div dangerouslySetInnerHTML={{ __html: String(data?.body) }} />
            <Button
              color="brand"
              size="s"
              css={NoticeButton}
              onClick={() => router.back()}
            >
              목록으로
            </Button>
          </>
        )}
      </NoticeView>
    </Layout>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [{ params: { _id: "6172e0d7e8fef6005983ea78" } }],
//     fallback: true // --> false 시 1,2,3외에는 404
//   };
// };

export const getServerSideProps: GetServerSideProps = async ctx => {
  await dbConnect();

  const _id = ctx.params?._id;
  const result = await Notice.find(
    { _id },
    { createdAt: false, updatedAt: false }
  ).lean();

  const data = JSON.parse(JSON.stringify(result[0]));

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["noticeViewData", _id], () => data);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      item: data
    }
  };
};

export default DetailView;
