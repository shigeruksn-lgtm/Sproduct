import React from "react";
import synapseImg from "figma:asset/73bd09f9119dbe810dade17aa328daea6ad2f02a.png";

export function Synapse07({
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
        alt="シナプスAI 07"
        style={{
          height,
          width: "auto",
          display: "block",
        }}
      />
    </div>
  );
}