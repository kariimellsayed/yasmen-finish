
"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavDashboard() {
  const locale = useLocale();
  const pathName = usePathname();
  const t = useTranslations("dashboard");

  const links = [
    { href: "/dashboard/users", label: t("nav.users") },
    { href: "/dashboard/products", label: t("nav.products") },
    { href: "/dashboard/brands", label: t("nav.brands") },
    { href: "/dashboard/orders", label: t("nav.orders") },
    { href: "/dashboard/settings", label: t("nav.settings") },
  ];

  return (
    <ul className="space-y-2">
      {links.map((link) => {
        const fullPath = `/${locale}${link.href}`;
        const isActive = pathName === fullPath;
        return (
          <li key={link.href}>
            <Link
              href={fullPath}
              className={`block px-4 py-2.5 rounded-lg text-[18px] transition-all duration-200 ${
                isActive
                  ? "text-white bg-gradient-to-r from-[#FE93B9] to-[#9A3E63]"
                  : "bg-[#f0dbe3] text-black hover:bg-[#ecc9d7]"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
