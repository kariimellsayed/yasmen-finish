"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const dummyUsers = [
  { id: 1, name: "أحمد علي", email: "ahmed@example.com", active: true, isAdmin: false },
  { id: 2, name: "منى محمد", email: "mona@example.com", active: false, isAdmin: true },
];

export default function Users() {
  const t = useTranslations("users");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const { locale } = useParams();
  const isRTL = locale === "ar";

  const handleEdit = (user: any) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);
  const toggleAdmin = () => {
    setSelectedUser((prev: any) => ({ ...prev, isAdmin: !prev.isAdmin }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`space-y-6 ${isRTL ? "text-right" : "text-left"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h1 className="text-2xl font-bold text-black">{t("title")}</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-black">
          <thead className="bg-[#f3e3e9]">
            <tr>
              <th className="px-6 py-4">{t("name")}</th>
              <th className="px-6 py-4">{t("email")}</th>
              <th className="px-6 py-4">{t("status")}</th>
              <th className="px-6 py-4">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.active ? t("active") : t("inactive")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    {t("details")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md space-y-4 text-sm text-black"
               dir={isRTL ? "rtl" : "ltr"}>
            <h2 className="text-lg font-semibold border-b pb-2">{t("userDetails")}</h2>
            <div className="space-y-2">
              <p>👤 {t("name")}: <span className="font-medium">{selectedUser.name}</span></p>
              <p>📧 {t("email")}: <span className="font-medium">{selectedUser.email}</span></p>
              <p>
                ✅ {t("status")}:{" "}
                <span className={selectedUser.active ? "text-green-700 font-medium" : "text-red-700 font-medium"}>
                  {selectedUser.active ? t("active") : t("inactive")}
                </span>
              </p>
              <p className="flex items-center justify-between">
                🛡️ {t("role")}:
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedUser.isAdmin}
                    onChange={toggleAdmin}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 relative" />
                  <span className={`ml-3 text-sm font-medium text-gray-700`}>
                    {selectedUser.isAdmin ? t("admin") : t("user")}
                  </span>
                </label>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t pt-3 justify-end">
              <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                {t("edit")}
              </button>
              <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                {t("delete")}
              </button>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-black underline px-3"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
