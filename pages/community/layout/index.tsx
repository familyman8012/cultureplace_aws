import Layout from "@components/layouts";
import {
  DetailViewWrap,
  Content
} from "@components/pageComp/detailview/styles";
import { InfoCard } from "@components/pageComp/detailview";

function QuestionLayout({ children, data, _id, session }: any) {
  return (
    <Layout className="detail">
      <DetailViewWrap>
        <InfoCard data={data} _id={String(_id)} session={session} />
        <Content>{children}</Content>
      </DetailViewWrap>
    </Layout>
  );
}

export default QuestionLayout;
