import { useState } from "react";
import Chat from "@components/pageComp/live/Chat";
import LiveStream from "@components/pageComp/live/LiveStream";
import { LiveStreamWrap } from "@components/pageComp/live/styles";

function Live() {
  const [showRoom, setShowRoom] = useState({
    liveMain: true,
    liveRoom: false
  });
  return (
    <LiveStreamWrap>
      {showRoom.liveRoom && <LiveStream />}
      <Chat showRoom={showRoom} setShowRoom={setShowRoom} />
    </LiveStreamWrap>
  );
}

export default Live;
