import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import axios from "axios";
import { usePayment } from "@src/hooks/api/usePayments";
import Layout from "@components/layouts";
import { MypageWrap, WrapPayedInfo } from "@components/pageComp/mypage/styles";
import { MypageSeo } from "@components/elements/CommonSeo";
import dayjs from "dayjs";

function Index() {
  const [session] = useSession();
  const router = useRouter();

  const { status, data, error } = usePayment(session?.user.uid);

  const withdrawal = () => {
    axios
      .delete(`/api/user/user?_id=${session?.user.uid}`)
      .then(function (resp) {
        signOut({
          callbackUrl: "/"
        });
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
                    orderId,
                    approvedAt,
                    orderName,
                    totalAmount,
                    card,
                    method
                  } = el.data;
                  return (
                    <div className="item" key={`payinfo${i}`}>
                      <div className="top">
                        <span className="txt_number">ORDER ID :{orderId}</span>
                        <span className="txt_pay_date">
                          주문일자{" "}
                          {dayjs(approvedAt).format("YYYY.MM.DD / HH : MM")}
                        </span>
                      </div>
                      <div className="box_payment_info">
                        <dl className="box box_counselling">
                          <dt>결제한 상담</dt>
                          <dd className="txt">{orderName}</dd>
                          <dd className="price">{totalAmount}원</dd>
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
                            {method === "card" ? card.company : method}
                          </dd>
                          <dd className="tel">({card.number})</dd>
                        </dl>
                        <div className="box_btns">
                          <a
                            href={card.receiptUrl}
                            className="button cursor"
                            target="_blank"
                            rel="noopner noreferrer"
                          >
                            영수증
                          </a>

                          <span
                            className="button cursor"
                            // @ts-ignore
                            onClick={() => ChannelIO("show")}
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
