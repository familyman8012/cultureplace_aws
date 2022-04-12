import { getProviders, getCsrfToken, CtxOrReq } from "next-auth/client";
import SocialLogin from "../components/modules/SocialLogin";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  BtnLogin,
  InfoRegArea,
  LoginWrapper
} from "@components/pageComp/signin/style";
import { SignInSeo } from "@components/elements/CommonSeo";
import MobMenu from "@components/layouts/MobMenu";

export interface ISignIn {
  providers: object;
  csrfToken: string;
}

export default function SignIn({ providers, csrfToken }: ISignIn) {
  const router = useRouter();
  const { error } = router?.query;

  if (typeof window !== "undefined" && error === "CredentialsSignin") {
    alert("아이디와 비밀번호를 확인해주세요.");
  }
  return (
    <>
      <SignInSeo />
      <LoginWrapper>
        <div className="login_area">
          <div className="login_form">
            <h1>CULTURE PLACE</h1>
            <h2>로그인</h2>
            <div>
              <SocialLogin providers={providers} csrfToken={csrfToken} />
              <form method="post" action="/api/auth/callback/credentials">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <label>
                  <div className="tit">이메일</div>
                  <div>
                    <input
                      name="email"
                      type="text"
                      placeholder="example@example.com"
                    />
                  </div>
                </label>
                <label>
                  <div className="tit">비밀번호</div>
                  <div>
                    <input
                      name="userpwd"
                      type="password"
                      placeholder="********"
                    />
                  </div>
                </label>
                <InfoRegArea>
                  <Link href="/findaccount">
                    <a className="info forget_pwd">ID, 비밀번호 찾기</a>
                  </Link>
                  <span className="info reg">
                    <Link href="/register">회원가입</Link>
                  </span>
                </InfoRegArea>
                <BtnLogin type="submit">로그인</BtnLogin>
                <div className="txt_read_yakawn">
                  <Link href="/yakwan/privacy">
                    <a>이용약관</a>
                  </Link>
                  ,{" "}
                  <Link href="/yakwan/policy">
                    <a>개인정보 수집 및 이용</a>
                  </Link>
                  , 내용을 확인하였고 동의합니다.
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="login_mv"></div>
      </LoginWrapper>
      <MobMenu />
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: CtxOrReq | undefined) {
  const providers = await getProviders();
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      providers
    }
  };
}
