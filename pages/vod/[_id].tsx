import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import LectureRoom from "@components/pageComp/vod/LectureRoom";

function Vod() {
  const router = useRouter();
  const { _id } = router.query;
  const [session] = useSession();

  return (
    <>
      {_id && session?.user.uid && (
        <LectureRoom _id={String(_id)} sessionId={session?.user.uid} />
      )}
    </>
  );
}

export default Vod;
