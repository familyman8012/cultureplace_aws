import React, { useState } from "react";
import { Session } from "next-auth";
import { UseMutationResult } from "react-query";
import { IReviewModify } from ".";
import { IReview } from "@src/typings/db";
import { Item } from "./style";

export interface IReviewListItem {
  data: IReview;
  session: Session | null;
  modifyModal: ({
    title,
    content,
    username,
    _id,
    state
  }: IReviewModify) => void;
  delReviewMutation: UseMutationResult<void, unknown, string, unknown>;
}

function ListItem({
  data,
  session,
  modifyModal,
  delReviewMutation
}: IReviewListItem) {
  const [show, setShow] = useState(false);

  const { _id, title, content, username } = data;

  return (
    <Item
      onClick={() => setShow(prev => !prev)}
      className={`list-item ${show ? "on" : ""}`}
    >
      <div className="title">{title}</div>
      <div className="content">
        {content?.split("\n").map((reviewtxt: string, i: number) => {
          return (
            <React.Fragment key={`line${i}`}>
              {reviewtxt}
              <br />
            </React.Fragment>
          );
        })}
      </div>
      {data.userid === session?.user.uid && (
        <div className="username">
          {username}

          <span className="del" onClick={() => delReviewMutation.mutate(_id)}>
            삭제
          </span>
          <span
            onClick={() =>
              modifyModal({ title, content, username, _id, state: "modify" })
            }
          >
            수정
          </span>
        </div>
      )}
    </Item>
  );
}

export default ListItem;
