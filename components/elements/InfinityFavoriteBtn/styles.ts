import styled from "@emotion/styled";

export const FavoriteBtn = styled.div<{ on: string }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 37px;
  height: 37px;
  background: url(${({ on }) =>
      on === "on"
        ? "/images/main_favorite_on.png"
        : "/images/main_favorite.png"})
    no-repeat left top;
  background-size: 37px;

  &.on {
    background: url("/images/main_favorite_on.png") no-repeat left top;
  }
`;
