import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import router, { useRouter } from "next/router";
import Layout from "@components/layouts";
import RegisterForm from "@components/pageComp/register/styles";
import { IUser } from "@src/typings/db";
import { ErrorTxt } from "pages/admin/product/styles";
import { RegisterSeo } from "@components/elements/CommonSeo";
import { css } from "@emotion/react";

interface IFindId {
  email: string;
}

export default function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [findPwd, setFindPwd] = useState<{ email: string }[]>([]);
  const [noFind, setNoFind] = useState("");

  const onSubmit = async (data: IUser) => {
    setLoading(true);
    const { name, phone } = data;

    axios
      .get<IFindId[]>("/api/user/findaccount", { params: { name, phone } })
      .then(resp => {
        setFindPwd([]);
        setNoFind("");
        resp.data.length > 0
          ? setFindPwd(resp.data)
          : setNoFind("ID를 찾지 못했습니다.");
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
          <h2>아이디 찾기</h2>
          {(findPwd.length > 0 || noFind !== "") && (
            <div
              css={css`
                width: 100%;
                padding: 10px;
                border: 1px solid;
                border-top: 3px solid #6097f7;
              `}
            >
              <p>아이디 찾기가 완료되었습니다.</p>
              <div
                css={css`
                  text-align: center;
                  margin-top: 10px;
                  padding: 10px;
                  background: lightgray;
                `}
              >
                {findPwd.length > 0 ? (
                  findPwd.map((el, i) => <div key={i}>{el.email}</div>)
                ) : (
                  <div>{noFind}</div>
                )}
              </div>
              <button
                onClick={() => router.push("/signin")}
                css={css`
                  display: block;
                  border: 1px solid rgb(239, 239, 239);
                  border-radius: 3px;
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  -ms-appearance: none;
                  appearance: none;
                  font-size: 14px;
                  font-weight: normal;
                  line-height: 20px;
                  letter-spacing: -0.15px;
                  height: 48px;
                  width: 100%;
                  color: rgb(26, 26, 26);
                  box-sizing: border-box;
                  padding: 0px 16px;
                  background: #6097f7;
                  color: white;
                  font-weight: 300;
                  margin-top: 10px;
                `}
              >
                로그인 하러가기
              </button>
            </div>
          )}
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
            <input type="submit" disabled={loading} value="찾기" />
          </form>
        </div>
      </RegisterForm>
    </Layout>
  );
}
