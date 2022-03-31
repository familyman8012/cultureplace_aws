import { dehydrate, QueryClient, useQuery } from "react-query";
import { dbConnect, Product, Notice } from "../pages/api";
import Layout from "@components/layouts";
import Morebtn from "@components/pageComp/indexpage/Morebtn";
import {
  MainVisual,
  WrapIndex,
  CategoryMenu,
  CardSlideArea,
  BlogArea,
  NoticeArea
} from "@components/pageComp/indexpage";
import { fetchProducts } from "@src/hooks/api/useProducts";
import { GetServerSideProps } from "next";
import { ISSR } from "@src/typings/db";
import { IndexSeo } from "@components/elements/CommonSeo";

const Home = ({ SsrData }: ISSR) => {
  const { blogData, noticeData, products } = SsrData;

  // const { data } = useQuery(["list", "main"], () => fetchProducts(90, 1));
  const productsData = products;

  const genreTitle = [
    { title: "내가 만든 작품이 전시되는 날", url: "/view/art" },

    {
      title: "#최고의 사운드, 인생음악, #작곡, #작사, #댄스",
      url: "/view/music"
    },

    { title: "뮤지컬, 연극의 세계", url: "/view/theater" },
    { title: "힐링산책", url: "/view/healing" },

    { title: "맛, 다이닝, 요리, 와인, 쿡방", url: "/view/food" },
    {
      title: "사진, 영상, 영화의 세계",
      url: "/view/movie"
    },
    { title: "힙스타의 기본, 패션", url: "/view/fashion" },
    { title: "지헤를 얻기 위한 지식컬쳐", url: "/view/wisdom" }
  ];

  function getGenreData() {
    if (Array.isArray(productsData)) {
      return [
        productsData.filter(el => el.genre === "art"),
        productsData.filter(el => el.genre === "music"),
        productsData.filter(el => el.genre === "theater"),
        productsData.filter(el => el.genre === "healing"),
        productsData.filter(el => el.genre === "food"),
        productsData.filter(el => el.genre === "movie"),
        productsData.filter(el => el.genre === "fashion"),
        productsData.filter(el => el.genre === "wisdom")
      ];
    }
  }

  const genreData = getGenreData();

  return (
    <Layout>
      <IndexSeo />
      <MainVisual />
      <WrapIndex>
        <CategoryMenu />
        <CardSlideArea genreData={genreData} genreTitle={genreTitle} />
        <Morebtn />
        <BlogArea blogData={blogData} />
        <NoticeArea noticeData={noticeData} />
      </WrapIndex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await dbConnect();

  const [result, result2, result3] = await Promise.all([
    Notice.find(
      { category: "블로그" },
      { body: false, createdAt: false, updatedAt: false }
    )
      .limit(3)
      .lean(),
    Notice.find(
      { category: "공지사항" },
      { body: false, createdAt: false, updatedAt: false }
    )
      .limit(4)
      .lean(),
    Product.find(
      { isvod: { $ne: true }, islive: { $ne: false } },
      { body: false }
    )
      .sort({ firstmeet: 1 })
      .limit(90)
      .lean()
  ]);

  const SsrData = {
    blogData: JSON.parse(JSON.stringify(result)),
    noticeData: JSON.parse(JSON.stringify(result2)),
    products: JSON.parse(JSON.stringify(result3))
  };

  await queryClient.prefetchQuery(["list", "main"], () => SsrData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      SsrData
    }
  };
};

export default Home;
