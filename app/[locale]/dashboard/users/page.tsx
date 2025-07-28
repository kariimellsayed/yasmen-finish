"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
  isAdmin: boolean;
}

const dummyUsers: User[] = [
  { id: 1, name: "أحمد علي", email: "ahmed@example.com", active: true, isAdmin: false },
  { id: 2, name: "منى محمد", email: "mona@example.com", active: false, isAdmin: true },
];

export default function Users() {
  const t = useTranslations("dashboard.users");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { locale } = useParams();
  const isRTL = locale === "ar";

  const handleEdit = (user: User) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);
  const toggleAdmin = () => {
    setSelectedUser((prev: User | null) => prev ? { ...prev, isAdmin: !prev.isAdmin } : null);
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
              <th className="px-6 py-4">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
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
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md space-y-4 text-sm text-black"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <h2 className="text-lg font-semibold border-b pb-2">{t("userDetails")}</h2>
            <div className="space-y-2">
              <p>👤 {t("name")}: <span className="font-medium">{selectedUser.name}</span></p>
              <p>📧 {t("email")}: <span className="font-medium">{selectedUser.email}</span></p>
              <p className="flex items-center justify-between">
                🛡️ {t("role")}:
                <button
                  onClick={toggleAdmin}
                  className={`ml-2 px-3 py-1 rounded text-white text-xs ${
                    selectedUser.isAdmin ? "bg-purple-600" : "bg-gray-400"
                  }`}
                >
                  {selectedUser.isAdmin ? t("admin") : t("user")}
                </button>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t pt-3 justify-end">
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
