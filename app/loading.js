import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A0A0C]/85 backdrop-blur-md">
      <div className="flex flex-col items-center gap-5">
        
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[3px] border-[#FF5004]/10 border-t-[#FF5004] animate-spin" />
          <div className="absolute w-10 h-10 rounded-full border-[3px] border-[#FF5004]/20 border-b-[#FF5004] animate-spin [animation-direction:reverse]" />
        </div>
        <span className="font-display text-[11px] font-extrabold tracking-[0.2em] text-[#FF5004] uppercase animate-pulse">
          Loading Amaze PMS
        </span>
      </div>
    </div>
  );
}
