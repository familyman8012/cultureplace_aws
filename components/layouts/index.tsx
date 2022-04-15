import React from "react";
import Header from "./Head";
import Footer from "./Foot";
import MobMenu from "./MobMenu";
import { LayoutWrap } from "./styles";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Layout({ children, className }: Props) {
  return (
    <>
      <LayoutWrap className={className}>
        <Header />
        {children}
        <MobMenu />
      </LayoutWrap>

      <Footer />
    </>
  );
}

export default Layout;
