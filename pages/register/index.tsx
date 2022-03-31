import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { getProviders } from "next-auth/client";
import SocialLogin from "../../components/modules/SocialLogin";
import { ISignIn } from "../signin";
import Layout from "../../components/layouts";
import RegisterForm from "../../components/pageComp/register/styles";
import { GetServerSideProps } from "next";
import { IUser } from "@src/typings/db";
import { ErrorTxt } from "pages/admin/product/styles";
import { RegisterSeo } from "@components/elements/CommonSeo";

export default function Register({ providers, csrfToken }: ISignIn) {
  const {
    query: { callbackUrl }
  } = useRouter();

  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm(); // useForm({ mode: "onChange" });
  // console.log(watch("email"));

  const userpwdConfirm = watch("userpwd");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IUser) => {
    setLoading(true);
    const { email, name, userpwd, phone, agegroup, gender } = data;

    axios
      .post("/api/user/user", {
        email,
        name,
        userpwd,
        phone,
        agegroup,
        gender
      })
      .then(function (resp) {
        console.log("response.data", "adsadssadfs", resp.data, resp);
      })
      .catch(e => {
        if (axios.isAxiosError(e)) {
          console.log({
            e,
            type: "axios-error"
          });
          alert(e?.response?.data);
        } else {
          console.log({
            e,
            type: "stock-error"
          });
        }
      });

    setLoading(false);
  };

  return (
    <Layout>
      <RegisterSeo />
      <RegisterForm>
        <div className="login_form">
          <h2>회원가입</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <div className="tit">Name</div>

              <div>
                <input
                  type="text"
                  placeholder="홍길동"
                  autoComplete="off"
                  {...register("name", {
                    required: true,
                    pattern: /^[가-힣]{2,7}$/
                  })}
                />
              </div>
            </label>
            {errors.name && errors.name.type === "required" && (
              <ErrorTxt>이름을 입력해주세요.</ErrorTxt>
            )}
            {errors.name && errors.name.type === "pattern" && (
              <ErrorTxt>
                이름 형식에 맞지 않습니다. 한글로 올바르게 이름을 입력해주세요.
              </ErrorTxt>
            )}
            <label>
              <div className="tit">Email</div>
              <div>
                <input
                  type="email"
                  placeholder="example@example.com"
                  autoComplete="off"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                  })}
                />
              </div>
            </label>
            {errors.email && <ErrorTxt>이메일을 입력해주세요.</ErrorTxt>}
            <label>
              <div className="tit">AGE GROUP</div>
              <div>
                <select id="agegroup" {...register("agegroup")}>
                  <option value="20대">20대</option>
                  <option value="30대">30대</option>
                  <option value="40대">40대</option>
                  <option value="50대이상">50대이상</option>
                </select>
              </div>
            </label>
            <label>
              <div className="tit">GENDER</div>
              <div className="box_radio">
                <input
                  {...register("gender")}
                  type="radio"
                  value="남성"
                  id="male"
                  defaultChecked={true}
                />
                남성
                <input
                  {...register("gender")}
                  type="radio"
                  value="여성"
                  id="female"
                />
                여성
              </div>
            </label>
            <label>
              <div className="tit">Phone</div>
              <div>
                <input
                  type="number"
                  placeholder="01012345678"
                  autoComplete="off"
                  {...register("phone", {
                    required: true,
                    pattern: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g
                  })}
                />
              </div>
            </label>
            {errors.phone && errors.phone.type === "required" && (
              <ErrorTxt>연락처를 정확하게 입력해주세요.</ErrorTxt>
            )}
            {errors.phone && errors.phone.type === "pattern" && (
              <ErrorTxt>연락처를 정확하게 입력해주세요.</ErrorTxt>
            )}
            <label>
              <div className="tit">assword</div>
              <div>
                <input
                  type="password"
                  defaultValue=""
                  autoComplete="off"
                  placeholder="영문 소문자 / 숫자 / 특수기호 중 2가지 이상 조합 8~16자"
                  {...register("userpwd", {
                    required: true,
                    minLength: 8,
                    maxLength: 16,
                    pattern:
                      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/
                  })}
                />
              </div>
            </label>
            {errors.userpwd && errors.userpwd.type === "required" && (
              <ErrorTxt>비밀번호를 입력해주세요.</ErrorTxt>
            )}
            {errors.userpwd && errors.userpwd.type === "pattern" && (
              <ErrorTxt>
                영문 소문자 / 숫자 / 특수기호 중 2가지 이상 조합 8~16자
              </ErrorTxt>
            )}
            <label>
              <div className="tit">Password Confirm</div>
              <div>
                <input
                  type="password"
                  autoComplete="off"
                  placeholder="비밀번호 확인을 위해 입력해주세요."
                  {...register("userpwd_confirm", {
                    required: true
                    // validate: value => value === userpwdConfirm
                  })}
                />
              </div>
            </label>
            {errors.userpwd_confirm &&
              errors.userpwd_confirm.type === "required" && (
                <ErrorTxt>비밀번 확인을 위해 입력하셔야합니다.</ErrorTxt>
              )}
            {errors.userpwd_confirm &&
              errors.userpwd_confirm.type === "validate" && (
                <ErrorTxt>비밀번호를 확인해주세요.</ErrorTxt>
              )}
            <input type="submit" disabled={loading} value="동의하고 회원가입" />
          </form>
          <div className="txt_read_yakawn">
            <Link href="/yakwan/policy">
              <a>이용약관</a>
            </Link>
            ,{" "}
            <Link href="/yakwan/privacy">
              <a>개인정보 수집 및 이용</a>
            </Link>
            , 내용을 확인하였고 동의합니다.
          </div>
          <SocialLogin providers={providers} csrfToken={csrfToken} />
        </div>
      </RegisterForm>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const providers = await getProviders();

  return {
    props: { providers }
  };
};
