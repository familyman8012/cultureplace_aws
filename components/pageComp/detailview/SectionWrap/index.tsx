import React from "react";
import styled from "@emotion/styled";

const SectionWrap = styled.section`
  padding: 30px 20px;
  border-top: 1px solid #f3f3f6;
`;

function index({ children }: { children: React.ReactNode }) {
  return <SectionWrap>{children}</SectionWrap>;
}

export default index;
