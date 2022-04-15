import Card from "@components/elements/Card";
import Layout from "@components/layouts";
import { IProduct } from "@src/typings/db";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import "rc-pagination/assets/index.css";
import { SearchWrap, CardWrap } from "@components/pageComp/search/styles";
import { SearchSeo } from "@components/elements/CommonSeo";
import { useSearch } from "@src/hooks/api/useSearch";

function Search() {
  const router = useRouter();

  const { keyword } = router.query;
  const { status, data, error, refetch } = useSearch(String(keyword));

  return (
    <Layout>
      <SearchSeo keyword={String(keyword)} />
      <SearchWrap>
        <p className="txt_result">
          연관검색 포함 검색결과 총 {data?.productsCount}가 검색되었습니다. 이
          모임을 원하시나요?
        </p>
        <CardWrap>
          {data?.products?.map((el: IProduct, i: number) => (
            <Fragment key={i}>
              <Link href={`/detailview/${el?._id}`}>
                <a>
                  <Card data={el} querykey="search" />
                </a>
              </Link>
            </Fragment>
          ))}
        </CardWrap>
      </SearchWrap>
    </Layout>
  );
}

export default Search;
