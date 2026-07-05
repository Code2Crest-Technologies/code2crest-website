"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo-icon.png"; // use your logo icon

export default function WebsiteBubble() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      {/* Message */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          showMessage
            ? "max-w-xs opacity-100 translate-x-0"
            : "max-w-0 opacity-0 -translate-x-4"
        }`}
      >
        <Link
          href="/"
          className="whitespace-nowrap rounded-full border border-indigo-500/30 bg-slate-900/95 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm hover:border-indigo-400/60"
        >
          👋 Explore our website
        </Link>
      </div>

      {/* Logo Bubble */}
      <Link
        href="/"
        className="group flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/30 bg-slate-900/95 shadow-xl backdrop-blur-sm transition hover:scale-110"
      >
        <Image
          src={Logo}
          alt="Code2Crest"
          width={50}
          height={50}
          className="object-contain"
        />
      </Link>
    </div>
  );
}
