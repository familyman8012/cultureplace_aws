import { Stream } from "@cloudflare/stream-react";
import { css } from "@emotion/react";
import React from "react";

function LiveStreaming() {
  return (
    <div
      css={css`
        width: 500px;
        height: 500px;
      `}
    >
      sd
      <Stream controls src="9aa75cfe7fc6f80fb508c779272135c0" />
    </div>
  );
}

export default LiveStreaming;
