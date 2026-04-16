import React from "react";
import synapse03Img from "figma:asset/5ad8c2451eed483d9c242256d7b2045c27656d92.png";

/**
 * シナプスAI 02 — デブキャラ
 */
export function Synapse03({
  height = 220,
  style,
}: {
  height?: number;
  style?: React.CSSProperties;
}) {
  // 元画像の縦横比に合わせて幅を算出（約 410 × 1024 px）
  const aspectRatio = 410 / 1024;
  const w = height * aspectRatio;

  return (
    <img
      src={synapse03Img}
      alt="シナプスAI 02"
      width={w}
      height={height}
      style={{ display: "block", objectFit: "contain", ...style }}
    />
  );
}