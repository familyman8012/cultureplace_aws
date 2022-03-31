import { signOut, useSession } from "next-auth/client";
import Layout from "@components/layouts";
import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePayment } from "@src/hooks/api/usePayments";
import axios from "axios";
import { MypageWrap, WrapPayedInfo } from "@components/pageComp/mypage/styles";
import { MypageSeo } from "@components/elements/CommonSeo";

function Index() {
  const [session] = useSession();
  const router = useRouter();

  const { status, data, error } = usePayment(session?.user.uid);

  console.log(session?.user.uid, data);

  const withdrawal = () => {
    axios
      .delete(`/api/user/user?_id=${session?.user.uid}`)
      .then(function (resp) {
        console.log("resp resp resp113213", resp);

        signOut();
      });

    router.push("/");
  };
  return (
    <Layout>
      <MypageSeo />
      <MypageWrap>
        <div className="wrap_menu">
          <div className="profile">
            <div className="userName">{session?.user.name}</div>
            <div className="email">{session?.user.email}</div>
          </div>
          <ul>
            <li>
              <Link href="/mypage">내정보</Link>
            </li>
            <li>
              <strong>주문내역</strong>
            </li>
            <li className="withdrawal cursor" onClick={() => withdrawal()}>
              탈퇴
            </li>
          </ul>
        </div>
        <div className="wrap_cont">
          <WrapPayedInfo>
            {session && data?.length !== 0 ? (
              <div className="payed_list">
                {data?.map((el, i) => {
                  const {
                    order_id,
                    purchased_at,
                    item_name,
                    price,
                    payment_data,
                    method,
                    receipt_url
                  } = el.data;
                  return (
                    <div className="item" key={`payinfo${i}`}>
                      <div className="top">
                        <span className="txt_number">{order_id}</span>
                        <span className="txt_pay_date">
                          주문일자 {purchased_at}
                        </span>
                      </div>
                      <div className="box_payment_info">
                        <dl className="box box_counselling">
                          <dt>결제한 상담</dt>
                          <dd className="txt">{item_name}</dd>
                          <dd className="price">{price}원</dd>
                        </dl>
                        <dl className="box box_user">
                          <dt>주문자정보</dt>
                          <dd className="name">{session.user.name}</dd>
                          <dd className="tel">{session.user.phone}</dd>
                          <dd className="email">{session.user.email}</dd>
                        </dl>
                        <dl className="box box_payment_method">
                          <dt>결제정보</dt>
                          <dd className="name">
                            {method === "card"
                              ? payment_data.card_name
                              : method}
                          </dd>
                          <dd className="tel">({payment_data.card_no})</dd>
                        </dl>
                        <div className="box_btns">
                          <a
                            href={receipt_url}
                            className="button cursor"
                            target="_blank"
                            rel="noopner noreferrer"
                          >
                            영수증
                          </a>
                          <span
                            className="button cursor"
                            // onClick={() => ChannelIO("show")}
                          >
                            취소요청
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="payed_list no">구매내역이 없습니다.</div>
            )}
          </WrapPayedInfo>
        </div>
      </MypageWrap>
    </Layout>
  );
}

export default Index;
