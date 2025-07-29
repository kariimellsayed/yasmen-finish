"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { fetchCategories } from "@/api/categories";
import { Category } from "@/types/category";
import axiosInstance from "@/lib/axios";

export default function Categories() {
  const t = useTranslations("dashboard");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [newIconFile, setNewIconFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddCategory = () => {
    if (!newName || !newIconFile) {
      alert(t("actions.fillAllFields"));
      return;
    }

    const formData = new FormData();
    formData.append("Name", newName);
    formData.append("Image", newIconFile);

    // Add Category Logic
    setLoading(true);
    axiosInstance
      .post("Brand", formData, {
        headers: {
          "Content-Type": undefined,
        },
      })
      .then(() => {
        alert("Category Added Successfuly");
        getAllCategries();
        setNewName("");
        setNewIcon("");
        setNewIconFile(null);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewIconFile(file); // نخزن الملف نفسه
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setNewIcon(e.target.result as string); // للمعاينة فقط
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    axiosInstance
      .delete(`Brand?Id=${id}`)
      .then(() => {
        alert("This Category has Deteted Successfuly");
        getAllCategries();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // Categories
  const getAllCategries = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategries();
  }, []);

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
              {newIcon
                ? t("actions.changeIcon")
                : t("placeholders.categoryIcon")}
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
            className={`bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition 
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Loading..." : t("actions.save")}
          </button>
        </div>
      </div>

      {/* عرض الكاتيجوريز */}
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-5 rounded-xl shadow-sm flex flex-col items-center text-center"
            >
              <Image
                src={`https://ymstore.runasp.net/Images/${category.imageUrl}`}
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
                  {loading ? "loading..." : t("actions.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
