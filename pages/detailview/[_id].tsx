import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { dbConnect, Product } from "../../pages/api";
import Layout from "@components/layouts";
import { IProduct } from "@src/typings/db";
import { css } from "@emotion/react";
import {
  Content,
  DetailViewWrap,
  EditTxt
} from "@components/pageComp/detailview/styles";
import {
  BannerImg,
  Benefit,
  ClubDetailInfo,
  Faq,
  Refund,
  WePlay,
  InfoMemberChart,
  InfoCard
} from "@components/pageComp/detailview";
import React from "react";
import Modal from "@components/elements/Modal";
import Review from "@components/pageComp/detailview/Review";
import { useSession } from "next-auth/client";
import Curriculum from "@components/pageComp/detailview/Curriculum";
import { DetailSeo } from "@components/elements/CommonSeo";

export interface IDetail {
  item: IProduct;
}

const DetailView = ({ item }: IDetail) => {
  const [session] = useSession();
  const router = useRouter();
  const { _id } = router.query;

  const { data } = useQuery("detail", () => item);

  return (
    <Layout className="detail">
      <DetailSeo
        _id={String(_id)}
        imgurl={String(data?.imgurl)}
        title={String(data?.title)}
      />
      <DetailViewWrap>
        {data && _id !== undefined && (
          <>
            <InfoCard data={data} _id={String(_id)} session={session} />
            <Content>
              <EditTxt dangerouslySetInnerHTML={{ __html: data?.body }} />
              {data.isvod ? (
                <Curriculum data={data} />
              ) : (
                <ClubDetailInfo item={data} />
              )}
              <InfoMemberChart />

              <Review item={data} id={String(_id)} />
              <WePlay />
              <Benefit />
              <Refund title={data.title} />
              <Faq />
            </Content>
          </>
        )}
      </DetailViewWrap>
    </Layout>
  );
};

export default DetailView;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { _id: "61de711076486851207e9bf2" } }],
    fallback: true // --> false 시 1,2,3외에는 404
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  await dbConnect();

  const _id = ctx.params?._id;
  const result = await Product.find(
    { _id },
    { createdAt: false, updatedAt: false }
  ).lean();

  const data = JSON.parse(JSON.stringify(result[0]));

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("detail", () => data);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      item: data
    }
  };
};
