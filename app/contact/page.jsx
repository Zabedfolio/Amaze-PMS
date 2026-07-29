"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ContactRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isSchedule = window.location.hash === "#schedule" || searchParams.get("action") === "schedule";
    
    if (isSchedule) {
      router.replace("/?action=schedule");
    } else {
      router.replace("/?action=contact");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center gap-4 text-center px-6">
      <div className="w-10 h-10 rounded-full border-4 border-[#FF5004]/10 border-t-[#FF5004] animate-spin" />
      <p className="text-[#A1A1AA] text-sm font-sans tracking-wide">
        Redirecting you to our unified service portal...
      </p>
    </div>
  );
}

export default function ContactRedirectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="w-10 h-10 rounded-full border-4 border-[#FF5004]/10 border-t-[#FF5004] animate-spin" />
      </div>
    }>
      <ContactRedirectContent />
    </Suspense>
  );
}
