import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import RegisterForm from "@components/pageComp/register/styles";
import { ErrorTxt } from "pages/admin/product/styles";
import "react-toastify/dist/ReactToastify.css";
import { FindIdPwdWrap } from "./styles";

interface IResetPwd {
  email: string;
  code: string;
  newPassword: string;
}

export default function FindPassword() {
  const router = useRouter();

  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: "",
      code: "",
      newPassword: ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: IResetPwd) => {
    const { email, code, newPassword } = data;

    try {
      setLoading(true);
      if (!success) {
        const { data } = await axios.post("/api/user/findaccount", { email });
        setSuccess(true);
        toast("이메일로 전송된 비밀코드를 확인해주세요.");
        setLoading(false);
      } else {
        const { data } = await axios.patch("/api/user/findaccount", {
          email,
          code,
          newPassword
        });
        setLoading(false);
        resetField("email");
        resetField("code");
        resetField("newPassword");
        alert("이제 새 비밀번호로 로그인할 수 있습니다!");
      }
    } catch (err: any) {
      setLoading(false);
      alert(err.response.data);
    }
  };

  return (
    <FindIdPwdWrap>
      <RegisterForm>
        <div className="login_form">
          <h2>비밀번호 찾기</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {success && (
              <>
                <label>
                  <div className="tit">Code</div>

                  <div>
                    <input
                      type="text"
                      placeholder="Enter secret code"
                      autoComplete="off"
                      {...register("code", {
                        required: true
                      })}
                    />
                  </div>
                </label>
                {errors.code && errors.code.type === "required" && (
                  <ErrorTxt>CODE를 입력해주세요.</ErrorTxt>
                )}
                <label>
                  <div className="tit">New Password</div>

                  <div>
                    <input
                      type="password"
                      placeholder="New Password"
                      autoComplete="off"
                      {...register("newPassword", {
                        required: true
                      })}
                    />
                  </div>
                </label>
                {errors.newPassword &&
                  errors.newPassword.type === "required" && (
                    <ErrorTxt>새로운 비밀번호를 입력해주세요.</ErrorTxt>
                  )}
              </>
            )}
            <input
              type="submit"
              disabled={loading}
              value={success ? "확인" : `찾기`}
            />
          </form>
        </div>
      </RegisterForm>
      <ToastContainer />
    </FindIdPwdWrap>
  );
}
