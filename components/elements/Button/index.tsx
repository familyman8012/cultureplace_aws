import React, { FC } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { darken, lighten } from "polished";

interface ISizes {
  [key: string]: { height: string; fontSize?: string };
}

const sizes: ISizes = {
  xs: {
    height: "30px",
    fontSize: "14px"
  },
  s: {
    height: "38px"
  },
  m: {
    height: "48px"
  },
  l: {
    height: "56px",
    fontSize: "14px"
  }
};

interface IColorStyle {
  theme: { color: { [key: string]: string } };
  color: string;
  outline: boolean;
  favorite: string;
  size: string;
  width?: string;
}

const btnStyle = ({
  theme,
  color,
  outline,
  favorite,
  size,
  width
}: IColorStyle) => {
  const selected = theme.color[color];

  return css`
    width: ${width};
    background: ${selected};
    height: ${sizes[size].height};
    font-size: ${sizes[size]?.fontSize};
    ${!favorite &&
    css`
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
    `}
    ${outline &&
    css`
      color: ${selected};
      border: 1px solid ${selected};
      background: #fff;
      &:hover {
        color: ${selected};
        background: #fff6f2;
      }
    `}
    ${favorite &&
    css`
      width: 5.6rem;
      background: url("/images/favorite.png") no-repeat center #f4eeea;
    `}
    ${color === "brandbg" &&
    css`
      color: ${theme.color.brand};
      &:hover {
        color: #fff;
        background: ${theme.color.brand};
      }
    `}
  `;
};

const StyledButton = styled.button`
  width: calc(100% - 65px);
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 4px;

  ${btnStyle}
`;

const Button: FC<any> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

Button.defaultProps = {
  height: "5.6rem",
  fontSize: "1.6rem"
};

export default Button;
