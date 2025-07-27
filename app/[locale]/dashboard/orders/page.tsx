"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

const dummyOrders = [
  { id: 101, customer: "أحمد إبراهيم", status: "مكتمل", date: "2025-07-10" },
  { id: 102, customer: "سارة علي", status: "قيد التنفيذ", date: "2025-07-12" },
];

// ماب لحالات الطلب
const statusMap: Record<string, string> = {
  "مكتمل": "delivered",
  "قيد التنفيذ": "processing",
  "قيد الانتظار": "pending",
  "تم الشحن": "shipped",
  "تم الإلغاء": "cancelled",
  "تم الإرجاع": "returned",
  "فشل في التسليم": "failed"
};

export default function Orders() {
  const t = useTranslations("dashboard");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800">
        {t("navContent.ordersContent")}
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-[#f3e3e9]">
            <tr>
              <th className="px-6 py-4">{t("orders.orderNumber")}</th>
              <th className="px-6 py-4">{t("orders.customer")}</th>
              <th className="px-6 py-4">{t("orders.status")}</th>
              <th className="px-6 py-4">{t("orders.date")}</th>
              <th className="px-6 py-4">{t("orders.details")}</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => {
              const statusKey = statusMap[order.status] || "pending";
              return (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">#{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{t(`orders.statuses.${statusKey}`)}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {t("orders.viewDetails")}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* نافذة تفاصيل الطلب */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setSelectedOrder(null);
                setSelectedFile(null);
              }}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">{t("orders.detailsTitle")}</h2>
            <p className="mb-2">{t("orders.orderNumber")}: #{selectedOrder.id}</p>
            <p className="mb-2">{t("orders.customer")}: {selectedOrder.customer}</p>
            <p className="mb-2">
              {t("orders.status")}: {t(`orders.statuses.${statusMap[selectedOrder.status] || "pending"}`)}
            </p>
            <p className="mb-4">{t("orders.date")}: {selectedOrder.date}</p>

            <div>
              <label className="block mb-2 font-semibold">
                {t("orders.uploadImage")}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="mb-2 border p-2 w-full rounded"
              />
              {selectedFile && (
                <p className="text-green-600 text-sm">
                  {t("orders.selectedFile")}: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
