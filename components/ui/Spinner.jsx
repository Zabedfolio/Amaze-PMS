import React from "react";

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-[3px]",
  lg: "w-9 h-9 border-[3px]",
};

export default function Spinner({ size = "sm", className = "" }) {
  return (
    <div
      className={[
        "inline-block rounded-full border-white/10 border-t-[#FF5004]",
        "[animation:spin_0.8s_linear_infinite]",
        sizeClasses[size] ?? sizeClasses.sm,
        className,
      ].join(" ")}
      role="status"
      aria-label="loading"
    >
      <span className="absolute w-px h-px p-0 -m-px overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0">
        Loading...
      </span>
    </div>
  );
}
