import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import { ISignIn } from "pages/signin";

export default function SocialLogin({ providers }: ISignIn) {
  const {
    query: { callbackUrl }
  } = useRouter();

  return (
    <>
      {Object.values(providers).map((provider, i) => {
        if (provider.name === "Custom Provider") {
          return;
        }
        const providerList = () => {
          if (provider.name === "Kakao") {
            return "카카오";
          } else if (provider.name === "Google") {
            return "구글";
          }
        };
        const providerName = providerList();
        return (
          <button
            key={i}
            className={`btn_login ${provider.name}`}
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/"
              })
            }
          >
            <span className="btn_inner">{providerName}로 1초 만에 로그인</span>
          </button>
        );
      })}
    </>
  );
}
