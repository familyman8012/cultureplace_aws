import Title from "../Title";
import SectionWrap from "../SectionWrap";
import { BenefitList, BenefitTxt, BenefitWrap } from "./style";

const BenefitData = [
  {
    title: "아지트 무료대관",
    desc: "강남, 안국 등 컬쳐플레이스 아지트 공간 무료 대관 OK!"
  },
  {
    title: "이벤트",
    desc: "다양한 체험과 강연 이벤트를 멤버 할인가에 참여할 수 있습니다."
  },
  {
    title: "제휴 혜택",
    desc: "라이프스타일, 쇼핑, 교육 등 약 10여 가지의 다양한 제휴 할인 혜택이 제공됩니다."
  },
  {
    title: "다른 클럽 놀러가기",
    desc: "우리 클럽 외 다른 클럽에 놀러 갈 수 있습니다."
  }
];

function index() {
  return (
    <SectionWrap>
      <Title>컬쳐플레이스 멤버십 혜택 안내</Title>
      <BenefitTxt>
        클럽을 신청하면 컬쳐플레이스 멤버가 됩니다. 멤버십 기간 동안 혜택을 모두
        누릴 수 있습니다.
      </BenefitTxt>
      <BenefitWrap>
        {BenefitData.map((benefit, i) => (
          <BenefitList
            key={benefit.title}
            bgimg={`/images/benefit${i + 1}.webp`}
          >
            <dt>{benefit.title}</dt>
            <dd>{benefit.desc}</dd>
          </BenefitList>
        ))}
      </BenefitWrap>
    </SectionWrap>
  );
}

export default index;
