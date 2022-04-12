import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MobileMenu } from "./styles";

function MobMenu() {
  // 메뉴를 위해 url 가져오기
  const [headUrl, setheadUrl] = useState("");
  useEffect(() => {
    setheadUrl(
      window?.location?.pathname.substring(
        window?.location?.pathname.lastIndexOf("/") + 1
      )
    );
  }, []);

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <MobileMenu>
      <Link href="/">
        <a>
          <span className={headUrl === "" ? "on" : "off"}> 홈</span>
        </a>
      </Link>

      <Link href="/category">
        <a>
          <span
            className={
              (winReady && window?.location?.pathname.includes("view")) ||
              headUrl === "category" ||
              headUrl === "oneday" ||
              headUrl === "month"
                ? "on"
                : "off"
            }
          >
            카테고리
          </span>
        </a>
      </Link>
      <Link href="/vodmain">
        <a>
          <span className={headUrl === "vodmain" ? "on" : "off"}>VOD</span>
        </a>
      </Link>
      <Link href="/notice">
        <a>
          <span className={headUrl === "notice" ? "on" : "off"}>뉴스</span>
        </a>
      </Link>
      <Link href="/mypage">
        <a>
          <span className={headUrl === "mypage" ? "on" : "off"}>마이</span>
        </a>
      </Link>
    </MobileMenu>
  );
}

export default MobMenu;
