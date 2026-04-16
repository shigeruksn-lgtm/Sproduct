import React, { useRef, useState, useLayoutEffect } from "react";
import synapseImg from "figma:asset/b6ef4949eb35f8777c1d190f254231ac135dccc2.png";

/**
 * シナプスAI 04
 * アンテナ先端ボール（画像最上部の小さな丸）= #D06030
 *
 * BALL_RATIO: アンテナ球の中心が画像高さの何%か（余白なし画像基準）
 */
const BALL_RATIO = 0.028; // ← 位置調整
const BALL_SIZE_RATIO = 0.03; // 球の直径

export function Synapse05({
  height = 260,
  style,
}: {
  height?: number;
  style?: React.CSSProperties;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [renderedHeight, setRenderedHeight] = useState<number>(height);

  useLayoutEffect(() => {
    const update = () => {
      if (imgRef.current) {
        setRenderedHeight(imgRef.current.clientHeight);
      }
    };
    update();
    const img = imgRef.current;
    if (img) {
      img.addEventListener("load", update);
      return () => img.removeEventListener("load", update);
    }
  }, [height]);

  const ballDiam = Math.max(3, Math.round(renderedHeight * BALL_SIZE_RATIO));
  const ballTop  = Math.round(renderedHeight * BALL_RATIO - ballDiam / 2);

  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      {/* キャラクター本体 */}
      <img
        ref={imgRef}
        src={synapseImg}
        alt="シナプスAI 04"
        style={{
          height,
          width: "auto",
          display: "block",
          mixBlendMode: "multiply",
        }}
      />

      {/* アンテナ先端ボール #D06030 */}
      <div
        style={{
          position: "absolute",
          top: Math.max(0, ballTop),
          left: "50%",
          transform: "translateX(-50%)",
          width: ballDiam,
          height: ballDiam,
          borderRadius: "50%",
          background: "#D06030",
          border: "0.5px solid #111",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}