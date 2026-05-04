"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { sidebarItems } from "@/constants";
import { EduAdminBrand } from "@/components/shared/edu-admin-brand";

function SidebarIcon({ label }: { label: string }) {
  const iconClassName = "h-5 w-5 text-slate-300";

  switch (label) {
    case "Dashboard":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClassName}>
          <path d="M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z" strokeWidth="1.8" />
        </svg>
      );
    case "Fanlar":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClassName}>
          <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.8" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClassName}>
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
      `flex h-screen flex-col fixed bg-slate-950 text-white transition-[width] duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`,
    [collapsed]
  );

  return (
    <aside className={wrapperClassName}>
      <div className="flex items-center justify-between border-b border-white/10">
        <EduAdminBrand collapsed={collapsed} />
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="mr-3 rounded-md border border-white/15 p-2 text-slate-300 transition hover:bg-white/10"
          aria-label={collapsed ? "Sidebarni ochish" : "Sidebarni yopish"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            <path d={collapsed ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} strokeWidth="1.8" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                isActive ? "bg-blue-600 text-white" : "text-slate-200 hover:bg-white/10"
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
    </aside>
  );
}
