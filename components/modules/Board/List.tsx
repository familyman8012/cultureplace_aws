import { useCallback, useEffect, useMemo, useState } from "react";
import { runInAction } from "mobx";
import { boardStore } from "@src/mobx/store";
import { useBoard } from "@src/hooks/api/useBoard";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import router from "next/router";
import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { BoardTable, WrapBoardContent, WrapReply } from "./styles";
import Button from "@components/elements/Button";
import SearchComForm from "@components/elements/SearchComForm";
import dayjs from "dayjs";
// import dayjs from "dayjs";

interface IList {
  parentId: string;
  boardname: string;
  boardCheck: boolean;
}

function List({ parentId, boardname, boardCheck }: IList) {
  /* 테이블 data 구성 및 pagination */
  const [pageSize, setPageSize] = useState(20);
  const [curPage, setCurPage] = useState(1);

  // 검색을 위한 useState
  const [findKeyWord, setfindKeyWord] = useState("");

  // 게시물 리스트 가져오기
  const { status, data, error, refetch } = useBoard(
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

  return (
    <>
      {status === "loading" ? (
        <span>Loading...</span>
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
              {data?.noticeboard?.map((el, i) => (
                <tr
                  key={el._id}
                  onClick={() => router.push(`/${boardname}/detail/${el._id}`)}
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
                    <td>{data?.boardCount - ((curPage - 1) * pageSize + i)}</td>
                    <td>
                      <span>{el.title}</span>
                      <span className="comment_count">
                        {/* {el.commentcount > 0 && `[${el.commentcount}]`} */}
                      </span>
                    </td>
                    <td>{el.nickname}</td>
                    {/* <td>{dayjs(el.createdAt).format(`YY.MM.DD`)}</td> */}
                    <td>{el.readcount}</td>
                  </tr>
                ))}
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
            <div className="answer__comment" data-id="171442">
              <div className="comment__index">1</div>
              <div className="comment__card">
                <div className="comment__header flex-row">
                  <div className="flex-column">
                    <div className="flex-row">
                      <a href="/users/@zerocho" className="comment__user-name">
                        조현영
                      </a>
                    </div>
                    <span className="comment__updated-at"></span>
                  </div>
                </div>
                <div className="comment__body markdown-body">
                  <p>네 개발 후에는 faker 삭제하시는 게 좋습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </WrapReply>
      )}
    </>
  );
}

export default observer(List);
