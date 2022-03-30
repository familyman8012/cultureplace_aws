import { CardWrap } from "./styles";
import { IProduct } from "@src/typings/db";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import Skeleton from "../Skeleton";

dayjs.locale("ko");
interface ICard {
  type?: string;
  querykey?: string;
}

function Card({ type = "basic", ...rest }: ICard) {
  return (
    <CardWrap type={type} {...rest}>
      <div className="imgbox">
        <Skeleton width={"100%"} height={"27rem"} />
      </div>
      <dl className="txtbox">
        {type === "basic" && (
          <dt className="people">
            <Skeleton width={"24.45rem"} height={"1.8rem"} rounded />
          </dt>
        )}
        <dd className="title">
          <Skeleton width={"24.45rem"} height={"4rem"} rounded />
        </dd>
        {type === "basic" && (
          <>
            <dd className="favoriteNumber">
              <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              <Skeleton width={"1rem"} height={"1.6rem"} rounded />
            </dd>
            <dd className="wrap_price">
              <Skeleton width={"5.4rem"} height={"1.9rem"} rounded />
            </dd>
          </>
        )}

        {type === "event" && (
          <dd className="people">
            <Skeleton width={"24.45rem"} height={"1.8rem"} rounded />
          </dd>
        )}
        <dd className="meetinfobox">
          <Skeleton width={"24.45rem"} height={"1.65rem"} rounded />
        </dd>
      </dl>
    </CardWrap>
  );
}

export default Card;
