import { useCallback } from "react";
import { IProduct } from "@src/typings/db";
import dayjs from "dayjs";
import { CardBadgewWrapper } from "./style";

interface ICardBadge {
  el: IProduct;
}
function CardBadge({ el }: ICardBadge) {
  const startDayCal = useCallback((val: Date) => {
    return dayjs(val).diff(dayjs(), "d");
  }, []);

  return (
    <CardBadgewWrapper>
      <div
        className={`card-badge  ${el.saleprice !== 0 ? "sale" : ""} ${
          el.location === "온라인" ? "online" : ``
        } 
    ${
      startDayCal(el.firstmeet) > 0 && startDayCal(el.firstmeet) <= 3
        ? "startday"
        : ``
    }  `}
      >
        <div className="card-badge__tail"></div>
        <div className="title"></div>
        {el.saleprice !== 0 && (
          <div className="card-badge__subtitle">
            {" "}
            ~{Math.floor((el.price / el.saleprice) * 10)}%
          </div>
        )}
      </div>
    </CardBadgewWrapper>
  );
}

export default CardBadge;
