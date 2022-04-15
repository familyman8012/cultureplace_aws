import { useMemo } from "react";
import { IProduct } from "@src/typings/db";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import FavoriteButton from "../FavoriteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { CardWrap } from "./styles";

dayjs.locale("ko");
interface ICard {
  type?: string;
  data: IProduct;
  querykey?: string;
}

function Card({ type = "basic", data, querykey = "", ...rest }: ICard) {
  const firstMeetDay = dayjs(data.firstmeet);
  const startTime = useMemo(
    () => firstMeetDay.format(`MM/DD(${firstMeetDay.format("ddd")}) HH:mm`),
    [firstMeetDay]
  );
  const endTime = useMemo(
    () => dayjs(data.firstmeet).add(3, "hour").format("HH:mm"),
    [data.firstmeet]
  );

  const {
    title,
    imgurl,
    desc,
    todo,
    people,
    location,
    favoriteduser,
    price,
    saleprice
  } = data;

  // 정가
  const priceNumber = useMemo(
    () => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    [price]
  );

  // 할인가
  const salePriceNumber = useMemo(
    () => saleprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    [saleprice]
  );

  // 할부
  const highPrice = useMemo(
    () => (saleprice / 5).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    [saleprice]
  );

  // 할인율
  const salePercent = useMemo(
    () => Math.floor((price / saleprice) * 10),
    [price, saleprice]
  );

  return (
    <CardWrap type={type} {...rest}>
      <div className="imgbox">
        <FavoriteButton data={data} querykey={querykey} />
        <img src={imgurl} alt="모임사진" />
      </div>
      <dl className="txtbox">
        {type === "basic" && <dt className="people">{people}</dt>}
        <dd className="title">{title}</dd>
        {type === "basic" && (
          <>
            <dd className="favoriteNumber">
              <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              {favoriteduser.length}
            </dd>
            <dd className="wrap_price">
              {saleprice !== 0 && (
                <span className="saleper">{salePercent}%</span>
              )}
              <div className="priceNum">
                {saleprice !== 0 ? (
                  price > 10 ? (
                    <>
                      <span className="price">월 {highPrice}원</span>{" "}
                      <span className="period">(5개월)</span>
                    </>
                  ) : (
                    <span className="price">{salePriceNumber}원</span>
                  )
                ) : (
                  <span className="price">{priceNumber}원</span>
                )}
              </div>
            </dd>
          </>
        )}

        {type === "event" && <dd className="people">{people}</dd>}
        <dd className="meetinfobox">
          <span className="location">{location} </span>
          <span className="firstmeet">
            | 모임일 {startTime} ~ {endTime}
          </span>
        </dd>
      </dl>
    </CardWrap>
  );
}

export default Card;
