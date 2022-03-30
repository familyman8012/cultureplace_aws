import { css } from "@emotion/react";
import React from "react";

function Vod() {
  return (
    <div>
      <iframe
        src="http://yyagency7.iwinv.net/wp"
        css={css`
          display: block;
          width: 100vw;
          height: 100vh;
        `}
      />
    </div>
  );
}

export default Vod;
