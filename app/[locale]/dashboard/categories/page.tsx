"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";

const dummyCategories = [
  { id: 1, name: "أحمر شفاه", icon: "/categories/lipstick.png" },
  { id: 2, name: "كحل", icon: "/categories/kohl.png" },
  { id: 3, name: "فاونديشن", icon: "/categories/foundation.png" },
];

export default function Categories() {
  const t = useTranslations("dashboard");
  const [categories, setCategories] = useState(dummyCategories);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddCategory = () => {
    if (!newName || !newIcon) {
      alert(t("actions.fillAllFields"));
      return;
    }

    const newCategory = {
      id: categories.length + 1,
      name: newName,
      icon: newIcon, // Base64 image
    };

    setCategories((prev) => [...prev, newCategory]);
    setNewName("");
    setNewIcon("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setNewIcon(e.target.result as string); // Set base64
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: number) => {
    const confirmed = confirm(t("actions.confirmDeleteCategory"));
    if (confirmed) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("navContent.categoriesContent")}
        </h1>
      </div>

      {/* نموذج الإضافة */}
      <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {t("actions.addCategory")}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder={t("placeholders.categoryName")}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 placeholder-gray-500"
          />
          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              placeholder={t("placeholders.categoryIcon")}
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-500 hover:border-gray-400"
            >
              {newIcon ? t("actions.changeIcon") : t("placeholders.categoryIcon")}
            </button>

            {newIcon && (
              <div className="mt-2 flex justify-center">
                <Image
                  src={newIcon}
                  alt="Preview"
                  width={60}
                  height={60}
                  className="rounded object-contain"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleAddCategory}
            className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition"
          >
            {t("actions.save")}
          </button>
        </div>
      </div>

      {/* عرض الكاتيجوريز */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-5 rounded-xl shadow-sm flex flex-col items-center text-center"
          >
            <Image
              src={category.icon}
              alt={category.name}
              width={80}
              height={80}
              className="w-20 h-20 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
            <div className="mt-2 space-x-4 rtl:space-x-reverse">
              <button className="text-blue-700 text-sm hover:underline">
                {t("actions.edit")}
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-red-700 text-sm hover:underline"
              >
                {t("actions.delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
