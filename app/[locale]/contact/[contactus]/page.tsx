import { useTranslations } from "next-intl";
import React from "react";

export default function ContactUs() {
  const t = useTranslations("ContactPage");
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Contact Info */}
      <div className="bg-gray-50 p-6 rounded-md w-[491px] h-[647px] space-y-4">
        <div>
          <h2 className="text-xl font-semibold">{t("info.title")}</h2>
          <p className="text-gray-600">{t("info.text")}</p>
        </div>
        <div>
          <h3 className="font-medium">{t("info.phone")}</h3>
          <p>00000000</p>
        </div>
        <div>
          <h3 className="font-medium">{t("info.email")}</h3>
          <p>example@gmail.com</p>
        </div>
        <div>
          <h3 className="font-medium">{t("info.hours")}</h3>
          <p>{t("info.weekdays")}: 9:00 - 22:00</p>
          <p>{t("info.weekend")}: 9:00 - 21:00</p>
        </div>
      </div>
      {/* Contact Form */}
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("form.name")}
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder={t("form.placeholder.name")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("form.email")}
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder={t("form.placeholder.email")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("form.subject")}
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder={t("form.placeholder.subject")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("form.message")}
          </label>
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder={t("form.placeholder.message")}
          />
        </div>
        <button
          type="submit"
          className="bg-[#FE93B9] hover:bg-[#9A3E63] text-white px-6 py-2 rounded transition"
        >
          {t("form.submit")}
        </button>
      </form>
    </div>
  );
}
