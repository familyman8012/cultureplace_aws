import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import {
  Header,
  LoggedIn,
  Login,
  MenuArea,
  MyPageLayer,
  SearchForm
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faSortDown } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

export const CategoryLink = [
  { title: "1Day", url: "oneday" },
  { title: "1Month", url: "month" },
  { title: "미술", url: "art" },
  { title: "뮤직", url: "music" },
  { title: "공연", url: "theater" },
  { title: "힐링산책", url: "healing" },
  { title: "미식", url: "food" },
  { title: "사진, 영상", url: "movie" },
  // { title: "패션", url: "fashion" },
  { title: "페션/지식", url: "wisdom" },
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
  const { genre } = router.query;

  useEffect(() => {
    setIsOpenMenu(false);
  }, [router.query]);

  const openCategory = useCallback(() => {
    setIsOpenMenu(prev => !prev);
  }, []);

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
                <a>크리에이터 지원</a>
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
                  <li onClick={() => signOut()}>로그아웃</li>
                </ul>
              </MyPageLayer>
            )}
          </Login>
        </div>
        <MenuArea>
          <li>
            <Link href="/oneday">
              <a>1Day Club</a>
            </Link>
          </li>
          <li>
            <Link href="/month">
              <a>1Month Club</a>
            </Link>
          </li>
          <li>
            <Link href="/vodmain">
              <a>Vod</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/event">
              <a>이벤트</a>
            </Link>
          </li> */}

          <li>
            <Link href="/notice">
              <a>News</a>
            </Link>
          </li>
          {CategoryLink.filter(
            el =>
              el.title !== "1Day" && el.title !== "1Month" && el.title !== "VOD"
          ).map(el => (
            <li key={el.url}>
              <Link href={`/view/${el.url}`}>
                <a>{el.title}</a>
              </Link>
            </li>
          ))}
          {/* <li className={`categoryLink  ${isOpenMenu ? "on" : ""}`}>
            <button className="depth1" onClick={openCategory}>
              <span>전체 카테고리</span>
              <FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon>
            </button>
            <ul className="categoryMenu">
              {CategoryLink.map((el, i) => (
                <li key={i}>
                  <Link href={`/view/${el.url}`}>
                    <a>{el.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li> */}
          <li>
            <Link href="/info">
              <a>BoxOffice</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/notice">
              <a>NTF 전시 &amp; 판매</a>
            </Link>
          </li> */}

          {/* <li>
            <Link href="/notice">
              <a>블로그</a>
            </Link>
          </li>
          <li>
            <Link href="/notice">
              <a>인스타</a>
            </Link>
          </li>
          <li>
            <Link href="/notice">
              <a>유튜브</a>
            </Link>
          </li> */}
        </MenuArea>
      </Header>
    </>
  );
}

export default Head;
