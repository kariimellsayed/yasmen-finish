"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const dummyBrands = [
  { id: 1, name: "MAC", logo: "/brands/mac.png" },
  { id: 2, name: "Maybelline", logo: "/brands/maybelline.png" },
];

export default function Brands() {
  const t = useTranslations("dashboard");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800">{t("navContent.brandsContent")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyBrands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white p-5 rounded-xl shadow-sm flex flex-col items-center text-center"
          >
            <img src={brand.logo} alt={brand.name} className="w-20 h-20 object-contain mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
            <div className="mt-2">
              <button className="text-blue-600 text-sm hover:underline">تعديل</button>
              <button className="text-red-600 text-sm hover:underline ml-4">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
