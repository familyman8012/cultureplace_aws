import Link from "next/link";
import React from "react";
import { MobileMenu } from "./styles";

function MobMenu() {
  return (
    <MobileMenu>
      <Link href="/">
        <a>
          <span className="on">
            <img src="/images/ico_menu_home.svg" alt="홈 메뉴" /> 홈
          </span>
        </a>
      </Link>

      {/* <Link href="/oneday">
        <a>
          <span>
            <img src="/images/ico_menu_day.svg" alt="1Day 메뉴" /> 1Day
          </span>
        </a>
      </Link>
      <Link href="/month">
        <a>
          <span>
            <img src="/images/ico_menu_month.svg" alt="1Month 메뉴" /> 1Month
          </span>
        </a>
      </Link> */}
      <Link href="/category">
        <a>
          <span>
            <img src="/images/ico_menu_cat.svg" alt="카테고리 메뉴" /> 카테고리
          </span>
        </a>
      </Link>
      <Link href="/vodmain">
        <a>
          <span>
            <img src="/images/ico_menu_3.png" width="24" alt="VOD 메뉴" /> VOD
          </span>
        </a>
      </Link>
      <Link href="/notice">
        <a>
          <span>
            <img src="/images/ico_menu_4.png" width="24" alt="뉴스 메뉴" /> 뉴스
          </span>
        </a>
      </Link>
      <Link href="/mypage">
        <a>
          <span>
            <img src="/images/ico_menu_my.svg" alt="마이페이지 메뉴" /> 마이
          </span>
        </a>
      </Link>
    </MobileMenu>
  );
}

export default MobMenu;
