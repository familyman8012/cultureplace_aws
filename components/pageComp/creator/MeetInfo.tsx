import React, { Dispatch, SetStateAction } from "react";
import { IProduct } from "@src/typings/db";
import { MeetInfoLayer } from "./styles";
import { useProdDetail } from "@src/hooks/api/useProducts/useProductDetail";
import { css } from "@emotion/react";

interface IShowMemInfo {
  show: boolean;
  _id: string;
}

interface IJoinMembr {
  name: string;
  email: string;
  phone: string;
}

interface IMeetInfo {
  showMemInfo: IShowMemInfo;
  setshowMemInfo: Dispatch<SetStateAction<IShowMemInfo>>;
  products: IProduct[] | undefined;
}

function MeetInfo({ showMemInfo, setshowMemInfo, products }: IMeetInfo) {
  // 게시물 리스트 가져오기
  const { status, data, error, refetch } = useProdDetail(showMemInfo._id);
  const meetInfoData = data as any;

  return (
    <MeetInfoLayer>
      <span
        className="btn_close"
        onClick={e => {
          e.stopPropagation();
          setshowMemInfo({ show: false, _id: "" });
        }}
      >
        x
      </span>
      <h2>Join Member</h2>
      <div className="memberArea">
        <h2>모임리더</h2>
        <div
          className="creator"
          css={css`
            margin: 0 0 10px;
            span {
              margin-right: 10px;
            }
          `}
        >
          <span>{meetInfoData?.creator.name}</span>
          <span>{meetInfoData?.creator.email}</span>
          <span>{meetInfoData?.creator.phone}</span>
        </div>
        <h2>신청하신 분(결제완료)</h2>
        <table>
          <tbody>
            {meetInfoData.map((el: IJoinMembr, i: number) => (
              <tr key={i}>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MeetInfoLayer>
  );
}

export default MeetInfo;
