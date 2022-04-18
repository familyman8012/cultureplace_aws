import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const DayCal = (diffDay: Date) => {
  const date1 = dayjs(diffDay);
  const date2 = dayjs();
  let minute = date2.diff(date1, "minute");
  let hours = date2.diff(date1, "hours");
  let day = date2.diff(date1, "day");
  let month = date2.diff(date1, "month");

  if (60 > minute && minute >= 1) {
    return `${minute}분 전`;
  }
  if (24 > hours && hours >= 1) {
    return `${hours}시간 전`;
  }
  if (30 > day && day >= 1) {
    return `${day}일 전`;
  }
  if (12 > month && month >= 1) {
    return `${month}달 전`;
  }
  if (month >= 12) {
    return `${dayjs(diffDay).format(`YYYY.MM.DD`)}`;
  }
};

export function Errorhandler(status: string) {
  const router = useRouter();

  useEffect(() => {
    if (status !== "error") return;
    toast.error("올바른 경로로 접속해주세요", {
      position: "top-right",
      autoClose: 2000
    });
    const ErroHandlerTime = setTimeout(() => router.back(), 2000);
    router.back();
    return () => clearTimeout(ErroHandlerTime);
  }, [router, status]);
}

export function isEmptyObj(obj: object) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}
