import { useState } from "react";
import axios from "axios";

function Crolling() {
  const [data, setData] = useState([
    {
      body: "<p>sdfasf</p>",
      firstmeet: "2022-01-11T21:30",
      genre: "movie",
      imgurl:
        "https://cultureplace.s3-ap-northeast-2.amazonaws.com/card/2201112101_logo_hip.png",
      location: "강남",
      meetday: "화요일",
      meetingcycle: "oneday",
      people: "asdfsa",
      price: "1000",
      saleprice: "0",
      title: "asdfas"
    },
    {
      body: "<p>sdfasf</p>",
      firstmeet: "2022-01-11T21:30",
      genre: "movie",
      imgurl:
        "https://cultureplace.s3-ap-northeast-2.amazonaws.com/card/2201112101_logo_hip.png",
      location: "강남",
      meetday: "화요일",
      meetingcycle: "oneday",
      people: "asdfsa",
      price: "1000",
      saleprice: "0",
      title: "asdfas"
    }
  ]);

  //등록
  const saveProduct = () => {
    data.forEach(el =>
      axios.post("/api/product/", el).then(function (resp) {
        console.log("등록");
      })
    );
  };

  const getCrolling = () => {
    axios.get("/api/product/crolling");
  };

  return (
    <div>
      <button onClick={saveProduct}>등록</button>
      <button onClick={getCrolling}>크롤링 테스트</button>
    </div>
  );
}

export default Crolling;
