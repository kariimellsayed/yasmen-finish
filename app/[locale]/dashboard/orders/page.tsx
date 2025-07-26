// ✅ orders/page.tsx
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const dummyOrders = [
  { id: 101, customer: "أحمد إبراهيم", status: "مكتمل", date: "2025-07-10" },
  { id: 102, customer: "سارة علي", status: "قيد التنفيذ", date: "2025-07-12" },
];

export default function Orders() {
  const t = useTranslations("dashboard");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800">{t("navContent.ordersContent")}</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-[#f3e3e9]">
            <tr>
              <th className="px-6 py-4">رقم الطلب</th>
              <th className="px-6 py-4">العميل</th>
              <th className="px-6 py-4">الحالة</th>
              <th className="px-6 py-4">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">#{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
