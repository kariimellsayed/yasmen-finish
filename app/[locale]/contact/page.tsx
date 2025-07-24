"use client";

import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      {/* ✅ Breadcrumb */}
    <div className="flex items-center gap-2 mb-8 text-[#393939] text-sm md:text-base">
        <Link href="/" className="text-[#868686] hover:underline transition-all">
          {t("breadcrumb.home")}
        </Link>
        <Image src="/arrow-right.svg" alt="Arrow Right" width={20} height={20} />
        <span className="font-semibold text-[#393939]">{t("breadcrumb.contact")}</span>
      </div>  

      {/* ✅ Heading */}
      <h1 className="text-3xl font-bold text-center mb-4 animate-fade-in">{t("title")}</h1>
      <p className="text-center text-gray-600 mb-10 animate-fade-in delay-100">{t("description")}</p>

      {/* ✅ Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ✅ Info Box */}
        <div className="relative p-6 rounded-md bg-[#fe93b9] text-[#393939] overflow-hidden flex flex-col justify-between min-h-[500px] shadow-md hover:shadow-lg transition-all">
          <Image
            src="/552b44a24fba9af49142ba9f5800bf941ef1ec2a.png"
            alt="Decoration"
            fill
            className="object-contain absolute bottom-0 right-0 opacity-20 pointer-events-none"
          />

          <div className="space-y-3 z-10">
            <h2 className="text-xl font-semibold">{t("info.title")}</h2>
            <p>{t("info.text")}</p>
          </div>

          <div className="space-y-4 mt-6 z-10">
            <div className="flex items-center gap-3">
              <FaPhoneAlt />
              <h3 className="font-medium">{t("info.phone")}:</h3>
              <p>00000000</p>
            </div>

            <div className="flex items-center gap-3">
              <MdEmail />
              <h3 className="font-medium">{t("info.email")}:</h3>
              <p>example@gmail.com</p>
            </div>

            <div className="flex items-start gap-3">
              <FaLocationDot className="mt-1" />
              <div>
                <h3 className="font-medium">{t("info.hours")}:</h3>
                <p>{t("info.weekdays")}: 9:00 - 22:00</p>
                <p>{t("info.weekend")}: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* ✅ Social Icons */}
          <div className="flex gap-3 mt-6 z-10">
            <a href="#" className="w-8 h-8 rounded-full bg-[#393939] flex items-center justify-center hover:scale-110 transition-all">
              <FaFacebookF size={16} className="text-[#FE93B9]" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-[#393939] flex items-center justify-center hover:scale-110 transition-all">
              <FiInstagram size={16} className="text-[#FE93B9]" />
            </a>
          </div>
        </div>

        {/* ✅ Form */}
        <form className="space-y-5 p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow hover:shadow-md transition-all">
          {[{
            label: t("form.name"),
            type: "text",
            placeholder: t("form.placeholder.name"),
          }, {
            label: t("form.email"),
            type: "email",
            placeholder: t("form.placeholder.email"),
          }, {
            label: t("form.subject"),
            type: "text",
            placeholder: t("form.placeholder.subject"),
          }].map((field, index) => (
            <div key={index} className="transition-all">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border-b-2 border-r-2 border-gray-300 bg-white text-gray-800 rounded shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FE93B9] focus:border-[#FE93B9] transition"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("form.message")}
            </label>
            <textarea
              rows={4}
              placeholder={t("form.placeholder.message")}
              className="w-full px-3 py-2 border-b-2 border-r-2 border-gray-300 bg-white text-gray-800 rounded shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FE93B9] focus:border-[#FE93B9] transition"
            />
          </div>

          <button
            type="submit"
            className="bg-[#FE93B9] hover:bg-[#9A3E63] w-full sm:w-auto px-6 py-2 text-white rounded-full transition shadow hover:shadow-md"
          >
            {t("form.submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
