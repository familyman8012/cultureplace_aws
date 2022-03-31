import { OneDaySeo } from "@components/elements/CommonSeo";
import InfinityCards from "@components/modules/InfinityCards";

function Oneday() {
  return (
    <>
      <OneDaySeo />
      <InfinityCards querykey={"oneday"} />
    </>
  );
}

export default Oneday;
