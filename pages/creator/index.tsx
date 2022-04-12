import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { useProducts } from "@src/hooks/api/useProducts";
import axios from "axios";
import { runInAction } from "mobx";
import { prodUpStore } from "@src/mobx/store";
import AdminLayout from "@components/layouts/Admin/layout";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { IProduct } from "@src/typings/db";
import router from "next/router";
import { useSession } from "next-auth/client";
import {
  AdminModal,
  Dimm,
  GlowBtn,
  IndexTable,
  WrapIndexContent
} from "@components/pageComp/creator/styles";
import VodManagement from "@components/pageComp/creator/VodManagement";
import IsLive from "@components/pageComp/creator/IsLive";
import MeetInfo from "@components/pageComp/creator/MeetInfo";
import SearchComForm from "@components/elements/SearchComForm";

dayjs.locale("ko");

export default function List() {
  const queryClient = useQueryClient();

  // 검색을 위한 useState
  const [findKeyWord, setfindKeyWord] = useState("");

  //검색
  const handlerSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    refetch();
    setfindKeyWord("");
  };

  /* 테이블 data 구성 및 pagination */
  const [pageSize, setPageSize] = useState(20);
  const [curPage, setCurPage] = useState(1);
  const [showMemInfo, setshowMemInfo] = useState({ show: false, _id: "" });

  //세션 정보 가져오기
  const [session] = useSession();

  //제품 정보 불러오기  limit, pageParam, genre,  creator?: string
  const { status, data, error, refetch } = useProducts(
    pageSize,
    curPage,
    undefined,
    findKeyWord,
    "creator"
  );

  // 페이징 (페이지 이동)
  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

  // 회원은 role 이 있음. master, creator, user. creator 가 아닌 그냥 user 일시, apply 페이지로 이동
  useEffect(() => {
    session?.user.role === "user" && router.push("./creator/apply");
  }, [session?.user]);

  //상풍등록하러가기
  const writeProduct = useCallback(() => {
    runInAction(() => {
      prodUpStore.moveCreateProduct();
    });
  }, []);

  //상풍수정하러가기
  const modifyProduct = (_id: string) => {
    runInAction(() => {
      prodUpStore.moveModifyProduct(_id);
    });
  };

  //상풍삭제
  const deleteMutation = useMutation(
    (_id: string) =>
      axios.delete(`/api/product/${_id}`).then(res => {
        return res.data;
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["list"]),
      onError: (error, variables, context) => {
        // I will fire first
      }
    }
  );

  //islive  를 위한 useState
  const [showLiveModal, setShowLiveModal] = useState({
    show: false,
    productId: "",
    productName: "",
    islive: false
  });

  //레이어모달 - islive 보이기
  const handlerShowLiveModal = useCallback(
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, el: IProduct) => {
      e.stopPropagation();
      setShowLiveModal({
        show: true,
        productId: el._id,
        productName: el.title,
        islive: el.islive
      });
    },
    []
  );

  // 레슨추가 modal
  const [vodManagement, setVodManagement] = useState({ _id: "", show: false });
  const handlerVodModal = useCallback((_id: string) => {
    setVodManagement({ _id, show: true });
  }, []);
  const handlerCloseVodModal = useCallback(() => {
    setVodManagement({ _id: "", show: false });
  }, []);

  return (
    <>
      {(session?.user.role === "creator" ||
        session?.user.role === "master") && (
        <>
          {status === "loading" ? (
            <AdminLayout genre={"creator"}>Loading...</AdminLayout>
          ) : status === "error" ? (
            <AdminLayout genre={"creator"}>Error: {error?.message}</AdminLayout>
          ) : (
            <AdminLayout genre={"creator"}>
              <WrapIndexContent>
                <div className="wrap_search">
                  <p>{session?.user.name} 님 반갑습니다.</p>
                  <SearchComForm
                    className="search_form"
                    handlerSearch={handlerSearch}
                    findKeyWord={findKeyWord}
                    setfindKeyWord={setfindKeyWord}
                  />
                </div>
                <IndexTable>
                  <colgroup>
                    <col width="*" />
                    <col width="*" />
                    <col width="20%" />
                    <col width="*" />
                    <col width="*" />
                    <col width="*" />
                    <col width="120px" />
                    <col width="158px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">no.</th>
                      <th scope="col">대표이미지</th>
                      <th scope="col">제목</th>
                      <th scope="col">모임정보</th>
                      <th scope="col">장소</th>
                      <th scope="col">시작일</th>
                      <th scope="col">status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.products.map((el, i) => (
                      <tr key={el._id} onClick={() => modifyProduct(el._id)}>
                        <td>{i + 1 + (curPage - 1) * pageSize}</td>
                        <td>
                          <img src={el.imgurl} alt={el.title} />
                        </td>
                        <td className="title">{el.title}</td>
                        <td>
                          {el.joinMembr.length > 0 && (
                            <span
                              onClick={e => {
                                e.stopPropagation();
                                setshowMemInfo({
                                  show: true,
                                  _id: el._id
                                });
                              }}
                            >
                              보기 ({el.joinMembr.length})
                            </span>
                          )}
                        </td>

                        <td>{el.location}</td>
                        <td>{dayjs(el.firstmeet).format(`YY.MM.DD (ddd)`)}</td>
                        <td className="live_status">
                          {session?.user.role === "master" ? (
                            <button onClick={e => handlerShowLiveModal(e, el)}>
                              {el.islive ? "live" : "unlive"}
                            </button>
                          ) : (
                            <span>{el.islive ? "등록" : "검토중"}</span>
                          )}
                        </td>
                        <td className="btn_wrap">
                          <div className="box_btn_group">
                            {el.isvod === true && (
                              <button
                                className="btn_vod"
                                onClick={e => {
                                  e.stopPropagation();
                                  handlerVodModal(el._id);
                                }}
                              >
                                VOD 관리
                              </button>
                            )}
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                deleteMutation.mutate(el._id);
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </IndexTable>
                {showMemInfo.show && (
                  <AdminModal>
                    <MeetInfo
                      showMemInfo={showMemInfo}
                      setshowMemInfo={setshowMemInfo}
                      products={data?.products}
                    />
                  </AdminModal>
                )}
                {showLiveModal.show && (
                  <AdminModal>
                    <IsLive
                      showLiveModal={showLiveModal}
                      setShowLiveModal={setShowLiveModal}
                      refetch={refetch}
                    />
                  </AdminModal>
                )}
                {vodManagement.show && (
                  <>
                    <Dimm />
                    <AdminModal>
                      <VodManagement
                        _id={vodManagement._id}
                        handlerCloseVodModal={handlerCloseVodModal}
                      />
                    </AdminModal>
                  </>
                )}
                <Pagination
                  onChange={handlePageChange}
                  current={curPage}
                  showSizeChanger
                  pageSize={pageSize}
                  total={data?.productsCount}
                />
                <GlowBtn onClick={writeProduct}>상품등록</GlowBtn>
              </WrapIndexContent>
            </AdminLayout>
          )}
        </>
      )}
    </>
  );
}
