import { css } from "@emotion/react";
import Layout from "@components/layouts";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import dayjs from "dayjs";
import Link from "next/link";

import { observer } from "mobx-react";
import { infoStore } from "@src/mobx/store";

import { GetStaticProps } from "next";
import { dbConnect, Notice } from "../../pages/api";
import convert from "xml-js";
import { InfoWrap } from "@components/pageComp/info/styles";
import { BoxofficeSeo } from "@components/elements/CommonSeo";

const genre = ["뮤지컬", "연극", "음악(복합)", "음악(클래식)", "음악(국악)"];

function Index({ item }: any) {
  infoStore.item = item;

  return (
    <Layout>
      <BoxofficeSeo />
      <InfoWrap>
        <div className="box_info">
          <div className="tit-heading-wrap">
            <h3>{infoStore.showTitle}박스오피스</h3>
            <div className="submenu">
              <ul>
                {infoStore.showGenre.length === 0 && (
                  <li className="on">소개</li>
                )}
                {genre.map((el, i) => (
                  <li
                    key={i}
                    className={el === infoStore.showTitle ? "on" : ""}
                    onClick={() => infoStore.InfoData(i, el)}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="txt3">
            <span>
              · 집계기간 : 최종집계 {dayjs().format("YYYY년 MM월 DD일")}
            </span>
            <span className="infosource">
              · 집계대상 : 모든 공연 데이터 전송기관
            </span>
          </p>
          <div className="sect-movie-chart">
            <ol>
              {infoStore.showGenre.length === 0 ? (
                <li className="txt_about_boxoffice">
                  <p className="txt2">
                    컬쳐플레이스 회원들을 위해 매주 집계되는 각 분야의 예매별
                    순위 및 상세 정보를 제공합니다.
                    <br />
                    현재 뮤지컬, 연극, 음악(복합, 클래식, 국악) 정보를 제공 중
                    이며, 영화, 미술 전시회, 축제 등 더 다양한 내용이 추가될
                    예정입니다.
                  </p>
                  <p>원하는 카테고리를 선택하시면 해당 정보가 제공됩니다.</p>
                  <div className="img_about_boxoffice">
                    <img src="/images/img_boxoffice.jpg" alt="" />
                  </div>
                </li>
              ) : (
                infoStore.showGenre?.slice(0, 12).map(
                  (
                    el: {
                      elements: {
                        elements: {
                          text: React.ReactChild;
                        }[];
                      }[];
                    },
                    i: React.Key
                  ) => {
                    return (
                      <li key={i}>
                        <div className="box-image">
                          <strong className="rank">
                            No.{el.elements[6].elements[0].text}
                          </strong>
                          {/* <Link
                            href={`/info/${el.elements[9].elements[0].text}?title=${el.elements[5].elements[0].text}`}
                          >
                            <a>
                              <span className="thumb-image">
                                <Image
                                  src={`https://kopis.or.kr/${el.elements[8].elements[0].text}`}
                                  layout="fill"
                                  lazyBoundary="600px"
                                  alt="포스트"
                                />
                              </span>
                            </a>
                          </Link> */}
                        </div>

                        <div className="box-contents">
                          <Link
                            href={`/info/${el.elements[9].elements[0].text}?title=${el.elements[5].elements[0].text}`}
                          >
                            <a>
                              <strong className="title">
                                {el.elements[5].elements[0].text}
                              </strong>
                            </a>
                          </Link>
                          <span className="txt-info">
                            <strong>{el.elements[2].elements[0].text}</strong>
                          </span>
                          <span className="txt-info">
                            <strong>{el.elements[4].elements[0].text}</strong>
                          </span>
                        </div>
                      </li>
                    );
                  }
                )
              )}
            </ol>
            <div>
              <p className="txt3">
                출처: (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)
                (뮤지컬, 연극, 음악(복합, 클래식, 국악))
              </p>
              <p className="txt3">
                · 집계 데이터는 공연예술통합전산망 연계기관의 티켓판매시스템에서
                <br /> 발권된 분량을 기준으로 제공함으로 해당 공연의 전체 관객
                수와 차이가 있을 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </InfoWrap>
    </Layout>
  );
}

export default observer(Index);

export const getStaticProps: GetStaticProps = async ctx => {
  const servicekey = "0b6e49379ade4cf98c956ca55d40b5a4";
  const today = dayjs().format("YYYYMMDD");
  const info_url = (code: string) =>
    `http://kopis.or.kr/openApi/restful/boxoffice?service=${servicekey}&ststype=week&date=${today}&catecode=${code}&area=11`;

  const getInfoData = async () => {
    const axiosgetData = ["AAAB", "AAAA", "CCCA", "CCCC", "EEEA"];

    try {
      const getData = await Promise.all(
        axiosgetData.map(el => axios.get(info_url(el)))
      );
      return getData;
    } catch (e) {
      console.log(e);
    }
  };

  const result = await getInfoData().then(async getData => {
    const sendData = getData?.map(el => convert.xml2json(el.data));
    return sendData;
  });

  return {
    props: {
      item: result
    },
    revalidate: 60 * 60 * 24 * 7 //1주일 지나면 재검증
  };
};
