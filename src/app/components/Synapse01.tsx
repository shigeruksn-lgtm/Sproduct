import React, { useRef, useState, useLayoutEffect } from "react";
import synapseImg from "figma:asset/2dedb1ddd61793afa078b7094305a72dcf0536a7.png";

/**
 * シナプスAI 05
 * アンテナ先端ボール（画像最上部の小さな丸）= #D06030
 *
 * BALL_RATIO: アンテナ球の中心が画像高さの何%か（余白なし画像基準）
 */
const BALL_RATIO = 0.022; // ← ここだけ調整
const BALL_SIZE_RATIO = 0.026; // 球の直径（黒枠内に収める）

export function Synapse01({
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
      {/* アンテナ先端ボール — imgの背面に置きmultiply越しに発色させる */}
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
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* キャラクター本体 — multiply で白部分が背面ボール色に染まる */}
      <img
        ref={imgRef}
        src={synapseImg}
        alt="シナプスAI 05"
        style={{
          height,
          width: "auto",
          display: "block",
          mixBlendMode: "multiply",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
}