import { useRouter } from "next/router";
import Button from "@components/elements/Button";
import { moreBtn } from "./styles";

function Index() {
  const router = useRouter();
  return (
    <Button
      color="brand"
      size="m"
      outline
      css={moreBtn}
      onClick={() => router.push("/oneday")}
    >
      1Day 클럽 모두 보러가기
    </Button>
  );
}

export default Index;
