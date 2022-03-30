import styled from "@emotion/styled";
import React from "react";

function index() {
  const Item = styled.div<{ active?: boolean }>`
    display: flex;
    margin-top: 20px;
    background: ${({ active }) => (active ? "red" : "blue")};
  `;
  return <Item>12312</Item>;
}

export default index;
