"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";


type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
  stock: number;
  colors: string[];
  sizes: string[];
  categoryId: number; // أضفت هذا السطر
};

// قائمة التصنيفات (يمكن لاحقاً جلبها من API أو Context)
const categories = [
  { id: 1, name: "أحمر شفاه", icon: "/categories/lipstick.png" },
  { id: 2, name: "كحل", icon: "/categories/kohl.png" },
  { id: 3, name: "فاونديشن", icon: "/categories/foundation.png" },
];

export default function Products() {
  const t = useTranslations("products");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      categoryId: 1, // التصنيف المناسب
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
      categoryId: 2, // التصنيف المناسب
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
    categoryId: 0, // أضفت هذا
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setNewProduct({ ...newProduct, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

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
      categoryId: 0, // أضفت هذا
    });
    setEditMode(false);
    setImagePreview("");
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setEditMode(true);
    setImagePreview(product.image);
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
          {/* اختيار التصنيف */}
          <select
            className="border p-2 rounded"
            value={newProduct.categoryId || ""}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: Number(e.target.value) })}
          >
            <option value="">اختر التصنيف</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          
          {/* رفع الصورة */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">{t("upload_image")}</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
            >
              {imagePreview ? (
                <div className="space-y-2">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={150}
                    className="mx-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600">{t("image_preview")}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-4xl text-gray-400">📷</div>
                  <p className="text-gray-600">{t("choose_file")}</p>
                </div>
              )}
            </button>
          </div>

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
            {/* عرض اسم التصنيف */}
            <p className="text-gray-700 mb-1">التصنيف: {categories.find((c) => c.id === selectedProduct.categoryId)?.name || "غير محدد"}</p>

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
