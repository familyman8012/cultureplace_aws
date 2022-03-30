import { mq } from "@components/mq";
import styled from "@emotion/styled";

export const WrapCategoryArea = styled.div`
  position: relative;
  ${mq[0]} {
    .swiper {
      padding: 0 20px;
    }
    .swiper-btn-next,
    .swiper-btn-prev {
      display: none;
    }
  }
`;
