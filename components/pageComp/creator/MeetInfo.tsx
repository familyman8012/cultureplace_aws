import React, { Dispatch, SetStateAction } from "react";
import { IProduct } from "@src/typings/db";
import { MeetInfoLayer } from "./styles";

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
        <table>
          <tbody>
            {products
              ?.find(el => el._id === showMemInfo._id)
              ?.joinMembr.map((el: any, i) => (
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
