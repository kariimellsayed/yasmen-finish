"use client";
import { useState, useEffect } from "react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaFacebookF } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import SwitchButtonLang from "./SwitchButtonLang";
import { motion } from "framer-motion";
import {
  FiHome, FiBox, FiMail, FiActivity, FiShield, FiHelpCircle,
  FiUser, FiSearch, FiShoppingCart, FiInstagram, FiGift
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";



type NavItem = {
  key: string;
  path: string | string[];
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
};


type NavSection = {
  title?: string;
  items: NavItem[];
};

export default function Navbar() {
  const pathName = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const router = useRouter();

  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setToggle(false);
  }, [pathName]);

  useEffect(() => {
    if (!searchTerm) return;
    const timeout = setTimeout(() => {
      const query = searchTerm.trim();
      const basePath = `/${locale}/products`;
      const finalURL = query ? `${basePath}?search=${encodeURIComponent(query)}` : basePath;
      router.push(finalURL);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm, locale, router]);

  const navSections: NavSection[] = [
    {
      title: "general",
      items: [
        { key: "home", path: "/", icon: <FiHome size={20} />, activeIcon: <FiHome size={20} className="text-white" /> },
        { key: "products", path: "/products", icon: <FiBox size={20} />, activeIcon: <FiBox size={20} className="text-white" /> },
        { key: "contact", path: "/contact", icon: <FiMail size={20} />, activeIcon: <FiMail size={20} className="text-white" /> }
      ]
    },
    {
      title: "mySpace",
      items: [
        { key: "activity", path: "/activity", icon: <FiActivity size={20} />, activeIcon: <FiActivity size={20} className="text-white" /> },
        { key: "privacy", path: "/privacy", icon: <FiShield size={20} />, activeIcon: <FiShield size={20} className="text-white" /> }
      ]
    },
    {
      title: "support",
      items: [
        { key: "help", path: "/help", icon: <FiHelpCircle size={20} />, activeIcon: <FiHelpCircle size={20} className="text-white" /> }
      ]
    },
    {
      items: [
        { key: "account", path: ["/auth/login", "/auth/signup"], icon: <FiUser size={20} />, activeIcon: <FiUser size={20} className="text-white" /> }
      ]
    },
    {
      title: "dashboard",
      items: [
        { key: "dashboard", path: "/dashboard", icon: <MdDashboard size={20} />, activeIcon: <MdDashboard  color={"#fff"} size={20} className="text-white" /> }
      ]
    }
  ];

  const isActive = (path: string | string[]) => {
    const cleanedPath = pathName.toLowerCase().replace(/^\/(en|ar)/, '');
    if (Array.isArray(path)) {
      return path.some(p => cleanedPath === p.toLowerCase());
    }
    const isHome = cleanedPath === '' || cleanedPath === '/';
    return isHome ? path === '/' : cleanedPath === path.toLowerCase() || cleanedPath.startsWith(path.toLowerCase() + '/');
  };

  const renderNavLinks = (section: NavSection) => (
    <div className="px-9 py-4 border-b border-[#9A3E631A] last:border-b-0">
      {section.title && <h4 className="text-[14px] text-[#9A3E63] mb-2">{t(section.title)}</h4>}
      <ul>
        {section.items.map((item: NavItem, index: number) => {
          const active = isActive(item.path);
          const fullPath = `/${locale}${Array.isArray(item.path) ? item.path[0] : item.path}`;
          return (
            <li key={index} className="mb-1">
              <Link
                href={fullPath}
                className={`${
                  active
                    ? "text-white bg-gradient-to-r from-[#FE93B9] to-[#9A3E63] border-[1px] border-transparent border-l-[#9A3E63]"
                    : "text-[#000000CC]"
                } flex items-center gap-2 text-[13px] rounded-[10px] py-1.5 px-2.5 w-full`}
              >
                {active ? item.activeIcon : item.icon}
                {t(item.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <>
      <header>
        <p className="flex justify-center items-center gap-2.5 p-2.5 px-20 bg-[#FE93B9] text-[#393939] text-[15px] max-[767px]:text-[13px]">
          <FiGift size={20} />
          Only this month 20% discount on all services
          <FiGift size={20} />
        </p>

        <nav className="w-full min-h-1.5">
          <div className="bg-[#f5f5f5]">
            <div className="custom__container">
              <ul className="flex items-center justify-between gap-4 w-full py-3 relative">
                <li className="relative z-50">
                  {toggle && (
                    <span className="absolute -bottom-[35px] left-1/2 -translate-x-1/2">
                      <svg className="w-12" xmlns="http://www.w3.org/2000/svg" width="80" height="64" viewBox="0 0 80 64" fill="none">
                        <path d="M40 64L0.162827 0.25L79.8372 0.25L40 64Z" fill="#FE93B9" />
                      </svg>
                    </span>
                  )}
                  <button onClick={() => setToggle(!toggle)} className="cursor-pointer">
                    <svg className="w-10" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <path d="M52.5 13.125H35C33.975 13.125 33.125 12.275 33.125 11.25C33.125 10.225 33.975 9.375 35 9.375H52.5C53.525 9.375 54.375 10.225 54.375 11.25C54.375 12.275 53.525 13.125 52.5 13.125Z" fill="#393939" />
                      <path d="M52.5 25.625H35C33.975 25.625 33.125 24.775 33.125 23.75C33.125 22.725 33.975 21.875 35 21.875H52.5C53.525 21.875 54.375 22.725 54.375 23.75C54.375 24.775 53.525 25.625 52.5 25.625Z" fill="#393939" />
                      <path d="M52.5 38.125H7.5C6.475 38.125 5.625 37.275 5.625 36.25C5.625 35.225 6.475 34.375 7.5 34.375H52.5C53.525 34.375 54.375 35.225 54.375 36.25C54.375 37.275 53.525 38.125 52.5 38.125Z" fill="#393939" />
                      <path d="M52.5 50.625H7.5C6.475 50.625 5.625 49.775 5.625 48.75C5.625 47.725 6.475 46.875 7.5 46.875H52.5C53.525 46.875 54.375 47.725 54.375 48.75C54.375 49.775 53.525 50.625 52.5 50.625Z" fill="#393939" />
                      <path d="M19.8 26.875H12.7C8.85 26.875 6.875 24.925 6.875 21.05V13.95C6.875 10.1 8.825 8.125 12.7 8.125H19.825C23.675 8.125 25.65 10.075 25.65 13.95V21.075C25.625 24.925 23.675 26.875 19.8 26.875Z" fill="#393939" />
                    </svg>
                  </button>

                  {toggle && (
                    <div className="absolute py-4 bg-[#fe93b9] top-[79px] -left-6 rounded-r-[8px] rounded-b-[8px] z-50 w-[270px]">
                      <div className="px-9">
                        <Image src="/logo.svg" width={75} height={75} loading="lazy" alt="logo" className="mb-3" />
                      </div>
                      <div className="pt-4 pb-4 mb-4 flex flex-col justify-start items-start gap-2">
                        {navSections.map((section, index) => (
                          <div key={index} className="w-[90%]">{renderNavLinks(section)}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>

                <li className="absolute left-1/2 -translate-x-1/2 z-0">
                  <Link href="/">
                    <Image src="/logo.svg" width={90} height={90} loading="lazy" alt="logo" />
                  </Link>
                </li>

                <li className="flex items-center gap-2 z-10">
                  <div className="hidden lg:block relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="px-3 py-1 text-sm rounded-md bg-[#f3f3f3] outline-none text-black"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                      <FiSearch size={20} />
                    </button>
                  </div>
                  <Link href="/cart" className="lg:bg-[#FE93B9] bg-transparent rounded-full w-[35px] h-[35px] flex justify-center items-center">
                    <FiShoppingCart size={20} className="text-[#393939] lg:text-white" />
                  </Link>
                  <Link href="https://facebook.com" target="_blank" className="bg-[#FE93B9] hidden rounded-full w-[35px] h-[35px] lg:flex justify-center items-center">
                    <FaFacebookF size={20} className="text-[#393939]" />
                  </Link>
                  <Link href="https://instagram.com" target="_blank" className="bg-[#FE93B9] hidden rounded-full w-[35px] h-[35px] lg:flex justify-center items-center">
                    <FiInstagram size={20} className="text-[#393939]" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className={`fixed top-5 ${locale === "ar" ? "left-5" : "right-5"} z-[9999]`}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <SwitchButtonLang currentLocale={locale as "en" | "ar"} />
        </motion.div>
      </div>
    </>
  );
}
