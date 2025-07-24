"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
// import { Heart, Star } from "lucide-react";
// import Link from "next/link";
import { useTranslations } from "next-intl";
import { Category } from "@/types/category";
import { fetchCategories } from "@/api/categories";
import { fetchProducts } from "@/api/products";
import { Product } from "@/types/product";
import { Heart, Star } from "lucide-react";
import Link from "next/link";

// Props interface

// interface CategoriesProps {
//   search: string;
//   category: string;
// }

// { search, category }: CategoriesProps

export default function Categories() {
  const t = useTranslations("ContactPage.form");
  const tProd = useTranslations("ProductPage");

  const [selected, setSelected] = useState<number>(0);
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  // const [visibleCount, setVisibleCount] = useState<number>(8);
  // const loaderRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // const [cart, setCart] = useState<Cart>({});

  // const categories: Category[] = [
  //   { id: 0, title: t("viewAll") },
  //   { id: 1, title: "Lips", image: "/lips.svg" },
  //   { id: 2, title: "Eye", image: "/eyeC.svg" },
  //   { id: 3, title: "Face", image: "/face.svg" },
  //   { id: 4, title: "Body", image: "/body.svg" },
  //   { id: 5, title: "Perfume", image: "/perfume.svg" },
  // ];

  // const allProducts: Product[] = [
  //   {
  //     id: 1,
  //     name: "Lip Gloss – Dusty Pink",
  //     image: "/images/test.png",
  //     price: 350,
  //     originalPrice: 450,
  //     rating: 4.5,
  //     reviewCount: 121,
  //     colors: ["#8B4B6B"],
  //     isOnSale: true,
  //     category: 1,
  //     stock: 5,
  //   },
  //   {
  //     id: 2,
  //     name: "Mascara – Black",
  //     image: "/images/test.png",
  //     price: 220,
  //     rating: 4.2,
  //     reviewCount: 80,
  //     colors: ["#000"],
  //     category: 2,
  //     stock: 4,
  //   },
  //   {
  //     id: 3,
  //     name: "Foundation – Light",
  //     image: "/images/test.png",
  //     price: 400,
  //     rating: 4.7,
  //     reviewCount: 60,
  //     colors: ["#F5E1DA"],
  //     category: 3,
  //     stock: 3,
  //   },
  //   {
  //     id: 4,
  //     name: "Body Lotion",
  //     image: "/images/test.png",
  //     price: 180,
  //     rating: 4.1,
  //     reviewCount: 40,
  //     colors: ["#FFF0F5"],
  //     category: 4,
  //     stock: 6,
  //   },
  //   {
  //     id: 5,
  //     name: "Perfume X",
  //     image: "/images/test.png",
  //     price: 600,
  //     rating: 4.8,
  //     reviewCount: 150,
  //     colors: ["#E8B4B8"],
  //     category: 5,
  //     stock: 2,
  //   },
  //   {
  //     id: 6,
  //     name: "Lip Gloss – Coral",
  //     image: "/images/test.png",
  //     price: 355,
  //     rating: 4.3,
  //     reviewCount: 90,
  //     colors: ["#F88379"],
  //     category: 1,
  //     stock: 5,
  //   },
  //   {
  //     id: 7,
  //     name: "Lip Gloss – Nude",
  //     image: "/images/test.png",
  //     price: 340,
  //     rating: 4.0,
  //     reviewCount: 45,
  //     colors: ["#D2A1A1"],
  //     category: 1,
  //     stock: 4,
  //   },
  //   {
  //     id: 8,
  //     name: "Face Powder",
  //     image: "/images/test.png",
  //     price: 300,
  //     rating: 4.6,
  //     reviewCount: 70,
  //     colors: ["#F0D3C9"],
  //     category: 3,
  //     stock: 7,
  //   },
  //   {
  //     id: 9,
  //     name: "Perfume Y",
  //     image: "/images/test.png",
  //     price: 590,
  //     rating: 4.9,
  //     reviewCount: 165,
  //     colors: ["#FBE4E6"],
  //     category: 5,
  //     stock: 3,
  //   },
  //   {
  //     id: 10,
  //     name: "Body Oil",
  //     image: "/images/test.png",
  //     price: 210,
  //     rating: 4.1,
  //     reviewCount: 35,
  //     colors: ["#FFE4E1"],
  //     category: 4,
  //     stock: 5,
  //   },
  // ];

  // useEffect(() => {
  //   const filtered = allProducts.filter((product) => {
  //     const matchSearch =
  //       search.trim() === "" ||
  //       product.name.toLowerCase().includes(search.toLowerCase());
  //     const matchCategory = selected === 0 || product.category === selected;
  //     return matchSearch && matchCategory;
  //   });
  //   setFilteredProducts(filtered);
  //   setVisibleCount(8);
  // }, [search, selected]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         setVisibleCount((prev) => prev + 4);
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   if (loaderRef.current) observer.observe(loaderRef.current);

  //   return () => {
  //     if (loaderRef.current) observer.unobserve(loaderRef.current);
  //   };
  // }, [filteredProducts]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="w-4 h-4 fill-yellow-400 text-yellow-400 transition-all duration-200"
        />
      );
    }
    if (hasHalf)
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400/50 text-yellow-400 transition-all duration-200"
        />
      );
    while (stars.length < 5) {
      stars.push(
        <Star
          key={`empty-${stars.length}`}
          className="w-4 h-4 text-gray-300 transition-all duration-200"
        />
      );
    }
    return stars;
  };

  // const handleAddToCart = (product: Product) => {

  // };

  // const handleAddToWishlist = (product: Product) => {

  // };

  // Categories
  const getCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories([
        {
          id: 0,
          name: "View All",
          // imageUrl: "/all-products.svg",
        },
        ...data,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getCategories();
    getProducts(selected);
  }, [selected]);

  return (
    <div className="w-full px-4 md:px-10 transition-all duration-300">
      <div className="flex gap-3 flex-wrap py-6 mb-8 justify-center">
        {loading ? (
          <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelected(cat.id);
                getProducts(cat.id);
              }}
              className={`cursor-pointer transition-all duration-200 flex items-center gap-2 px-6 py-3 rounded-xl text-sm md:text-base shadow-sm ${
                selected === cat.id
                  ? "bg-[#FE93B9] text-[#393939] font-semibold shadow-md scale-105"
                  : "border border-[#FE93B9] hover:bg-[#FE93B9]/20 text-[#393939] bg-white hover:shadow-md"
              }`}
            >
              {cat.imageUrl && (
                <Image
                  src={`https://ymstore.runasp.net/Images/${cat.imageUrl}`}
                  alt={cat.name}
                  width={22}
                  height={22}
                />
              )}
              <span>{cat.name}</span>
            </button>
          ))
        )}
      </div>

      {/* <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-6">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            className="overflow-hidden relative transition-all duration-300 group rounded-xl border border-gray-100 shadow-sm hover:shadow-md"
          >
            {product.isOnSale && (
              <span className="absolute top-0 left-0 z-40 bg-[#FE93B9] text-white font-medium px-3 py-1 rounded-l-[12px] rounded-br-[10px] text-xs">
                {t("sale")}
              </span>
            )}
            <div className="relative bg-white rounded-t-xl p-6 h-80 mb-2.5 overflow-hidden">
              <Link href={`/products/${product.id}`} className="block h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="bg-[#FE93B9] text-white font-semibold px-4 py-2 rounded-full shadow">
                    {t("viewDetails")}
                  </span>
                </div>
              </Link>
            </div>
            <div className="px-4 pb-4">
              <button className="flex items-center gap-2 text-pink-400 text-sm mb-3 hover:text-pink-500 transition">
                <Heart className="w-4 h-4" /> {t("wishlist")}
              </button>
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount})
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    {product.originalPrice},00 EGP
                  </span>
                )}
                <span className="text-lg font-semibold text-gray-900">
                  {product.price},00 EGP
                </span>
              </div>
              <div className="flex gap-2 mb-6">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <button
                // onClick={() => handleAddToCart(product)}
                className="w-full bg-[#FE93B9] text-[#393939] font-medium py-3 rounded-full transition hover:bg-[#fe7ca8]"
              >
                {tProd("addToCart")}
              </button>
            </div>
          </div>
        ))}
      </div> */}

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden relative transition-all duration-300 group rounded-xl border border-gray-100 shadow-sm hover:shadow-md"
            >
              {/* Product Image */}
              <div className="relative bg-white rounded-t-xl p-6 h-80 mb-2.5 overflow-hidden">
                <Link href={`/products/${product.id}`} className="block h-full">
                  <div className="relative w-full h-48">
                    <Image
                      src={product.productImages?.[0] || "/images/fallback.png"}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="bg-[#FE93B9] text-white font-semibold px-4 py-2 rounded-full shadow">
                      {t("viewDetails")}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Product Details */}
              <div className="px-4 pb-4">
                <button
                  // onClick={() => handleAddToWishlist(product)}
                  className="flex items-center gap-2 text-pink-400 text-sm mb-3 hover:text-pink-500 transition"
                >
                  <Heart className="w-4 h-4" /> Add to Wishlist
                </button>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-500">
                    {/* ({product.reviewCount || 0}) */}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      {product.oldPrice},00 EGP
                    </span>
                  )}
                  <span className="text-lg font-semibold text-gray-900">
                    {product.newPrice},00 EGP
                  </span>
                </div>
                <button
                  // onClick={() => handleAddToCart(product)}
                  className="w-full bg-[#FE93B9] text-[#393939] font-medium py-3 rounded-full transition hover:bg-[#fe7ca8]
                  cursor-pointer"
                >
                  {tProd("addToCart")}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>

      {/* <div ref={loaderRef} className="h-10"></div> */}
    </div>
  );
}
