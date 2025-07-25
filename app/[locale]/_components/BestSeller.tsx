"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { fetchProducts } from "@/api/products";
import ProductCard from "./ProductCard";

// type BestSellerProps = {
//   value: string;
// };

export default function BestSeller() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const t = useTranslations("Landing");

  // getAllProducts
  const getAllProducts = async (categoryId: number = 0) => {
    setLoading(true);
    try {
      const data = await fetchProducts(categoryId);
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const allProducts = [
  //   {
  //     id: "1",
  //     name: "Lip Gloss - Dusty Pink",
  //     image: "/images/test.png",
  //     price: 350,
  //     originalPrice: 450,
  //     rating: 4.5,
  //     reviewCount: 121,
  //     colors: ["#8B4B6B", "#D2847A", "#E8B4B8"],
  //     isOnSale: true,
  //   },
  //   {
  //     id: "2",
  //     name: "Lip Gloss - Dusty Pink",
  //     image: "/images/test.png",
  //     price: 350,
  //     rating: 4.0,
  //     reviewCount: 121,
  //     colors: ["#8B4B6B", "#D2847A", "#E8B4B8"],
  //   },
  //   {
  //     id: "3",
  //     name: "Lip Gloss - Dusty Pink",
  //     image: "/images/test.png",
  //     price: 350,
  //     rating: 4.2,
  //     reviewCount: 121,
  //     colors: ["#8B4B6B", "#D2847A", "#E8B4B8"],
  //   },
  //   {
  //     id: "4",
  //     name: "Lip Gloss - Dusty Pink",
  //     image: "/images/test.png",
  //     price: 350,
  //     originalPrice: 450,
  //     rating: 4.8,
  //     reviewCount: 121,
  //     colors: ["#8B4B6B", "#D2847A", "#E8B4B8"],
  //     isOnSale: true,
  //   },
  //   {
  //     id: "5",
  //     name: "Lip Gloss - Coral",
  //     image: "/images/test.png",
  //     price: 360,
  //     rating: 4.1,
  //     reviewCount: 80,
  //     colors: ["#F88379", "#FFD6D6", "#E8B4B8"],
  //   },
  //   {
  //     id: "6",
  //     name: "Lip Gloss - Nude",
  //     image: "/images/test.png",
  //     price: 340,
  //     rating: 4.3,
  //     reviewCount: 95,
  //     colors: ["#C2B280", "#E8B4B8", "#D2847A"],
  //   },
  //   {
  //     id: "7",
  //     name: "Lip Gloss - Red",
  //     image: "/images/test.png",
  //     price: 370,
  //     rating: 4.7,
  //     reviewCount: 110,
  //     colors: ["#D7263D", "#8B4B6B", "#FFD6D6"],
  //   },
  //   {
  //     id: "8",
  //     name: "Lip Gloss - Peach",
  //     image: "/images/test.png",
  //     price: 355,
  //     rating: 4.4,
  //     reviewCount: 100,
  //     colors: ["#FFDAB9", "#E8B4B8", "#F88379"],
  //   },
  // ];

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="py-20 pt-14">
      <div className="custom__container max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            {t("bestSeller")}
          </h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 12).map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
        */
        {/* {/* {visibleProducts < allProducts.length && (
          <p className="text-center mt-8 text-sm text-gray-500 animate-pulse">
            {t("loadingMore")}
          </p>
        )} */}
      </div>
    </section>
  );
}
