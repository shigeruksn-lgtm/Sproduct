import React from "react";
import synapseImg from "figma:asset/649e146f3c3691d8f454981ba80cc41de9ad3408.png";

/**
 * シナプスAI 06
 */
export function Synapse06({
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
        alt="シナプスAI 06"
        style={{
          height,
          width: "auto",
          display: "block",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}