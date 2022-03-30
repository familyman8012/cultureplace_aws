import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Btn = () =>
  css`
    position: absolute;
    top: 50%;
    width: 3.7rem;
    height: 3.7rem;
    transform: translateY(-50%);
    background: url("/images/arrow_swiper.png") no-repeat left top;
    background-size: 3.7rem;
  `;

export const BtnPrev = styled.div`
  ${Btn};
  left: -50px;
`;

export const BtnNext = styled.div`
  ${Btn};
  right: -50px;
  transform: rotateY(180deg) translateY(-50%);
`;

export const OneSwiper = css`
  .swiper-button-prev,
  .swiper-button-next {
    width: 37px;
    height: 37px;
    &:after {
      display: none;
    }
  }
  .swiper-button-prev {
    background: url("/images/arrowWhite_swiper.png") no-repeat left top;
    background-size: 37px;
  }
  .swiper-button-next {
    transform: rotateY(180deg);
    background: url("/images/arrowWhite_swiper.png") no-repeat left top;
    background-size: 37px;
  }
`;

export const SwiperWrap = styled.div`
  // .swiper-btn-prev,
  // .swiper-btn-next {
  //   display: none;
  // }
`;
