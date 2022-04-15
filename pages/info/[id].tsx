// @ts-nocheck
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { BoxofficeSeo } from "@components/elements/CommonSeo";
import Layout from "@components/layouts";
import dayjs from "dayjs";
import {
  InfoContWrap,
  SummaryInfo,
  DetailInfo,
  BlogInfo
} from "@components/pageComp/info/styles";

function Index() {
  const router = useRouter();
  const { id, title } = router.query;

  const { isLoading, data } = useQuery(["info", "detail", id], async () => {
    const getData = await axios.get(`/api/info/${id}?title=${title}`);
    return getData;
  });

  const item: any = data?.data[0]?.elements[0]?.elements[0];

  return (
    <Layout>
      <BoxofficeSeo />
      {isLoading ? (
        <InfoContWrap></InfoContWrap>
      ) : (
        <InfoContWrap>
          {item && (
            <>
              <SummaryInfo>
                <div className="thumb">
                  <img src={item.elements[11]?.elements[0]?.text} alt="" />
                </div>
                <div className="area_info">
                  <div className="wrap_tit">
                    <h2 className="tit">
                      {item.elements[1]?.elements[0]?.text}
                    </h2>
                    <dl>
                      <dt>기간</dt>
                      <dd>
                        {item.elements[2]?.elements[0]?.text} ~{" "}
                        {item.elements[3]?.elements[0]?.text}
                      </dd>
                    </dl>
                  </div>
                  <dl>
                    <dt>장소</dt>
                    <dd>{item.elements[4]?.elements[0]?.text}</dd>
                  </dl>
                  {item.elements[6]?.elements && (
                    <dl>
                      <dt>출연진</dt>
                      <dd>{item.elements[6]?.elements[0]?.text}</dd>
                    </dl>
                  )}
                  {item.elements[7]?.elements && (
                    <dl>
                      <dt>공연시간</dt>
                      <dd>{item.elements[7]?.elements[0]?.text}</dd>
                    </dl>
                  )}
                  <dl>
                    <dt>관람연령</dt>
                    <dd>{item.elements[8]?.elements[0]?.text}</dd>
                  </dl>
                  {item.elements[9]?.elements && (
                    <dl>
                      <dt>제작사</dt>
                      <dd>{item.elements[9]?.elements[0]?.text}</dd>
                    </dl>
                  )}
                  <dl>
                    <dt>가격</dt>
                    <dd>
                      {item?.elements[10]["elements"] !== undefined &&
                        item?.elements[10]?.elements[0]?.text}
                    </dd>
                  </dl>
                </div>
              </SummaryInfo>
              <DetailInfo>
                <div className="timeWrap">
                  {item.elements.length >= 19 && item.elements[18].elements && (
                    <>
                      <h2>공연시간정보</h2>
                      <div className="time">
                        {item.elements[18].elements[0].text}
                      </div>
                    </>
                  )}

                  <div>
                    {item.elements[16].elements &&
                      item.elements[16].elements[0].elements && (
                        <img
                          src={item.elements[16].elements[0].elements[0].text}
                          alt=""
                        />
                      )}
                  </div>
                </div>
              </DetailInfo>
            </>
          )}
          <BlogInfo>
            <h2>Naver Blog Find</h2>
            <ul>
              {data?.data[1].items.map((el, i) => (
                <li key={i}>
                  <a href={el.link} target="_blank" rel="noreferrer">
                    <h3 className="title">
                      {el.title.replaceAll(
                        /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                        ""
                      )}
                    </h3>
                    <div className="blogInfoBox">
                      <span className="bloggername">😎 {el.bloggername}</span>
                      <span className="postdate">
                        📅 {dayjs(el.postdate).format("YYYY.MM.DD")}
                      </span>
                    </div>
                    <div className="description">
                      {el.description.replace(
                        /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                        ""
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </BlogInfo>
        </InfoContWrap>
      )}
    </Layout>
  );
}

export default Index;
