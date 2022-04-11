import { css } from "@emotion/react";
import Card from "@components/elements/Card";
import Layout from "@components/layouts";
import { IProduct } from "@src/typings/db";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import { SearchWrap, CardWrap } from "@components/pageComp/search/styles";
import { SearchSeo } from "@components/elements/CommonSeo";

interface ISearch {
  productsCount?: number;
  products?: IProduct[];
}

function Search() {
  const router = useRouter();
  const { keyword } = router.query;

  const [pageSize, setPageSize] = useState(5);
  const [curPage, setCurPage] = useState(1);
  const [searchResult, setsearchResult] = useState<ISearch>({});

  console.log("keyword", router.query.hasOwnProperty("keyword"));

  useEffect(() => {
    setCurPage(1);
  }, [keyword, router]);

  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

  useEffect(() => {
    const searchFunc = async () => {
      if (router.query.hasOwnProperty("keyword")) {
        const searchTxt = await axios.post<
          { searchInput: string },
          AxiosResponse<ISearch>
        >(`/api/product/search?meetingcycle=oneday&page=1`, {
          searchInput: String(keyword)
        });
        setsearchResult(searchTxt.data);
      } else {
        alert("잘 못된 접근입니다.");
        router.back();
      }
    };
    searchFunc();
  }, [keyword, router, router.query]);

  return (
    <Layout>
      <SearchSeo keyword={String(keyword)} />
      <SearchWrap>
        <p className="txt_result">
          연관검색 포함 검색결과 총 {searchResult?.productsCount}가
          검색되었습니다. 이 모임을 원하시나요?
        </p>
        <CardWrap>
          {searchResult.products?.map((el: IProduct, i: number) => (
            <Fragment key={i}>
              <Link href={`/detailview/${el?._id}`}>
                <a>
                  <Card data={el} />
                </a>
              </Link>
            </Fragment>
          ))}
        </CardWrap>
        <Pagination
          css={css`
            width: fit-content;
            margin: 0 auto;
          `}
          onChange={handlePageChange}
          current={curPage}
          pageSize={pageSize}
          total={searchResult?.productsCount}
        />
      </SearchWrap>
    </Layout>
  );
}

export default Search;
