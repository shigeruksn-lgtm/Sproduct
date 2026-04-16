import synapseAI09Image from "figma:asset/ad3e3cfded979f0b51530673c31a94ef5d004735.png";

interface Synapse09Props {
  height?: number;
}

export function Synapse09({ height = 320 }: Synapse09Props) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: `${height}px`,
        width: "240px",
        overflow: "visible",
      }}
    >
      <img
        src={synapseAI09Image}
        alt="シナプスAI 09 - 教育ロボット"
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </div>
  );
}