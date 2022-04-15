import { useState } from "react";
import Layout from "@components/layouts";
import FindId from "@components/pageComp/findaccount/FindId";
import FindPassword from "@components/pageComp/findaccount/FindPassword";
import { FindAccountWrap } from "@components/pageComp/findaccount/styles";

function Findaccount() {
  const [selFindAccount, setselFindAccount] = useState("id");
  return (
    <Layout>
      <FindAccountWrap>
        <ul className="tab">
          <li
            className={selFindAccount === "id" ? "on" : "off"}
            onClick={() => setselFindAccount("id")}
          >
            ID 찾기
          </li>
          <li
            className={selFindAccount === "pwd" ? "on" : "off"}
            onClick={() => setselFindAccount("pwd")}
          >
            Password 찾기
          </li>
        </ul>
        {selFindAccount === "id" && <FindId />}
        {selFindAccount === "pwd" && <FindPassword />}
      </FindAccountWrap>
    </Layout>
  );
}

export default Findaccount;
