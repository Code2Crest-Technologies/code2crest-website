"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRightFromBracket } from "react-icons/fa6";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
    >
      <FaRightFromBracket className="h-4 w-4" />
      <span className="hidden sm:inline">{isLoggingOut ? "Logging out" : "Logout"}</span>
    </button>
  );
}
