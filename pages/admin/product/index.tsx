import { useCallback, useMemo, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { fetchProducts, useProducts } from "@src/hooks/api/useProducts";
import axios from "axios";
import { runInAction } from "mobx";
import { prodUpStore } from "@src/mobx/store";
import AdminLayout from "@components/layouts/Admin/layout";
import { WrapIndexContent, IndexTable, GlowBtn } from "./styles";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { IProductList, IUser } from "@src/typings/db";
import { css } from "@emotion/react";

dayjs.locale("ko");

export default function List() {
  const queryClient = useQueryClient();
  /* 테이블 data 구성 및 pagination */
  const [pageSize, setPageSize] = useState(20);
  const [curPage, setCurPage] = useState(1);
  const [showMemInfo, setshowMemInfo] = useState(0);

  //불러오기
  const { status, data, error } = useProducts(pageSize, curPage, "all");
  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

  //상풍등록하러가기
  const writeProduct = useCallback(() => {
    runInAction(() => {
      prodUpStore.moveCreateProduct();
    });
  }, []);

  //상풍수정하러가기)
  const modifyProduct = (_id: string) => {
    runInAction(() => {
      prodUpStore.moveModifyProduct(_id);
    });
  };

  // const showMember = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   alert("aa");
  // }, []);

  //상풍삭제
  const deleteMutation = useMutation(
    (_id: string) =>
      axios.delete(`/api/product/${_id}`).then(res => {
        return res.data;
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["list", "all", String(curPage)]),
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  const HandlerShowMember = (
    e: React.MouseEvent<HTMLSpanElement>,
    i: number
  ) => {
    e.stopPropagation();
    setshowMemInfo(i + 1);
  };
  interface IJoinmember {
    joinmember: IUser;
  }
  return (
    <AdminLayout>
      {status === "loading" ? (
        <span>Loading...</span>
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : (
        <WrapIndexContent>
          <IndexTable showMemInfo={showMemInfo}>
            <thead>
              <tr>
                <th scope="col">no.</th>
                <th scope="col">대표이미지</th>
                <th scope="col">제목</th>
                <th scope="col">장소</th>
                <th scope="col">모임주기</th>
                <th scope="col">시작일</th>
                <th scope="col">신청회원정보</th>
                <th scope="col">삭제</th>
              </tr>
            </thead>
            <tbody>
              {data?.products.map((el, i) => (
                <tr
                  className={`tr_product${i + 1}`}
                  key={el._id}
                  onClick={() => modifyProduct(el._id)}
                >
                  <td>{i}</td>
                  <td>
                    <img src={el.imgurl} alt={el.title} />
                  </td>
                  <td>{el.title}</td>
                  <td>{el.location}</td>
                  <td>{el.meetday}</td>
                  <td>{dayjs(el.firstmeet).format(`YY.MM.DD (ddd)`)}</td>
                  <td>
                    <span onClick={e => HandlerShowMember(e, i)}>정보보기</span>
                    <div
                      className="layerMember"
                      css={css`
                        position: relative;
                      `}
                      onClick={e => e.stopPropagation()}
                    >
                      <span
                        css={css`
                          position: absolute;
                          top: 5px;
                          right: 5px;
                        `}
                      >
                        x
                      </span>
                      <ul
                        css={css`
                          position: absolute;
                          top: 0;
                          left: 0;
                          background: black;
                          display: flex;
                          width: 350px;
                        `}
                      >
                        {el.joinMembr.map((joinmember: any, i: number) => (
                          <li key={i}>
                            <div
                              css={css`
                                padding: 10px;
                                span,
                                .phone {
                                  color: #fff;
                                }
                              `}
                            >
                              <span>
                                {joinmember.name} : {joinmember.email}
                              </span>
                              <div className="phone">{joinmember.phone}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* <button onClick={e => showMember(e)}>회원정보보기</button> */}
                    <span>
                      {/* {el.joinMembr.map((i, member) => {
                        console.log(el);
                        return <span key={`member${i}`}>1</span>;
                      })} */}
                    </span>
                  </td>
                  <td className="col_wrap">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        deleteMutation.mutate(el._id);
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </IndexTable>
          <Pagination
            onChange={handlePageChange}
            current={curPage}
            showSizeChanger
            pageSize={pageSize}
            total={data?.productsCount}
          />
          <GlowBtn onClick={writeProduct}>상품등록</GlowBtn>
        </WrapIndexContent>
      )}
    </AdminLayout>
  );
}
