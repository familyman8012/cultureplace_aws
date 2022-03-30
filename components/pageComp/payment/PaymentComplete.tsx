import Layout from "@components/layouts";
import { IPayment } from "@src/typings/db";
import Link from "next/link";
import WrapPayment from "./styles";

export interface IPaymentComplete {
  completeData: IPayment;
}

function PaymentComplete({ completeData }: IPaymentComplete) {
  const { item_name, order_id, payment_data, price } = completeData?.data;
  console.log("completeData completeData", completeData);
  return (
    <Layout>
      <WrapPayment type="complete">
        <div className="wrap_pay_complete">
          <div className="txt_area">
            <p>{item_name} 결제가 완료되었습니다.</p>
            <p>
              결제내역은 마이페이지에서 조회가능하며,
              <br /> 환불을 원할시에는 채널톡으로 말씀주세요.
            </p>
          </div>
          <ul>
            <li>
              <span>주문번호</span>
              <span>{order_id}</span>
            </li>
            <li>
              <span>결제정보</span>
              <span>{payment_data.card_name}</span>
              <span>{payment_data.card_no}</span>
            </li>
            <li>
              <span>결제금액</span>
              <span>{price}</span>
            </li>
          </ul>
          <div className="box_btns">
            <Link href="/">
              <a>홈으로</a>
            </Link>
            <Link href="/mypage">
              <a>마이페이지</a>
            </Link>
          </div>
        </div>
      </WrapPayment>
    </Layout>
  );
}

export default PaymentComplete;
