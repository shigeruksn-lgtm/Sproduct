import React from "react";
import synapseImg from "figma:asset/d861fb95f88c1a5bbf0469f442745ccfed3d426f.png";

/**
 * シナプスAI 01
 */
export function Synapse02({
  height = 300,
  style,
}: {
  height?: number;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={synapseImg}
      alt="シナプスAI 01"
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