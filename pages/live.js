import React from "react";
import StreamChat from "../components/modules/StreamChat";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

function LiveStream() {
  const [session] = useSession();
  const router = useRouter();
  return <>{session && <StreamChat username={session.user.name} />} </>;
}

export default LiveStream;

// import { Stream } from "@cloudflare/stream-react";
// import { css } from "@emotion/react";
// import React from "react";

// function LiveStreaming() {
//   return (
//     <div
//       css={css`
//         width: 500px;
//         height: 500px;
//       `}
//     >
//       sd
//       <Stream controls src="9aa75cfe7fc6f80fb508c779272135c0" />
//     </div>
//   );
// }

// export default LiveStreaming;
