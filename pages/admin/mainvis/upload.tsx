import React, { useState } from "react";
import router from "next/router";
import axios from "axios";
import useMediaUp from "@src/hooks/useMediaUp";
import AdminLayout from "@components/layouts/Admin/layout";

import { WrapDetailMV } from "./styles";
import { BoxInput } from "../index/styles";

function Mainvis() {
  //이미지 업로드 훅
  const [imgData, onImgUpHadler] = useMediaUp("mainvispc");
  const [imgData2, onImgUpHadler2] = useMediaUp("mainvismo");
  const [altText, setAltText] = useState("");

  const onHandlerTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAltText(e.target.value);
  };

  console.log(imgData);

  const onSubmit = () => {
    axios
      .post("/api/mainvisimg", {
        pclocation: imgData.replace(/\/mainvispc\//, "/mainvis/"),
        molocation: imgData2.replace(/\/mainvismo\//, "/mainvis/"),
        alt: altText
      })
      .then(res => {
        router.push("/admin/mainvis");
      });
  };
  return (
    <AdminLayout>
      <WrapDetailMV>
        <div className="inner">
          <div>
            <h2>pc 버젼</h2>
            <div className="box_pc_img">
              {imgData ? (
                <img src={imgData} alt="모임대표이미지 등록" />
              ) : (
                "파일 선택을 클릭해서 이미지를 업로드 해주세요"
              )}
            </div>

            <input
              type="file"
              id="upload"
              className="image-upload"
              onChange={onImgUpHadler}
            />
          </div>
          <div>
            <h2>모바일 버젼</h2>

            <div className="box_mo_img">
              {imgData2 ? (
                <img src={imgData2} alt="모임대표이미지 등록" />
              ) : (
                "파일 선택을 클릭해서 이미지를 업로드 해주세요"
              )}
            </div>

            <input
              type="file"
              id="upload"
              className="image-upload"
              onChange={onImgUpHadler2}
            />
          </div>
          <BoxInput>
            <span>alt</span>
            <input type="text" onChange={onHandlerTxt} value={altText} />
          </BoxInput>
          <button onClick={onSubmit}>확인</button>
        </div>
      </WrapDetailMV>
    </AdminLayout>
  );
}

export default Mainvis;
