import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@components/layouts";
import { css } from "@emotion/react";
import { IProduct } from "@src/typings/db";
import WrapPayment from "./styles";

interface IPaymentInfo {
  data: IProduct;
  session: Session;
  setcompleteData: Dispatch<SetStateAction<any>>;
  setpayComplete: Dispatch<SetStateAction<boolean>>;
}

function PaymentInfo({
  data,
  session,
  setcompleteData,
  setpayComplete
}: IPaymentInfo) {
  const router = useRouter();

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

  const payOption = {
    price: data?.saleprice ? data?.saleprice : data?.price,
    name: data?.title,
    pg: "inicis",
    username: session?.user.name,
    email: session?.user.email,
    phone: paymentInfo.phone,
    userid: session?.user.uid
  };

  const { price, name, pg, username, email, userid } = payOption;

  const productid = data._id;

  function onClickRequest() {
    if (paymentInfo.phone === "" || paymentInfo.phone === undefined) {
      alert("구매자 전화번호를 입력하셔야합니다.");
      return;
    }
    if (!paymentInfo.agree) {
      alert("구매조건 확인 및 결제진행에 동의를 해주셔야 결제가 진행됩니다.");
      return;
    }
    window.BootPay.request({
      //실제 복사하여 사용시에는 모든 주석을 지운 후 사용하세요
      price, //실제 결제되는 가격
      application_id: "60d743385b29480021dc503c",
      name, //결제창에서 보여질 이름
      pg,
      method: "card", //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
      payment_name: "카드결제",
      show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
      user_info: {
        username,
        email,
        phone: paymentInfo.phone
      },
      order_id: Date.now(), //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
      params: {
        callback1: "payment1",
        callback2: "payment2",
        customvar1234: "payment3"
      }
    })
      .error(function (data: string) {
        //결제 진행시 에러가 발생하면 수행됩니다.
        console.log(data);
      })
      .cancel(function (data: string) {
        //결제가 취소되면 수행됩니다.
        console.log(data);
      })
      .ready(function (data: string) {
        // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
        console.log(data);
      })
      .confirm(function (data: { receipt_id: string; status_en: string }) {
        //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
        //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.

        var t = {
          price: payOption.price,
          receipt_id: data.receipt_id,
          status_en: data.status_en
        };

        axios.post("/api/pay/payverify", t).then(response => {
          if (response.data.status_en === "complete") {
            const variables = {
              data: response.data,
              userid
            };
            setcompleteData(variables);
            setpayComplete(true);
            axios.post("/api/payment", variables);
            window.BootPay.transactionConfirm(data);
            axios.put("/api/payment", {
              _id: productid,
              userid: session.user.uid
            });
          } else {
            window.BootPay.removePaymentWindow();
          }
        });
      })
      .close(function (data: string) {
        // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
        console.log(data);
      })
      .done(function (doneData: string) {
        //결제가 정상적으로 완료되면 수행됩니다
        //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
        console.log("결제가 정상적으로 완료되었습니다.");
      });
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
                id="agree"
              />
              <label htmlFor="agree">구매조건 확인 및 결제진행에 동의</label>
            </div>
            <div className="btn_pay" onClick={onClickRequest}>
              결제하기
            </div>
          </div>
        </div>
      </WrapPayment>
    </Layout>
  );
}

export default PaymentInfo;
