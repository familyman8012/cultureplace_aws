import { Session } from "next-auth";
import Layout from "@components/layouts";
import {
  DetailViewWrap,
  Content
} from "@components/pageComp/detailview/styles";
import { InfoCard } from "@components/pageComp/detailview";
import { IProduct } from "@src/typings/db";

interface IQuestionLayout {
  children: React.ReactNode;
  data: IProduct;
  _id: string;
  session: Session;
}

function QuestionLayout({ children, data, _id, session }: IQuestionLayout) {
  return (
    <Layout className="detail">
      <DetailViewWrap>
        <InfoCard
          data={data}
          _id={String(_id)}
          session={session}
          community={true}
        />
        <Content>{children}</Content>
      </DetailViewWrap>
    </Layout>
  );
}

export default QuestionLayout;
