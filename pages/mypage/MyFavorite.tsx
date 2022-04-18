import Link from "next/link";
import { Session } from "next-auth";
import { useFavorite, useJoin } from "@src/hooks/api/useMypage";
import Card from "@components/elements/Card";
import { MypageComponent } from "@components/pageComp/mypage/styles";
import { IProduct } from "@src/typings/db";

interface IMyMeet {
  session: Session;
  title: string;
}

function MyJoin({ session, title }: IMyMeet) {
  const { data } = useFavorite(String(session?.user.uid));
  return (
    <MypageComponent>
      <h3>
        {title} <span>({data?.length}개)</span>
      </h3>
      {data?.length === 0 ? (
        <div className="nodata">신청한 모임이 없습니다.</div>
      ) : (
        <div className="myMeet">
          {data?.map((el, i) => (
            <div key={i}>
              <Link href={`/detailview/${el?._id}`}>
                <a>
                  <Card data={el} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </MypageComponent>
  );
}

export default MyJoin;
