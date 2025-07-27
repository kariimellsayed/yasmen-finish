"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from 'next-i18next';


type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
  stock: number;
  colors: string[];
  sizes: string[];
};

export default function Products() {
  const { t } = useTranslation();

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "روج مطفي - لون وردي",
      price: "EGP 120",
      image: "/products/lipstick.jpg",
      description: "روج مطفي يدوم طويلاً بلون وردي جذاب.",
      stock: 10,
      colors: ["وردي", "نبيتي", "أحمر"],
      sizes: ["صغير", "وسط"],
    },
    {
      id: 2,
      name: "باليت ظلال عيون",
      price: "EGP 250",
      image: "/products/eyeshadow.jpg",
      description: "12 لون مختلف لتناسب كل إطلالة.",
      stock: 5,
      colors: ["نود", "ملون"],
      sizes: ["ميني", "ستاندرد"],
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: "",
    image: "",
    description: "",
    stock: 0,
    colors: [],
    sizes: [],
  });
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleAddOrUpdateProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image)
      return alert(t("fill_all_fields"));

    const productToHandle = {
      ...newProduct,
      colors: newProduct.colors.filter(Boolean),
      sizes: newProduct.sizes.filter(Boolean),
    };

    if (editMode) {
      setProducts((prev) =>
        prev.map((p) => (p.id === newProduct.id ? productToHandle : p))
      );
    } else {
      setProducts([...products, { ...productToHandle, id: Date.now() }]);
    }

    setNewProduct({
      id: 0,
      name: "",
      price: "",
      image: "",
      description: "",
      stock: 0,
      colors: [],
      sizes: [],
    });
    setEditMode(false);
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-white min-h-screen p-6 text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">{t("products_title")}</h1>

      {/* إضافة أو تعديل منتج */}
      <div className="bg-gray-50 p-4 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editMode ? t("edit_product") : t("add_product")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t("product_name")}
            className="border p-2 rounded"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder={t("product_price")}
            className="border p-2 rounded"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder={t("image_url")}
            className="border p-2 rounded"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <input
            type="text"
            placeholder={t("description")}
            className="border p-2 rounded"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder={t("stock")}
            className="border p-2 rounded"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
          />
          <input
            type="text"
            placeholder={t("colors")}
            className="border p-2 rounded"
            value={newProduct.colors.join(",")}
            onChange={(e) =>
              setNewProduct({ ...newProduct, colors: e.target.value.split(",").map((c) => c.trim()) })
            }
          />
          <input
            type="text"
            placeholder={t("sizes")}
            className="border p-2 rounded"
            value={newProduct.sizes.join(",")}
            onChange={(e) =>
              setNewProduct({ ...newProduct, sizes: e.target.value.split(",").map((s) => s.trim()) })
            }
          />
        </div>

        <button
          onClick={handleAddOrUpdateProduct}
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          {editMode ? t("update_product") : t("add_product")}
        </button>
      </div>

      {/* عرض المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-4"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-contain rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-800">{product.price}</p>
            <p className="text-sm text-gray-600 mt-1">{t("available_stock")}: {product.stock}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedProduct(product)}
                className="text-blue-600 hover:underline"
              >
                {t("details")}
              </button>
              <button
                onClick={() => handleEditProduct(product)}
                className="text-green-600 hover:underline"
              >
                {t("edit")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* نافذة التفاصيل */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
            >
              &times;
            </button>
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={400}
              height={300}
              className="w-full h-56 object-contain rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
            <p className="text-pink-600 font-bold text-lg mb-2">{selectedProduct.price}</p>
            <p className="text-gray-800 mb-1">{t("available_stock")}: {selectedProduct.stock}</p>

            <div className="mb-2">
              <p className="font-semibold">{t("colors")}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedProduct.colors.map((color, idx) => (
                  <span key={idx} className="bg-gray-200 px-2 py-1 text-xs rounded">
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold">{t("sizes")}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedProduct.sizes.map((size, idx) => (
                  <span key={idx} className="bg-gray-100 px-2 py-1 text-xs border rounded">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
