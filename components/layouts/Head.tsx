import { useCallback, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Header,
  LoggedIn,
  Login,
  MenuArea,
  MyPageLayer,
  SearchForm
} from "./styles";

export const CategoryLink = [
  { title: "1Day", url: "oneday" },
  { title: "1Month", url: "month" },
  { title: "미술", url: "art" },
  { title: "음악", url: "music" },
  { title: "공연", url: "theater" },
  { title: "힐링산책", url: "healing" },
  { title: "요리", url: "food" },
  { title: "사진, 영상", url: "movie" },
  { title: "패션/지식", url: "wisdom" },
  { title: "VOD", url: "vodmain" }
];

const mypageLink = [
  { title: "내모임", url: "/mypage" },
  { title: "결제사항", url: "/mypage/payment" }
];

function Head() {
  const [session] = useSession();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchKeyword, setsearchKeyword] = useState("");
  const [showBulbble, setshowBulbble] = useState(false);

  const router = useRouter();

  // 메뉴를 위해 url 가져오기
  const [headUrl, setheadUrl] = useState("");
  useEffect(() => {
    setheadUrl(
      window?.location?.pathname.substring(
        window?.location?.pathname.lastIndexOf("/") + 1
      )
    );
  }, []);

  useEffect(() => {
    setIsOpenMenu(false);
  }, [router.query]);

  const handlerSearchWrite = useCallback(e => {
    setsearchKeyword(e.target.value);
  }, []);
  const handleSearchMove = useCallback(
    e => {
      e.preventDefault();
      if (searchKeyword === "") return alert("키워드를 입력하셔야합니다.");
      router.push(`/search?keyword=${searchKeyword}`);
    },
    [router, searchKeyword]
  );

  const handleShowBubble = useCallback(() => {
    setshowBulbble(prev => !prev);
  }, []);

  const goMypage = useCallback(
    (url: string) => {
      router.push(url);
      setshowBulbble(false);
    },
    [router]
  );

  return (
    <>
      <Header>
        <div className="inner">
          <h1>
            <Link href="/">
              <a>CULTURE PLACE</a>
            </Link>
          </h1>
          <SearchForm onSubmit={handleSearchMove}>
            <span className="btn-search" onClick={handleSearchMove}></span>
            <label className="hiddenZoneV" htmlFor="search-input">
              함께 하고 싶은 제목, 팀리더를 검색해보세요.
            </label>
            <input
              type="text"
              name="keyword"
              placeholder="제목, 장소,  팀리더를 검색해보세요."
              maxLength={50}
              autoComplete="off"
              value={searchKeyword}
              onChange={e => handlerSearchWrite(e)}
            />
          </SearchForm>
          <aside>
            <ul>
              <li>
                <Link href="/live">
                  <a>라이브</a>
                </Link>
              </li>
              <li>
                <span
                  onClick={() =>
                    alert("크리에이터에 대한 다양한 지원을 준비 중에 있습니다.")
                  }
                >
                  크리에이터 지원
                </span>
              </li>
              <li className="my">
                <Link href="/mypage">
                  <a>내 모임</a>
                </Link>
              </li>
            </ul>
          </aside>
          <Login>
            {!session ? (
              <Link href="/signin">로그인</Link>
            ) : (
              <LoggedIn onClick={handleShowBubble}>
                <div className="hiddenZoneV">MY</div>
              </LoggedIn>
            )}
            {showBulbble && (
              <MyPageLayer>
                <ul>
                  {mypageLink.map((el, i) => (
                    <li onClick={() => goMypage(el.url)} key={i}>
                      {el.title}
                    </li>
                  ))}
                  <li
                    onClick={() =>
                      signOut({
                        callbackUrl: "/"
                      })
                    }
                  >
                    로그아웃
                  </li>
                </ul>
              </MyPageLayer>
            )}
          </Login>
        </div>
        <MenuArea>
          <li>
            <Link href="/oneday">
              <a className={headUrl === "oneday" ? "on" : "off"}>1Day Club</a>
            </Link>
          </li>
          <li>
            <Link href="/month">
              <a className={headUrl === "month" ? "on" : "off"}>1Month Club</a>
            </Link>
          </li>
          <li>
            <Link href="/vodmain">
              <a className={headUrl === "vodmain" ? "on" : "off"}>Vod</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/event">
              <a>이벤트</a>
            </Link>
          </li> */}

          <li>
            <Link href="/notice">
              <a className={headUrl === "notice" ? "on" : "off"}>News</a>
            </Link>
          </li>
          {CategoryLink.filter(
            el =>
              el.title !== "1Day" && el.title !== "1Month" && el.title !== "VOD"
          ).map(el => (
            <li key={el.url}>
              <Link href={`/view/${el.url}`}>
                <a className={headUrl === el.url ? "on" : "off"}>{el.title}</a>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/info">
              <a className={headUrl === "info" ? "on" : "off"}>BoxOffice</a>
            </Link>
          </li>
        </MenuArea>
      </Header>
    </>
  );
}

export default Head;
