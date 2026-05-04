"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { sidebarItems } from "@/constants";
import { EduAdminBrand } from "@/components/shared/edu-admin-brand";
import { ModeToggle } from "@/components/mode-toggle";

function SidebarIcon({ label }: { label: string }) {
  const iconClassName = "h-5 w-5 shrink-0 text-current";

  switch (label) {
    case "Dashboard":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={iconClassName}
        >
          <path
            d="M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "Fanlar":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={iconClassName}
        >
          <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.8" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={iconClassName}
        >
          <circle cx="12" cy="12" r="8" strokeWidth="1.8" />
        </svg>
      );
  }
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const wrapperClassName = useMemo(
    () =>
      `relative z-20 flex h-full min-h-0 shrink-0 flex-col border-r border-slate-200 bg-white text-slate-900 transition-[width] duration-300 ease-out dark:border-slate-800 dark:bg-slate-950 dark:text-white ${
        collapsed ? "w-20" : "w-72"
      }`,
    [collapsed],
  );

  return (
    <aside className={wrapperClassName}>
      <div
        className={`flex border-b border-slate-200 dark:border-white/10 ${
          collapsed
            ? "flex-col items-center gap-2 px-2 py-3"
            : "items-center justify-between pr-2"
        }`}
      >
        <EduAdminBrand collapsed={collapsed} />
        {collapsed ? (
          ""
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              className="shrink-0 rounded-md border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10"
              aria-label="Sidebarni yopish"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path d="M15 6l-6 6 6 6" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="absolute left-full top-9 z-50 -translate-x-4 rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-lg shadow-slate-900/10 transition hover:bg-slate-50 dark:border-white/20 dark:bg-slate-950 dark:text-slate-200 dark:shadow-black/40 dark:hover:bg-slate-900"
          aria-label="Sidebarni ochish"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path d="M9 6l6 6-6 6" strokeWidth="1.8" />
          </svg>
        </button>
      )}

      <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              }`}
            >
              <SidebarIcon label={item.label} />
              <span
                className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                  collapsed ? "w-0 opacity-0" : "w-40 opacity-100"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="my-4 ml-6">
      <ModeToggle />
      </div>
    </aside>
  );
}
