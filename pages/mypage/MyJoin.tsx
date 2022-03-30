import Card from "@components/elements/Card";
import Link from "next/link";
import { MypageComponent } from "@components/pageComp/mypage/styles";
import { IProduct, IUser } from "@src/typings/db";
import { Session } from "next-auth";

interface IMyMeet {
  session: Session;
  title: string;
  data: IProduct[];
}

function MyJoin({ session, title, data }: IMyMeet) {
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
