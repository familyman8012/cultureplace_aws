import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/client";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useReview } from "@src/hooks/api/useReview";
import Pagination from "rc-pagination";
import SectionWrap from "../SectionWrap";
import ListItem from "./ListItem";
import ReviewModal from "./ReviewModal";
import Button from "@components/elements/Button";
import { IProduct } from "@src/typings/db";
import "rc-pagination/assets/index.css";
import { ReviewList, ReviewTitle, WriteBtn } from "./style";

export interface IReviewModify {
  [key: string]: string;
}

function Index({ item, id }: { item: IProduct; id: string }) {
  const [session] = useSession();
  const [review, setReview] = useState({
    title: "",
    username: String(session?.user.name),
    content: "",
    userid: session?.user.uid,
    product: id
  });
  const [curPage, setCurPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setmodalState] = useState({ _id: "", state: "" });

  const { status, data: reviewData, error } = useReview(id, curPage);

  const handlePageChange = useCallback((page: number) => {
    setCurPage(page);
  }, []);

  const openModal = useCallback(() => {
    setReview({ ...review, title: "", content: "", username: "" });
    setmodalState(
      !modalOpen ? { _id: "", state: "save" } : { _id: "", state: "" }
    );
    setModalOpen(prev => !prev);
  }, [modalOpen, review]);

  const modifyModal = ({
    title,
    content,
    username,
    _id,
    state
  }: IReviewModify) => {
    openModal();
    setReview({ ...review, title, content, username });
    setmodalState({ _id, state });
  };

  const queryClient = useQueryClient();

  const saveReviewMutation = useMutation(
    () => axios.post(`/api/review/${id}`, review).then(res => {}),
    {
      onSuccess: () => queryClient.invalidateQueries("reviewData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  const updateReviewMutation = useMutation(
    (_id: string) => axios.put(`/api/review/${_id}`, review).then(res => {}),
    {
      onSuccess: () => queryClient.invalidateQueries("reviewData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  const delReviewMutation = useMutation(
    (_id: string) => axios.delete(`/api/review/${_id}`).then(res => {}),
    {
      onSuccess: () => queryClient.invalidateQueries("reviewData"),
      onError: (error, variables, context) => {
        // I will fire first
        console.log(error, variables);
      }
    }
  );

  const reviewBtnShow = useMemo(
    () => item.joinMembr.some(x => x === session?.user.uid),
    [item.joinMembr, session?.user.uid]
  );

  return (
    <SectionWrap>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : (
        <>
          <ReviewTitle>멤버들은 이렇게 느꼈어요.</ReviewTitle>
          <ReviewList>
            <ul className="list">
              {reviewData?.reviews.length === 0 ? (
                <div>리뷰가 아직 등록되지 않았습니다.</div>
              ) : (
                reviewData?.reviews.map((el, i) => {
                  return (
                    <ListItem
                      key={el.title}
                      data={el}
                      session={session}
                      modifyModal={modifyModal}
                      delReviewMutation={delReviewMutation}
                    />
                  );
                })
              )}
            </ul>
            <Pagination
              onChange={handlePageChange}
              current={curPage}
              pageSize={5}
              total={reviewData?.count}
            />
            {/* {reviewBtnShow && (
              <Button
                color="brand"
                size="xs"
                outline
                css={WriteBtn}
                onClick={openModal}
              >
                리뷰등록
              </Button>
            )} */}
            <Button
              color="brand"
              size="xs"
              outline
              css={WriteBtn}
              onClick={openModal}
            >
              리뷰등록
            </Button>
          </ReviewList>
          {modalOpen && (
            <ReviewModal
              openModal={openModal}
              review={review}
              setReview={setReview}
              saveReviewMutation={saveReviewMutation}
              updateReviewMutation={updateReviewMutation}
              modalState={modalState}
              item={item}
            />
          )}
        </>
      )}
    </SectionWrap>
  );
}

export default Index;
