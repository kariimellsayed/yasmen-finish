"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

export default function Products() {
  const t = useTranslations("dashboard");

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: "",
    image: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ id: 0, name: "", price: "", image: "" });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800">{t("navContent.productsContent")}</h1>

      <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
        <input
          type="text"
          placeholder="اسم المنتج"
          className="border p-2 rounded w-full text-gray-800"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="السعر"
          className="border p-2 rounded w-full text-gray-800"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="رابط الصورة"
          className="border p-2 rounded w-full text-gray-800"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button
          onClick={handleAddProduct}
          className="bg-[#9A3E63] text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          {t("addProduct")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded-xl p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-gray-800">{product.price}</p>
            <button
              className="text-red-600 text-sm mt-2 hover:underline"
              onClick={() => handleDelete(product.id)}
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
