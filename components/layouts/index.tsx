import React from "react";
import Header from "./Head";
import Footer from "./Foot";
import { LayoutWrap } from "./styles";
import MobMenu from "./MobMenu";

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
