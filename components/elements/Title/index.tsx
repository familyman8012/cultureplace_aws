import React from "react";
import Link from "next/link";
import { SerializedStyles } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { TitleArea } from "./styles";

interface Props {
  i?: number;
  children: React.ReactNode;
  url?: string;
  css?: SerializedStyles;
}

function Title({ i, children, url = "/", ...rest }: Props) {
  return (
    <TitleArea type={i === 0 ? "first" : "normal"} {...rest}>
      <h2>{children}</h2>
      <Link href={url}>
        <a>
          전체보기<FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
        </a>
      </Link>
    </TitleArea>
  );
}

export default Title;
