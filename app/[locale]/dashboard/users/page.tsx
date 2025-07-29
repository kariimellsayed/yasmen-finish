"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

export default function Users() {
  const t = useTranslations("dashboard.users");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { locale } = useParams();
  const isRTL = locale === "ar";

  const handleEdit = (user: User) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

  const getAllUsers = () => {
    setLoading(true);
    axiosInstance
      .get("Account/GetAllUsers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <table className="min-w-full text-sm text-black">
            <thead className="bg-[#f3e3e9]">
              <tr>
                <th className="px-6 py-4">{t("name")}</th>
                <th className="px-6 py-4">{t("email")}</th>
                <th className="px-6 py-4">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {user.firstName} {user.lastName}
                  </td>
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
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md space-y-4 text-sm text-black"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <h2 className="text-lg font-semibold border-b pb-2">
              {t("userDetails")}
            </h2>
            <div className="space-y-2">
              <p>
                👤 {t("name")}:{" "}
                <span className="font-medium">{selectedUser.firstName}</span>
              </p>
              <p>
                📧 {t("email")}:{" "}
                <span className="font-medium">{selectedUser.email}</span>
              </p>
              {/* <p className="flex items-center justify-between">
                🛡️ {t("role")}:
                <button
                  onClick={toggleAdmin}
                  className={`ml-2 px-3 py-1 rounded text-white text-xs ${
                    selectedUser.isAdmin ? "bg-purple-600" : "bg-gray-400"
                  }`}
                >
                  {selectedUser.isAdmin ? t("admin") : t("user")}
                </button>
              </p> */}
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t justify-end">
              <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                {t("delete")}
              </button>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-black underline px-3 cursor-pointer"
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
