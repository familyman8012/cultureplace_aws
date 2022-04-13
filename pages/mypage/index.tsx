import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/client";
import MyJoin from "./MyJoin";
import Layout from "@components/layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { MypageWrap } from "@components/pageComp/mypage/styles";
import { useFavorite, useJoin } from "@src/hooks/api/useMypage";
import { MypageSeo } from "@components/elements/CommonSeo";

function Index() {
  const [session] = useSession();
  const router = useRouter();
  const { data: joinData } = useJoin(String(session?.user.uid));
  const { data: favoriteData } = useFavorite(String(session?.user.uid));

  // useEffect(() => {
  //   !session && router.push("/signin");
  // }, [router, session]);

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <Layout>
      <MypageSeo />
      {session ? (
        <MypageWrap>
          <div className="wrap_menu">
            <div className="profile">
              <div className="userName">{session?.user.name}</div>
              <div className="email">{session?.user.email}</div>
            </div>
            <h2>내 정보</h2>
            <ul>
              <li>
                <Link href="/mypage/payment">주문내역</Link>
              </li>
            </ul>
          </div>

          <div className="wrap_cont">
            {joinData && (
              <div className="myjoin">
                <MyJoin
                  session={session}
                  title={"신청한 클래스"}
                  data={joinData}
                />
              </div>
            )}
            {favoriteData && (
              <div>
                <MyJoin
                  session={session}
                  title={"찜한 클래스"}
                  data={favoriteData}
                />
              </div>
            )}
          </div>
          {550 > window.innerWidth && (
            <div className="etcMenu">
              <h2>메뉴</h2>
              <ul>
                <li>
                  <Link href="/notice">
                    컬쳐플레이스의 새로운 소식 확인하러가기
                  </Link>
                </li>
                <li>
                  <Link href="/info">
                    뮤지컬, 연극 음악 박스오피스 보러가기
                  </Link>
                </li>
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
            </div>
          )}
        </MypageWrap>
      ) : (
        <MypageWrap>
          <p className="notice_notlogin">
            로그인 하신 후 이용하실 수 있습니다.
          </p>
          {winReady && 550 > window.innerWidth && (
            <div className="etcMenu">
              <h2>메뉴</h2>
              <ul>
                <li>
                  <Link href="/notice">
                    컬쳐플레이스의 새로운 소식 확인하러가기
                  </Link>
                </li>
                <li>
                  <Link href="/info">
                    뮤지컬, 연극 음악 박스오피스 보러가기
                  </Link>
                </li>
                <li onClick={() => router.push("/signin")}>로그인</li>
              </ul>
            </div>
          )}
        </MypageWrap>
      )}
    </Layout>
  );
}

export default Index;
