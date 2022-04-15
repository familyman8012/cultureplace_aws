import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchVodProducts } from "@src/hooks/api/useVodProducts";
import { VodSeo } from "@components/elements/CommonSeo";
import Layout from "@components/layouts";
import { WrapIndex, CardSlideArea } from "@components/pageComp/indexpage";
import VodVisual from "@components/pageComp/vodmain/VodVisual";

const Home = () => {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const { data } = useQuery(["listvod"], () => fetchVodProducts(90, 1));

  const genreTitle = [
    { title: "컬쳐플레이스 VOD 서비스 시작", url: "/view/healing" }
  ];

  const productsData = data?.products;
  function getGenreData() {
    if (Array.isArray(productsData)) {
      return [productsData];
    }
  }

  const genreData = getGenreData();

  return (
    <>
      {winReady && (
        <Layout>
          <VodSeo />
          <VodVisual />
          <WrapIndex>
            <CardSlideArea
              genreData={genreData}
              genreTitle={genreTitle}
              type={"vod"}
            />
          </WrapIndex>
        </Layout>
      )}
    </>
  );
};

export default Home;
