import { useCallback, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { runInAction } from "mobx";
import { noticeStore } from "@src/mobx/store";
import { useNotices } from "@src/hooks/api/useNotices";
import AdminLayout from "@components/layouts/Admin/layout";
import Pagination from "rc-pagination";
import { GlowBtn, IndexTable, WrapIndexContent } from "../product/styles";
import "rc-pagination/assets/index.css";

export default function List() {
  const queryClient = useQueryClient();

  //불러오기
  const { status, data, error } = useNotices();

  /* 테이블 data 구성 및 pagination */
  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const dataLength = useMemo(() => data?.length, [data]);
  const startPage = useMemo(
    () => curPage * pageSize - (pageSize - 1) - 1,
    [curPage, pageSize]
  );
  const viewData = useMemo(() => curPage * pageSize, [curPage, pageSize]);
  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

  //공지사항 등록
  const writeNotice = useCallback(() => {
    noticeStore.moveCreateNotice();
  }, []);

  //공지사항 수정
  const modifyNotice = useCallback((_id: string) => {
    runInAction(() => {
      noticeStore.moveModifyNotice(_id);
    });
  }, []);

  //공지사항 삭제
  const deleteMutation = useMutation(
    (_id: string) =>
      axios.delete(`/api/notice/${_id}`).then(res => {
        return res.data;
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("noticeData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  return (
    <AdminLayout>
      {status === "loading" ? (
        <span>Loading...</span>
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : (
        <WrapIndexContent>
          <IndexTable>
            <thead>
              <tr>
                <th scope="col">카테고리</th>
                <th scope="col">글 제목</th>
                <th scope="col">보기/삭제</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.slice(startPage, viewData)?.map(el => (
                  <tr key={el._id} onClick={() => modifyNotice(el._id)}>
                    <td>{el.category}</td>
                    <td>{el.title}</td>
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
            pageSize={pageSize}
            total={dataLength}
          />
          <GlowBtn onClick={writeNotice}>공지등록</GlowBtn>
        </WrapIndexContent>
      )}
    </AdminLayout>
  );
}
