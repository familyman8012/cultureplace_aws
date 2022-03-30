import React from "react";
import { css } from "@emotion/react";
import SwiperCore, { Autoplay, Navigation, EffectFade } from "swiper";
import { Swiper } from "swiper/react";
import { BtnNext, BtnPrev, OneSwiper, SwiperWrap } from "./styles";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

interface Props {
  children: React.ReactNode;
  breakPoint?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween?: number;
    };
  };
  i?: number;
}

// install Swiper modules
SwiperCore.use([Navigation, EffectFade, Autoplay]);

function Slider({ children, breakPoint, i }: Props) {
  return (
    <>
      {breakPoint ? (
        <SwiperWrap>
          <Swiper
            navigation={{
              prevEl: `.swiper-btn-prev${i}`,
              nextEl: `.swiper-btn-next${i}`
            }}
            breakpoints={breakPoint}
            className="swiper-container"
          >
            {children}
          </Swiper>

          <BtnPrev className={`swiper-btn-prev swiper-btn-prev${i}`}>
            <span className="hiddenZoneV">prev</span>
          </BtnPrev>
          <BtnNext className={`swiper-btn-next swiper-btn-next${i}`}>
            <span className="hiddenZoneV">next</span>
          </BtnNext>
        </SwiperWrap>
      ) : (
        <Swiper
          className="mySwiper"
          navigation={true}
          css={css`
            ${OneSwiper}
          `}
          effect={"fade"}
          loop={true}
          autoplay={{
            delay: 3500
          }}
        >
          <div className="swiper-wrapper">{children}</div>
        </Swiper>
      )}
    </>
  );
}

export default Slider;
