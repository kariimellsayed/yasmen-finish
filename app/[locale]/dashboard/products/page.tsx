"use client";
import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
import { useTranslations } from "next-intl";
import { fetchProducts } from "@/api/products";
import { Product } from "@/types/product";
import { fetchCategories } from "@/api/categories";
import { Category } from "@/types/category";

// Add Product
interface AddProduct {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  description: string;
  rating: number;
}

export default function Products() {
  const t = useTranslations("products");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategroies] = useState<Category[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [newProduct, setNewProduct] = useState<AddProduct>({
    id: 0,
    name: "",
    oldPrice: 0,
    newPrice: 0,
    description: "",
    rating: 0,
  });

  // const [editMode, setEditMode] = useState<boolean>(false);
  // const [imagePreview, setImagePreview] = useState<string>("");

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImagePreview(e.target?.result as string);
  //       setNewProduct({ ...newProduct, image: e.target?.result as string });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleAddOrUpdateProduct = () => {
  //   if (!newProduct.name || !newProduct.description || !newProduct.oldPrice)
  //     return alert(t("fill_all_fields"));

  //   const productToHandle = {
  //     ...newProduct,
  //     // colors: newProduct.colors.filter(Boolean),
  //     // sizes: newProduct.sizes.filter(Boolean),
  //   };

  //   if (editMode) {
  //     setProducts((prev) =>
  //       prev.map((p) => (p.id === newProduct.id ? productToHandle : p))
  //     );
  //   } else {
  //     setProducts([...products, { ...productToHandle, id: Date.now() }]);
  //   }

  //   setNewProduct({
  //     id: 0,
  //     name: "",
  //     price: "",
  //     image: "",
  //     description: "",
  //     stock: 0,
  //     colors: [],
  //     sizes: [],
  //     categoryId: 0,
  //   });
  //   setEditMode(false);
  //   setImagePreview("");
  // };

  // const handleEditProduct = (product: Product) => {
  //   setNewProduct(product);
  //   setEditMode(true);
  //   setImagePreview(product.image);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  // Products
  const getProducts = async (categoryId: number = 0) => {
    setLoading(true);
    try {
      const data = await fetchProducts(categoryId);
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Categroies
  const getAllCategries = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategroies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    getAllCategries();
  }, []);

  return (
    <section className="bg-white min-h-screen p-6 text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {t("products_title")}
      </h1>

      {/* إضافة أو تعديل منتج */}
      <div className="bg-gray-50 p-4 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {/* {editMode ? t("edit_product") : t("add_product")} */}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t("product_name")}
            className="border p-2 rounded"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder={t("product_price")}
            className="border p-2 rounded"
            // value={newProduct.price}
            // onChange={(e) =>
            //   setNewProduct({ ...newProduct, price: e.target.value })
            // }
          />
          {/* اختيار التصنيف */}
          <select
            className="border p-2 rounded"
            // value={newProduct.categoryId || ""}
            // onChange={(e) =>
            //   setNewProduct({
            //     ...newProduct,
            //     categoryId: Number(e.target.value),
            //   })
            // }
          >
            <option value="">اختر التصنيف</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* رفع الصورة */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              {t("upload_image")}
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              // onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
            >
              {/* {imagePreview ? (
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
              )} */}
            </button>
          </div>

          <input
            type="text"
            placeholder={t("description")}
            className="border p-2 rounded"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder={t("stock")}
            className="border p-2 rounded"
            // value={newProduct.stock}
            // onChange={(e) =>
            //   setNewProduct({
            //     ...newProduct,
            //     stock: parseInt(e.target.value) || 0,
            //   })
            // }
          />
          <input
            type="text"
            placeholder={t("colors")}
            className="border p-2 rounded"
            // value={newProduct.colors.join(",")}
            // onChange={(e) =>
            //   setNewProduct({
            //     ...newProduct,
            //     colors: e.target.value.split(",").map((c) => c.trim()),
            //   })
            // }
          />
          <input
            type="text"
            placeholder={t("sizes")}
            className="border p-2 rounded"
            // value={newProduct.sizes.join(",")}
            // onChange={(e) =>
            //   setNewProduct({
            //     ...newProduct,
            //     sizes: e.target.value.split(",").map((s) => s.trim()),
            //   })
            // }
          />
        </div>

        <button
          // onClick={handleAddOrUpdateProduct}
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          {/* {editMode ? t("update_product") : t("add_product")} */}
        </button>
      </div>

      {/* عرض المنتجات */}

      {loading ? (
        <div className="w-full flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-4"
            >
              {/* <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-contain rounded-md mb-3"
            /> */}
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700 line-through">{product.oldPrice}</p>
              <p className="text-gray-800 mt-2">{product.newPrice}</p>
              {/* <p className="text-sm text-gray-600 mt-1">
              {t("available_stock")}: {product.stock}
            </p> */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="text-blue-600 hover:underline"
                >
                  {t("details")}
                </button>
                {/* <button
                onClick={() => handleEditProduct(product)}
                className="text-green-600 hover:underline"
              >
                {t("edit")}
              </button> */}
              </div>
            </div>
          ))}
        </div>
      )}

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
            {/* <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={400}
              height={300}
              className="w-full h-56 object-contain rounded mb-4"
            /> */}
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
            <div className="flex items-center gap-4">
              <p className="text-gray-700 line-through text-lg mb-2">
                {selectedProduct.oldPrice}
              </p>
              <p className="text-red-500 text-lg mb-2">
                {selectedProduct.newPrice}
              </p>
            </div>
            {/* <p className="text-gray-800 mb-1">
              {t("available_stock")}: {selectedProduct.stock}
            </p> */}
            {/* عرض اسم التصنيف */}
            <p className="text-gray-700 mb-1">
              التصنيف:{" "}
              {categories.find((c) => c.id === selectedProduct.brandId)?.name ||
                "غير محدد"}
            </p>

            <div className="mb-2">
              <p className="font-semibold">{t("colors")}</p>
              {/* <div className="flex flex-wrap gap-2 mt-1">
                {selectedProduct.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 px-2 py-1 text-xs rounded"
                  >
                    {color}
                  </span>
                ))}
              </div> */}
            </div>

            <div>
              <p className="font-semibold">{t("sizes")}</p>
              {/* <div className="flex flex-wrap gap-2 mt-1">
                {selectedProduct.sizes.map((size, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 px-2 py-1 text-xs border rounded"
                  >
                    {size}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
