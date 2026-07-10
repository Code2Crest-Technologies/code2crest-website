"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { FaBars, FaBell, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { portalNavigation } from "@/modules/portal/data/portal";
import type { AuthCompany, AuthUser } from "@/lib/auth/session";
import LogoutButton from "@/modules/portal/components/logout-button";
import { Code2CrestLogoMark } from "@/modules/portal/components/auth-ui";

type PortalShellProps = {
  children: React.ReactNode;
  company: AuthCompany;
  user: AuthUser & { role: string };
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function PortalShell({ children, company, user }: PortalShellProps) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return portalNavigation;
    }

    return portalNavigation.filter((item) =>
      `${item.name} ${item.href}`.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-slate-950 text-white lg:flex lg:flex-col">
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Code2CrestLogoMark className="h-10 w-10 rounded-xl" />
            <span>
              <span className="block text-base font-semibold">Code2Crest</span>
              <span className="block text-xs text-slate-400">Business Hub</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {portalNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "flex items-center gap-3 rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white"
                    : "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                }
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-lg bg-white/5 p-4">
            <p className="text-sm font-semibold">{company.name}</p>
            <p className="mt-1 text-xs text-slate-400">{company.plan}</p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 lg:hidden"
              aria-label="Open navigation"
            >
              {isMobileNavOpen ? (
                <FaXmark className="h-4 w-4" />
              ) : (
                <FaBars className="h-4 w-4" />
              )}
            </button>

            <div className="relative hidden max-w-md flex-1 md:block">
              <div className="flex h-10 items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 text-slate-500 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50">
              <FaMagnifyingGlass className="h-4 w-4" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search Hub"
                  className="w-full border-0 bg-transparent p-0 text-sm text-slate-700 outline-none placeholder:text-slate-500 focus:ring-0"
                />
              </div>
              {search ? (
                <div className="absolute left-0 right-0 top-12 z-30 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                  {searchResults.length ? (
                    searchResults.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSearch("")}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          <Icon className="h-4 w-4 text-blue-600" />
                          {item.name}
                        </Link>
                      );
                    })
                  ) : (
                    <p className="px-4 py-3 text-sm text-slate-500">
                      No Hub results found.
                    </p>
                  )}
                </div>
              ) : null}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsNotificationsOpen((current) => !current)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                  aria-label="Notifications"
                  aria-expanded={isNotificationsOpen}
                >
                  <FaBell className="h-4 w-4" />
                </button>
                {isNotificationsOpen ? (
                  <div className="absolute right-0 top-12 z-30 w-80 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-950">
                        Notifications
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Team invites, subscription alerts, and product updates.
                      </p>
                    </div>
                    <div className="px-4 py-6 text-center text-sm text-slate-500">
                      No new notifications.
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-950 text-xs font-bold text-white">
                  {getInitials(user.name)}
                </span>
                <span className="hidden sm:block">
                  <span className="block text-sm font-semibold leading-4">
                    {user.name}
                  </span>
                  <span className="block text-xs text-slate-500">{user.role}</span>
                </span>
              </div>
              <LogoutButton />
            </div>
          </div>

          <nav
            className={
              isMobileNavOpen
                ? "grid gap-2 border-t border-slate-200 px-4 py-3 lg:hidden"
                : "hidden"
            }
          >
            {portalNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={
                    pathname === item.href
                      ? "flex items-center gap-3 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
                      : "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600"
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
