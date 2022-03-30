import Link from "next/link";
import { WrapLayout } from "./styles";

type Props = {
  children: React.ReactNode;
  genre?: string;
};

const AdminMenu = [
  { menuName: "상품등록", url: "/creator" },
  { menuName: "공지사항", url: "/admin/notice" },
  { menuName: "메인비쥬얼", url: "/admin/mainvis" }
];

function Adminlayout({ children, genre }: Props) {
  return (
    <WrapLayout>
      <div className="left">
        <ul>
          {genre === "creator"
            ? AdminMenu.slice(0, 1).map(el => (
                <li key={el.menuName}>
                  <Link href={el.url}>
                    <a>{el.menuName}</a>
                  </Link>
                </li>
              ))
            : AdminMenu.slice(1, 2).map(el => (
                <li key={el.menuName}>
                  <Link href={el.url}>
                    <a>{el.menuName}</a>
                  </Link>
                </li>
              ))}
          {genre !== "creator" && (
            <li>
              <a
                href="https://admin.bootpay.co.kr/receipt"
                target="_blank"
                rel="noreferrer"
              >
                부트페이관리자
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="content">{children}</div>
    </WrapLayout>
  );
}

export default Adminlayout;
