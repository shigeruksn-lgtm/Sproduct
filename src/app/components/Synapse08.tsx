import React from "react";
import synapseImg from "figma:asset/cfb6b60fb885426da391ece82bccd3862ca392a3.png";

export function Synapse08({
  height = 260,
  style,
}: {
  height?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <img
        src={synapseImg}
        alt="シナプスAI 08"
        style={{
          height,
          width: "auto",
          display: "block",
        }}
      />
    </div>
  );
}
