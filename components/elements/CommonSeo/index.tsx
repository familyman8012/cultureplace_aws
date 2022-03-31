import { DefaultSeo, NextSeo } from "next-seo";

export function CommonSeo() {
  const CommonSeoData = {
    keywords: `원데이클래스, 월데이클래스, 온라인 클래스, 공방, 마카롱, 취미생활, 쿠킹클래스, 직장인취미, 취미, 베이킹, 문화, 미술, 뮤직, 공연, 미식, 사진, 영상, 영화, 음악, 연기, 뮤지컬, 연극, 패션, 전시, 예술NFT, 문화소식, 영화리뷰, 공연리뷰, 원데이클래스, 문화포털, 문화교육, 문화모임, 문화커뮤니티, 문화플랫폼 `,
    additionalLinkTags: [
      {
        rel: "icon",
        href: "https://www.cultureplace.co.kr/images/seo/favicon-32x32.png"
      },
      {
        rel: "apple-touch-icon",
        href: "https://www.cultureplace.co.kr/images/seo/apple-icon-76x76.png",
        sizes: "76x76"
      },
      {
        rel: "apple-touch-icon",
        href: "https://www.cultureplace.co.kr/images/seo/apple-icon-120x120.jpg",
        sizes: "120x120"
      }
    ],
    additionalMetaTags: [
      {
        name: "application-name",
        content: "문화를 즐기고 문화를 만든다. 컬쳐플레이스"
      },
      {
        name: "msapplication-tooltip",
        content: "컬쳐플레이스"
      },
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
      }
    ],

    twitter: {
      handle: "@handle",
      site: "https://www.cultureplace.co.kr",
      cardType: "summary_large_image"
    }
  };
  return <DefaultSeo {...CommonSeoData} />;
}

export function IndexSeo() {
  const indexSeoData = {
    canonical: "https://www.cultureplace.co.kr",
    title: "컬쳐플레이스 | 문화를 즐기다. 문화를 만들다. 컬쳐플레이스",
    description:
      "문화를 즐기다. 문화를 만들다. 온오프라인 문화플랫폼 - 미술, 뮤직, 공연, 연기, 미식, 사진 등 문화를 사랑하고, 문화를 만드는 것을 좋아하는 사람들을 위한 플랫폼입니다.",

    openGraph: {
      type: "website",
      title: "컬쳐플레이스 | 문화를 즐기다. 문화를 만들다. 컬쳐플레이스",
      description: `문화를 즐기다. 문화를 만들다. 온오프라인 문화플랫폼 - 미술, 뮤직, 공연, 연기, 미식, 사진 등 문화를 사랑하고, 문화를 만드는 것을 좋아하는 사람들을 위한 플랫폼입니다.`,
      url: "https://www.cultureplace.co.kr",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...indexSeoData} />;
}

export function OneDaySeo() {
  const aboutSeoData = {
    canonical: "https://www.cultureplace.co.kr/oneday",
    title:
      "문화를 즐기자 1Day Club - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
    description:
      "오늘 공연을 누구랑 같이 보러가지? 오늘 영화를 누구랑 같이 보러가지, 컬쳐플레이스에서 새로운 친구도 사귀고, 1Day 클래스에선 새로운 것을 배워봐요",

    openGraph: {
      type: "website",
      title: "문화를 즐기자, 1Day Club",
      description: `오늘 공연을 누구랑 같이 보러가지? 오늘 영화를 누구랑 같이 보러가지, 컬쳐플레이스에서 새로운 친구도 사귀고, 원데이 클래스에선 새로운 것을 배워봐요`,
      url: "https://www.cultureplace.co.kr/oneday",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...aboutSeoData} />;
}

export function MonthSeo() {
  const ReservationSeoData = {
    canonical: "https://www.cultureplace.co.kr/month",
    title: "문화를 깊이있게  - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
    description:
      "미술, 뮤직, 공연, 연기, 미식, 사진, 시나리오 등 원하는 모든 문화에 대해 제대로 배워보는 1Month CLub",
    openGraph: {
      type: "website",
      title: "문화를 제대로 배우자",
      description: `미술, 뮤직, 공연, 연기, 미식, 사진, 시나리오 등 원하는 모든 문화에 대해 제대로 배워보는 1Month CLub`,
      url: "https://www.cultureplace.co.kr/month",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...ReservationSeoData} />;
}

export function VodSeo() {
  const CounsellingSeoData = {
    canonical: "https://www.cultureplace.co.kr/vodmain",
    title:
      "언제 어디서나 만나는 VOD - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
    description:
      "다양한 문화클래스를 언제 어디서나 편리하게 VOD, 실시간 스트리밍 서비스로 즐기세요",

    openGraph: {
      type: "website",
      title:
        "언제 어디서나 만나는 VOD - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
      description: `다양한 문화클래스를 언제 어디서나 편리하게 VOD, 실시간 스트리밍 서비스로 즐기세요`,
      url: "https://www.cultureplace.co.kr/vodmain",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...CounsellingSeoData} />;
}

export function NewsSeo() {
  const NoticeSeoData = {
    canonical: "https://www.cultureplace.co.kr/notice",
    title:
      "새로운 소식과 이야기 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
    description: "공지사항, 컬쳐플레이스 가이드부터 문화리뷰까지",

    openGraph: {
      type: "website",
      title:
        "새로운 소식과 이야기 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
      description: `공지사항, 컬쳐플레이스 가이드부터 문화리뷰까지`,
      url: "https://www.cultureplace.co.kr/notice",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...NoticeSeoData} />;
}

export function RegisterSeo() {
  const RegisterSeoData = {
    canonical: "https://www.cultureplace.co.kr/register",
    title: "문화 플랫폼 컬쳐플레이스 가입 - 인생의 터닝포인트",
    description:
      "문화를 사랑하고 문화를 즐기는 당신이 행복해지는 곳. 가입을 축하드립니다.",
    openGraph: {
      type: "website",
      title: "문화 플랫폼 컬쳐플레이스 가입 - 인생의 터닝포인트",
      description: `문화를 사랑하고 문화를 즐기는 당신이 행복해지는 곳. 가입을 축하드립니다.`,
      url: "https://www.cultureplace.co.kr/register",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...RegisterSeoData} />;
}

export function SignInSeo() {
  const SignInSeoData = {
    canonical: "https://www.cultureplace.co.kr/signin",
    title: "문화 플랫폼 컬쳐플레이스 로그인",
    description:
      "문화 플랫폼 컬쳐플레이스에 오신 것을 환영합니다. 문화를 사랑하시는 분들을 위한 최선을 위한 혁신과 최상의 서비스를 제공하고 있습니다.",
    openGraph: {
      type: "website",
      title: "문화 플랫폼 컬쳐플레이스 로그인",
      description: `문화 플랫폼 컬쳐플레이스에 오신 것을 환영합니다. 문화를 사랑하시는 분들을 위한 최선을 위한 혁신과 최상의 서비스를 제공하고 있습니다.`,
      url: "https://www.cultureplace.co.kr/signin",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...SignInSeoData} />;
}

export function PaymentSeo() {
  const PaymentSeoData = {
    canonical: "https://www.cultureplace.co.kr/payment",
    title: "나를 위한 경험, 지금 시작 - 컬쳐플레이스 결제",
    description:
      "최상의 클래스를 진행하기 위해 최고의 선생님들을 모시고 있습니다. 저렴한 가격보다는 질높은 클래스를 통해 최선의 변화와 만족감을 드리겠습니다.",

    openGraph: {
      type: "website",
      title: "나를 위한 경험, 지금 시작 - 컬쳐플레이스 결제",
      description: `최상의 클래스를 진행하기 위해 최고의 선생님들을 모시고 있습니다. 저렴한 가격보다는 질높은 클래스를 통해 최선의 변화와 만족감을 드리겠습니다.`,
      url: "https://www.cultureplace.co.kr/payment",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...PaymentSeoData} />;
}

export function PaymentCompleteSeo() {
  const PaymentCompleteSeoData = {
    canonical: "https://www.cultureplace.co.kr/payment",
    title: "결제완료 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
    description:
      "컬쳐플레이스 프로그램을 선택해주셔서 감사합니다. 최상의 변화, 더 나은 서비스를 제공하기 위해 앞으로도 노력하겠습니다.",

    openGraph: {
      type: "website",
      title: "결제완료 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
      description: `문화 플랫폼 컬쳐플레이스 결제완료페이지`,
      url: "https://www.cultureplace.co.kr/payment",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...PaymentCompleteSeoData} />;
}

export function YakwanSeo() {
  const YakwanSeoData = {
    canonical: "https://www.cultureplace.co.kr/yakwan/privacy",
    title: "약관 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
    description: "문화 플랫폼 컬쳐플레이스 약관",
    openGraph: {
      type: "website",
      title: "약관 | 문화 플랫폼 컬쳐플레이스",
      description: `문화 플랫폼 컬쳐플레이스 약관`,
      url: "https://www.cultureplace.co.kr/yakwan/privacy",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...YakwanSeoData} />;
}

export function PolicySeo() {
  const PolicySeoData = {
    canonical: "https://www.cultureplace.co.kr/yakwan/policy",
    title: "개인정보처리방침 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
    description: "심리상담센터 문화 플랫폼 컬쳐플레이스",
    openGraph: {
      type: "website",
      title: "개인정보처리방침 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
      description: `문화 플랫폼 컬쳐플레이스 개인정보처리방침`,
      url: "https://www.cultureplace.co.kr/yakwan/policy",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...PolicySeoData} />;
}

export function BoxofficeSeo() {
  const YakwanSeoData = {
    canonical: "https://cultureplace.co.kr/info",
    title: "BOX OFFICE - 뮤지컬,연극,음악 예매 랭킹",
    description:
      "컬쳐플레이스 회원들을 위해 매주 집계되는 각 분야의 예매별 순위 및 상세 정보를 제공합니다.",
    openGraph: {
      type: "website",
      title: "BOX OFFICE - 뮤지컬,연극,음악 예매 랭킹",
      description: `컬쳐플레이스 회원들을 위해 매주 집계되는 각 분야의 예매별 순위 및 상세 정보를 제공합니다.`,
      url: "https://cultureplace.co.kr/info",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...YakwanSeoData} />;
}

export function MypageSeo() {
  const YakwanSeoData = {
    canonical: "https://cultureplace.co.kr/mypage",
    title: "마이페이지 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
    description: "신청한 클래스, 찜한 클래스, 주문내역에 대해 알려드립니다.",
    openGraph: {
      type: "website",
      title: "마이페이지 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.",
      description: `신청한 클래스, 찜한 클래스, 주문내역에 대해 알려드립니다.`,
      url: "https://cultureplace.co.kr/mypage",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...YakwanSeoData} />;
}

export function GenreSeo({ url, text }: { url: string; text: string }) {
  const PolicySeoData = {
    canonical: `https://www.cultureplace.co.kr/view/${url}`,
    title: `${text}을 사랑하는 사람들의 만남  - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.`,
    description: `${text} 을 즐기고, ${text} 에 대해서 배우고, ${text} 문화를 만들어 나갑니다.`,
    openGraph: {
      type: "website",
      title: `${text}을 사랑하는 사람들의 만남  - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.`,
      description: `${text} 을 즐기고, ${text} 에 대해서 배우고, ${text} 문화를 만들어 나갑니다.`,
      url: `https://www.cultureplace.co.kr/view//${url}`,
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...PolicySeoData} />;
}

export function DetailSeo({
  _id,
  imgurl,
  title
}: {
  _id: string;
  imgurl: string;
  title: string;
}) {
  const PolicySeoData = {
    canonical: `https://www.cultureplace.co.kr/view/${_id}`,
    title: `${title} - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.`,
    description: `${title} 에 대한 상세 정보입니다.`,
    openGraph: {
      type: "website",
      title: `${title}`,
      description: `${title} 에 대한 상세 정보입니다.`,
      url: `https://www.cultureplace.co.kr/view//${_id}`,
      images: [
        {
          url: `${imgurl}`,
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...PolicySeoData} />;
}

export function SearchSeo({ keyword }: { keyword: string }) {
  const PolicySeoData = {
    canonical: `https://www.cultureplace.co.kr/search?keyword=${keyword}`,
    title: `"${keyword}" 검색결과 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.`,
    description: "검색하신 결과를 알려드립니다.",
    openGraph: {
      type: "website",
      title: `"${keyword}" 검색결과 - 컬쳐플레이스 : 문화를 즐기다. 문화를 만들다.`,
      description: `검색하신 결과를 알려드립니다.`,
      url: "https://www.cultureplace.co.kr/search",
      images: [
        {
          url: "https://www.cultureplace.co.kr/images/mo_mainvis0.jpg",
          width: 1200,
          height: 630,
          alt: "컬쳐플레이스 대표이미지"
        }
      ],
      site_name: "컬쳐플레이스"
    }
  };
  return <NextSeo {...PolicySeoData} />;
}
