import React from "react";
import synapse04Img from "figma:asset/b23d7b8bdcce5263dcebc1312a1c02188eb25a31.png";

/**
 * シナプスAI 03
 */
export function Synapse04({
  height = 220,
  style,
}: {
  height?: number;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={synapse04Img}
      alt="シナプスAI 03"
      style={{
        height,
        width: "auto",
        display: "block",
        mixBlendMode: "multiply",
        ...style,
      }}
    />
  );
}