import { useEffect, useState } from "react";
import { IProduct } from "@src/typings/db";
import { Session } from "next-auth";
import Layout from "@components/layouts";
import { css } from "@emotion/react";
import WrapPayment from "./styles";

// tosspay
import { loadTossPayments } from "@tosspayments/sdk";
import { useRouter } from "next/router";
const clientKey = "test_ck_5GePWvyJnrKODy7KB17rgLzN97Eo";

interface IPaymentInfo {
  data: IProduct;
  session: Session;
}

function PaymentInfo({ data, session }: IPaymentInfo) {
  const router = useRouter();

  // 핸드폰, 결제동의 여부 체크
  const [paymentInfo, setPaymentInfo] = useState({
    phone: session.user.phone,
    agree: false
  });

  const chgPaymentinfo = (
    target: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentInfo(
      target === "agree"
        ? { ...paymentInfo, [target]: !paymentInfo.agree }
        : { ...paymentInfo, [target]: e.target.value }
    );
  };

  // 결제창이 떴을때는 뒤로 가기 막기
  const [payWindowLoad, setPayWindowLoad] = useState(false);
  // 결제창이 떠있을때는 뒤로가기 막고, 결제창이 없을때는 뒤로보기 클릭시 상세보기로 이동
  useEffect(() => {
    const preventGoBack = () => {
      if (payWindowLoad) {
        // change start
        history.pushState(null, "", location.href);
        // change end
        console.log("prevent go back!");
      } else {
        router.push(`/detailview/${data._id}`);
      }
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => window.removeEventListener("popstate", preventGoBack);
  }, [data._id, payWindowLoad, router]);

  // toss pay
  const tossPayOption = {
    // 결제 정보 파라미터
    amount: data?.saleprice ? data?.saleprice : data?.price,
    orderId: Math.random().toString(36).substring(2, 12),
    orderName: data?.title,
    customerName: String(session?.user?.name),
    successUrl: `http://localhost:3000/payment/success?productid=${data._id}`,
    failUrl: "http://localhost:3000/payment/fail"
  };

  // async/await을 사용하는 경우
  async function tossPayFuc() {
    setPayWindowLoad(true);
    const tossPayments = await loadTossPayments(clientKey);
    tossPayments.requestPayment("카드", tossPayOption).catch(function (error) {
      if (error.code === "USER_CANCEL") {
        // 취소 이벤트 처리
        setPayWindowLoad(false);
      }
    });
  }

  // 결제버튼 클릭시 동작
  function onClickRequest() {
    if (paymentInfo.phone === "" || paymentInfo.phone === undefined) {
      alert("구매자 전화번호를 입력하셔야합니다.");
      return;
    }
    if (!paymentInfo.agree) {
      alert("구매조건 확인 및 결제진행에 동의를 해주셔야 결제가 진행됩니다.");
      return;
    }

    tossPayFuc();
  }

  return (
    <Layout>
      <WrapPayment>
        <h2>결제</h2>
        <div className="wrap_box_area">
          <div className="info">
            <div className="box box_product">
              <h3>주문 상품 정보</h3>
              <div className="cont">
                <div className="thumb">
                  <img src={data.imgurl} alt="" />
                </div>
                <dl>
                  <dt className="tit">{data.title}</dt>
                  <dd className="price">
                    {data?.saleprice
                      ? data.saleprice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : data.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </dd>
                  <dd
                    css={css`
                      display: block;
                      color: #ddd;
                      text-decoration: line-through;
                    `}
                  >
                    {data.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
                  </dd>
                </dl>
              </div>
            </div>
            <div>
              <div className="box box_user">
                <h3>주문자 정보</h3>
                <dl>
                  <dt>{session?.user?.name}</dt>
                  <dd>
                    <input
                      type="tel"
                      className="tel"
                      name="tel"
                      value={paymentInfo.phone}
                      onChange={e => chgPaymentinfo("phone", e)}
                      placeholder="구매자 전화번호 입력"
                    />
                  </dd>
                  <dd>{session?.user.email}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="priceInfo">
            <div className="box box_price">
              <h3>최종 결제금액</h3>
              <p>
                <span className="txt">총 결제금액</span>
                <span className="price">
                  {data?.saleprice
                    ? data.saleprice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : data.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </span>
              </p>

              {data?.saleprice !== 0 && (
                <p
                  css={css`
                    display: block;
                    color: #ddd;
                    text-decoration: line-through;
                  `}
                >
                  <span className="txt">할인 전 가격</span>
                  <span className="price">
                    {data.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
                  </span>
                </p>
              )}
            </div>
            <div className="box box_agree">
              <input
                type="checkbox"
                checked={paymentInfo.agree}
                value="chkagree"
                onChange={e => chgPaymentinfo("agree", e)}
                id="payagree"
              />
              <label htmlFor="payagree">구매조건 확인 및 결제진행에 동의</label>
            </div>
            <button
              className="btn_pay"
              onClick={onClickRequest}
              disabled={payWindowLoad}
            >
              결제하기
            </button>
          </div>
        </div>
      </WrapPayment>
    </Layout>
  );
}

export default PaymentInfo;
