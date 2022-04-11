import { loadTossPayments } from "@tosspayments/sdk";

function Tosspay() {
  const clientKey = "test_ck_5GePWvyJnrKODy7KB17rgLzN97Eo";
  // async/await을 사용하는 경우
  async function main() {
    const tossPayments = await loadTossPayments(clientKey);

    const _id = "123";
    tossPayments.requestPayment("카드", {
      // 결제 수단 파라미터
      // 결제 정보 파라미터
      amount: 1000,
      orderId: Math.random().toString(36).substring(2, 12),
      orderName: "토스 티셔츠 외 2건",
      customerName: "박토스",
      successUrl: `http://localhost:3000/tosspay/success?productid=${_id}`,
      failUrl: "http://localhost:3000/tosspay/fail"
    });
  }

  return (
    <div>
      tosspay <button onClick={main}>결제</button>
    </div>
  );
}

export default Tosspay;
