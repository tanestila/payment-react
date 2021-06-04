import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Overlay, Tooltip } from "react-bootstrap";

export const Copy: React.FC<{ text: string }> = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const target = useRef(null);

  return (
    <>
      <CopyToClipboard
        text={text}
        onCopy={() => {
          setCopySuccess(true);
          setTimeout(function () {
            setCopySuccess(false);
          }, 1000);
        }}
      >
        <i
          className="icon-copy icon gray"
          ref={target}
          style={{ float: "left", cursor: "pointer", paddingRight: "5px" }}
        ></i>
      </CopyToClipboard>
      <Overlay target={target.current} show={copySuccess} placement="right">
        <Tooltip id="overlay-example">Copied</Tooltip>
      </Overlay>
    </>
  );
};
