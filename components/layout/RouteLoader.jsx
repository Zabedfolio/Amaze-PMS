"use client";

import React, { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function LoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    setIsLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        !href.includes("#") &&
        target.target !== "_blank" &&
        href !== pathname
      ) {
        setIsLoading(true);
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [pathname]);

  if (!isLoading) return null;

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

export default function RouteLoader() {
  return (
    <Suspense fallback={null}>
      <LoaderContent />
    </Suspense>
  );
}
