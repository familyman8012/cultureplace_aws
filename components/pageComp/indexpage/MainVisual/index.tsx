import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { debounce } from "lodash";
import Slider from "@components/modules/Slider";
import { IMainVis } from "@src/typings/db";
import { Mainvis, SlideItem, TxtBox } from "./styles";

export interface IMainVisImgs {
  mainVisImgs: IMainVis[];
}

function Index() {
  const [windowWidthSize, setWindowWidthSize] = useState<number>(1000);

  const handleResize = debounce(() => {
    setWindowWidthSize(window.innerWidth);
  }, 25);

  useEffect(() => {
    setWindowWidthSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const MainVisTxt = [
    {
      txt1: "문화를 즐기는,",
      txt2: "문화를 만드는",
      txt3: `우리는 컬쳐플레이스입니다.`
    },
    {
      txt1: "내가 그린 그림으로",
      txt2: "전시회를 열고 싶다면?",
      txt3: `컬쳐플레이스에서 이제 화가의 꿈을 이루어보세요`
    },
    {
      txt1: "스트레스여 안녕~",
      txt2: "신나게 춤추자",
      txt3: `다이어트도 OK~ 몸치도 따라하는 힙한댄스`
    },
    {
      txt1: "인생작 같이 보자.",
      txt2: "영화를 같이 만들자.",
      txt3: `영화 좋아하는 사람들 모두 모여라.`
    },
    {
      txt1: "요리는 문화다",
      txt2: "맛있고 재밌는 요리",
      txt3: `맛집도 가고, 요리도 만들고, 친구도 사귀고!`
    },
    {
      txt1: "뮤지컬, 연극",
      txt2: "무대 위의 당신",
      txt3: `공연을 즐기다, 공연을 만들다`
    }
  ];

  return (
    <Mainvis>
      <Slider>
        {MainVisTxt?.map((el, i: number) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <SlideItem i={i} on={isActive ? "on" : ""}>
                <div className="txtbox">
                  <p className="txt1">{el.txt1}</p>
                  <p className="txt2">{el.txt2}</p>
                  <p className="txt3">{el.txt3}</p>
                  <a>GET START</a>
                </div>
              </SlideItem>
            )}
          </SwiperSlide>
        ))}
      </Slider>
    </Mainvis>
  );
}

export default Index;
