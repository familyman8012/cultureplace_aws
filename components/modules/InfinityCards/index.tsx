import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import Link from "next/link";
import { css } from "@emotion/react";
import Card from "@components/elements/Card";
import Layout from "@components/layouts";
import { useInfinity } from "@src/hooks/api/useInfinite";
import { Iinfinity, IProduct } from "@src/typings/db";
import InView from "react-intersection-observer";
import {
  FilterBtn,
  InfinityCardwrap,
  LinkCard,
  WrapInfinityPage
} from "./style";
import Search from "@components/modules/Search";
import CardBadge from "@components/elements/CardBadge";
import CardSkeleton from "@components/elements/Card/CardSkeleton";

interface IQuerykey {
  querykey: string;
  type?: string;
}

export interface ISearchCondition {
  searchInput?: string | undefined;
  filterFind: string[] | undefined;
}

export default function Infinity({ querykey, type }: IQuerykey) {
  const [filterView, setFilterView] = useState(false);

  const { data, error, fetchNextPage, status, refetch } = useInfinity(querykey);

  const handlerFilterView = (status: boolean) => {
    setFilterView(status);
    console.log(filterView);
  };

  useEffect(() => {
    if (filterView) {
      document.body.style.overflow = "hidden";
    }
    if (!filterView) {
      document.body.style.overflow = "unset";
    }
  }, [filterView]);

  return (
    <Layout>
      <FilterBtn onClick={() => handlerFilterView(true)}>
        <span>필터</span>
      </FilterBtn>
      <WrapInfinityPage>
        {(querykey === "oneday" || querykey === "month") && (
          <Search
            pageNum={1}
            refetch={refetch}
            className={filterView ? "on" : ""}
            filterView={filterView}
            handlerFilterView={handlerFilterView}
          />
        )}

        {status === "loading" ? (
          <InfinityCardwrap type={type}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <CardSkeleton key={idx} type={type} />
            ))}
          </InfinityCardwrap>
        ) : status === "error" ? (
          <p>Error</p>
        ) : (
          <>
            <InfinityCardwrap type={type}>
              {(data?.pages || []).map((group: Iinfinity, i: number) => {
                return (
                  <Fragment key={i}>
                    {group.products?.map((data: IProduct, i: number) => (
                      <Fragment key={i}>
                        <Link href={`/detailview/${data?._id}`}>
                          <a>
                            <CardBadge el={data} />
                            <Card data={data} querykey={querykey} type={type} />
                          </a>
                        </Link>
                      </Fragment>
                    ))}
                  </Fragment>
                );
              })}
            </InfinityCardwrap>
            <div>
              <InView
                as="div"
                rootMargin="100px 0px 0px 0px"
                onChange={() => fetchNextPage()}
              >
                <span className="loadSelector"></span>
              </InView>
            </div>
          </>
        )}
      </WrapInfinityPage>
    </Layout>
  );
}
