import Chat from "@components/pageComp/live/Chat";
import LiveVod from "@components/pageComp/live/LiveVod";

import { css } from "@emotion/react";
import React, { useState } from "react";

function Live() {
  const [showRoom, setShowRoom] = useState({
    liveMain: true,
    liveRoom: false
  });
  return (
    <div
      css={css`
        display: flex;
        max-width: 1650px;
        margin: 60px auto 0;
      `}
    >
      {showRoom.liveRoom && <LiveVod />}
      <Chat showRoom={showRoom} setShowRoom={setShowRoom} />
    </div>
  );
}

export default Live;
