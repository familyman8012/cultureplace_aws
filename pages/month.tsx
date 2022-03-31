import { MonthSeo } from "@components/elements/CommonSeo";
import InfinityCards from "@components/modules/InfinityCards";

function Month() {
  return (
    <>
      <MonthSeo />
      <InfinityCards querykey={"month"} type="other" />
    </>
  );
}

export default Month;
