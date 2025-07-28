"use client";

import { useLocale } from "next-intl";
import NavDashboard from "../_components/navDashboard";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const locale = useLocale();

  return (
    <section
      className="flex min-h-screen bg-[#fff]"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <aside className="w-1/4 bg-[#f5f5f5] p-4">
        <NavDashboard />
      </aside>
      <main className="w-3/4 p-6">{children}</main>
    </section>
  );
}
