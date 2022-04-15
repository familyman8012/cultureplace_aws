import styled from "@emotion/styled";

const BannerImg = styled.div<{ height?: string; bgimg?: string }>`
  height: ${({ height }) => height};
  width: 100%;
  background: url(${({ bgimg }) => bgimg}) no-repeat center center;
  background-size: cover;
`;

export default BannerImg;
