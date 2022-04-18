import { useCallback, useEffect, useMemo, useState } from "react";
import router from "next/router";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useBoard } from "@src/hooks/api/useBoard";
import { runInAction } from "mobx";
import { boardStore } from "@src/mobx/store";
import { observer } from "mobx-react";
import Pagination from "rc-pagination";
import Button from "@components/elements/Button";
import SearchComForm from "@components/elements/SearchComForm";
import { DayCal } from "lib";
import { css } from "@emotion/react";
import "rc-pagination/assets/index.css";
import { BoardTable, WrapBoardContent, WrapReply } from "./styles";
import { useSession } from "next-auth/client";
// import dayjs from "dayjs";

interface IList {
  parentId: string;
  boardname: string;
  boardCheck: boolean;
}

function List({ parentId, boardname, boardCheck }: IList) {
  const queryClient = useQueryClient();
  const [session] = useSession();

  /* 테이블 data 구성 및 pagination */
  const [pageSize, setPageSize] = useState(20);
  const [curPage, setCurPage] = useState(1);

  // 검색을 위한 useState
  const [findKeyWord, setfindKeyWord] = useState("");

  // 게시물 리스트 가져오기
  const { status, data, error, refetch } = useBoard(
    boardCheck,
    parentId,
    pageSize,
    curPage,
    findKeyWord
  );

  // 검색시 aggregation 보완  ()
  const [boardListData, setBoardListData] = useState(data?.board);
  const startPage = useMemo(
    () => curPage * pageSize - (pageSize - 1) - 1,
    [curPage, pageSize]
  );
  const viewData = useMemo(() => curPage * pageSize, [curPage, pageSize]);

  useEffect(() => {
    setBoardListData(
      findKeyWord === "" ? data?.board : data?.board.slice(startPage, viewData)
    );
  }, [data?.board, findKeyWord, startPage, viewData]);

  // list로 들어올때
  useEffect(() => {
    boardStore.reset();
    let qlEditor = document.querySelector(".ql-editor");
    if (qlEditor !== null) qlEditor.innerHTML = "";
  }, []);

  // 페이징 (페이지 이동)
  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

  //공지사항 등록
  const writeBoard = useCallback(() => {
    boardStore.moveCreateBoard(`${boardname}`);
    router.push(`/${boardname}/write/${parentId}`);
  }, [boardname, parentId]);

  //검색
  const handlerSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    refetch();
    setfindKeyWord("");
  };

  //답글 수
  const ReplyLength = useMemo(
    () => boardListData?.length,
    [boardListData?.length]
  );

  //답글 날짜
  const DayFunc = useCallback(diffday => DayCal(diffday), []);

  //답글 수정, 삭제
  //공지사항 수정
  const modifyBoard = useCallback(
    (_id: string) => {
      runInAction(() => {
        boardStore.moveModifyBoard(_id, boardCheck);
      });
    },
    [boardCheck]
  );

  //공지사항 삭제
  const deleteMutation = useMutation(
    (_id: string) =>
      axios.delete(`/api/board/${_id}`).then(res => {
        return res.data;
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["boardlist"]);
      },
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  return (
    <>
      {status === "loading" ? (
        <span></span>
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : boardCheck ? (
        <WrapBoardContent>
          <SearchComForm
            className="search_form"
            handlerSearch={handlerSearch}
            findKeyWord={findKeyWord}
            setfindKeyWord={setfindKeyWord}
          />

          <BoardTable>
            <colgroup>
              <col width="88px" />
              <col />
              <col width="118px" />
              <col width="80px" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">제목</th>
                <th scope="col">닉네임</th>
                <th scope="col">조회</th>
              </tr>
            </thead>
            <tbody>
              {data && data?.board?.length > 0 ? (
                <>
                  {data?.noticeboard?.map(el => (
                    <tr
                      key={el._id}
                      onClick={() =>
                        router.push(`/${boardname}/detail/${el._id}`)
                      }
                      className="noticeTr"
                    >
                      <td>
                        <strong className="badge_notice">공지사항</strong>
                      </td>
                      <td className="title">
                        <span>{el.title}</span>
                        <span className="comment_count">
                          {el.commentcount > 0 && `[${el.commentcount}]`}
                        </span>
                      </td>
                      <td>{el.nickname}</td>
                      <td>{el.readcount}</td>
                    </tr>
                  ))}
                  {data &&
                    boardListData?.map((el, i) => (
                      <tr
                        key={el._id}
                        onClick={() =>
                          router.push(`/${boardname}/detail/${el._id}`)
                        }
                      >
                        <td>
                          {data?.boardCount - ((curPage - 1) * pageSize + i)}
                        </td>
                        <td>
                          <span>{el.title}</span>
                          <span className="comment_count">
                            {el.commentcount > 0 && `[${el.commentcount}]`}
                          </span>
                        </td>
                        <td>{el.nickname}</td>
                        {/* <td>{dayjs(el.createdAt).format(`YY.MM.DD`)}</td> */}
                        <td>{el.readcount}</td>
                      </tr>
                    ))}
                </>
              ) : (
                <tr>
                  <td colSpan={4}>
                    <p
                      css={css`
                        font-size: 15px;
                        padding: 15px !important;
                      `}
                    >
                      첫 글을 올려주세요
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </BoardTable>
          <Pagination
            onChange={handlePageChange}
            current={curPage}
            showSizeChanger
            pageSize={pageSize}
            total={data?.boardCount}
          />
          <div className="btn_box">
            <Button color="black" size="s" onClick={writeBoard}>
              글쓰기
            </Button>
          </div>
        </WrapBoardContent>
      ) : (
        <WrapReply>
          <div className="answer-info__header">
            <div className="header__title">
              총 {ReplyLength}개의 답글이 달렸습니다
            </div>
            {data &&
              boardListData?.map((el, i) => (
                <div key={el._id} className="answer__comment" data-id="171442">
                  <div className="comment__index">{i + 1}</div>
                  <div className="comment__card">
                    <div className="comment__header flex-row">
                      <div className="flex-column">
                        <div className="flex-row">
                          <span>{el.nickname}</span>
                        </div>
                        <span className="comment__updated-at">
                          {DayFunc(el.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="comment__body markdown-body">
                      <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: String(el.body) }}
                      />
                      {el.userid === session?.user.uid && (
                        <div className="comment__features flex-row">
                          <div className="flex-right">
                            <button
                              className="ac-button"
                              onClick={e => {
                                e.stopPropagation();
                                runInAction(() => {
                                  boardStore.replyModify = true;
                                });
                                modifyBoard(el._id);
                              }}
                            >
                              수정
                            </button>

                            <button
                              className="ac-button"
                              onClick={e => {
                                e.stopPropagation();
                                deleteMutation.mutate(el._id);
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </WrapReply>
      )}
    </>
  );
}

export default observer(List);
