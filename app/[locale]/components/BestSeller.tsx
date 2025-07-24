"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

type BestSellerProps = {
  value: string;
};

export default function BestSeller({value = ""} : BestSellerProps) {
  const t = useTranslations("Landing");

  const allProducts = [
    { id: "1", name: "Lip Gloss - Dusty Pink", image: "/images/test.png", price: 350, originalPrice: 450, rating: 4.5, reviewCount: 121, colors: ["#8B4B6B", "#D2847A", "#E8B4B8"], isOnSale: true },
    { id: "2", name: "Lip Gloss - Dusty Pink", image: "/images/test.png", price: 350, rating: 4.0, reviewCount: 121, colors: ["#8B4B6B", "#D2847A", "#E8B4B8"] },
    { id: "3", name: "Lip Gloss - Dusty Pink", image: "/images/test.png", price: 350, rating: 4.2, reviewCount: 121, colors: ["#8B4B6B", "#D2847A", "#E8B4B8"] },
    { id: "4", name: "Lip Gloss - Dusty Pink", image: "/images/test.png", price: 350, originalPrice: 450, rating: 4.8, reviewCount: 121, colors: ["#8B4B6B", "#D2847A", "#E8B4B8"], isOnSale: true },
    { id: "5", name: "Lip Gloss - Coral", image: "/images/test.png", price: 360, rating: 4.1, reviewCount: 80, colors: ["#F88379", "#FFD6D6", "#E8B4B8"] },
    { id: "6", name: "Lip Gloss - Nude", image: "/images/test.png", price: 340, rating: 4.3, reviewCount: 95, colors: ["#C2B280", "#E8B4B8", "#D2847A"] },
    { id: "7", name: "Lip Gloss - Red", image: "/images/test.png", price: 370, rating: 4.7, reviewCount: 110, colors: ["#D7263D", "#8B4B6B", "#FFD6D6"] },
    { id: "8", name: "Lip Gloss - Peach", image: "/images/test.png", price: 355, rating: 4.4, reviewCount: 100, colors: ["#FFDAB9", "#E8B4B8", "#F88379"] }
  ];

  const PRODUCTS_PER_LOAD = 12;
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_LOAD);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (nearBottom && visibleProducts < allProducts.length) {
        setVisibleProducts((prev) => prev + PRODUCTS_PER_LOAD);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleProducts]);

  return (
    <section className="py-20 pt-14">
      <div className="custom__container max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
       <h2 className="text-3xl font-bold text-gray-900">
         {value === "details" ? t("bestSellerDetails") : t("bestSeller")}
       </h2>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.slice(0, visibleProducts).map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard {...product}/>
            </motion.div>
          ))}
        </div>

        {visibleProducts < allProducts.length && (
          <p className="text-center mt-8 text-sm text-gray-500 animate-pulse">
            {t("loadingMore")}
          </p>
        )}
      </div>
    </section>
  );
}
