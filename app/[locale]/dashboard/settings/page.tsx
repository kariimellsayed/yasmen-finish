"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Settings() {
  const t = useTranslations("dashboard");

  const [siteName, setSiteName] = useState("Yasmin App");
  const [email, setEmail] = useState("admin@yasmin.com");

  const handleSave = () => {
    alert("تم حفظ الإعدادات ✅");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800">
        {t("navContent.settingsContent")}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div>
          <label className="block mb-1 text-gray-600">اسم الموقع</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full text-gray-800"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600">البريد الإلكتروني للإدارة</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full text-gray-800"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-[#9A3E63] text-white px-5 py-2 rounded"
        >
          حفظ التغييرات
        </button>
      </div>
    </motion.section>
  );
}
