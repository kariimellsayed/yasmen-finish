"use client";

import React, { useState } from "react";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Product } from "@/types/product";
import { storage } from "@/lib/storage";
import { useAppContext } from "@/app/Context/AppContext";
import { useRouter } from "next/navigation";

// export type Product = {
//   id: number;
//   name: string;
//   description: string;
//   newPrice: number;
//   oldPrice: number;
//   rating: number;
//   brandId: number;
//   brandName: string;
//   applicationUserId: string;
//   userName: string;
//   productImages: string[];
// };

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const locale = useLocale();
  const t = useTranslations("Landing");
  const { addToCart } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(product.rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const handleAddToCart = async (productId: number) => {
    const token = storage.getToken();

    if (!token) {
      alert("You must be logged in to add products to your cart.");
      return;
    }

    try {
      setLoading(true);
      await addToCart(productId, 1, "Red", "Medium");
      alert("Product added to your cart successfully! ✅");
      router.push("/auth/login");
    } catch {
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden relative group bg-white p-3 rounded-xl shadow hover:shadow-md transition">
      {/* Sale Badge */}
      {/* {isOnSale && (
          <span className="absolute top-2 left-2 z-40 bg-[#FE93B9] text-white font-medium px-3 py-1 rounded-tr-[10px] rounded-bl-[10px] text-sm shadow">
            {t("sale") || "Sale"}
          </span>
        )} */}

      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4">
        <Image
          src={
            product.productImages && product.productImages[0]
              ? product.productImages[0]
              : "/images/placeholder.png"
          }
          alt={product.name}
          fill
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover View Details Button */}
        <Link
          href={`/${locale}/products/${product.id}`}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"
        >
          <span className="text-white bg-[#FE93B9] px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            {t("viewDetails") || "View Details"}
          </span>
        </Link>
      </div>

      {/* Product Info */}
      <button className="flex items-center gap-2 text-pink-400 text-sm mb-3 hover:text-pink-500 transition-colors">
        <Heart className="w-4 h-4" />
        {t("wishlist") || "Add to Wishlist"}
      </button>

      <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex">{renderStars()}</div>
        <span className="text-sm text-gray-500">{product.rating}</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-400 line-through text-sm">
          {product.oldPrice} EGP
        </span>

        <span className="text-lg font-semibold text-gray-900">
          {product.newPrice} EGP
        </span>
      </div>

      {/* Color Options */}
      <div className="flex gap-2 mb-6">
        {/* {colors.map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))} */}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => handleAddToCart(product.id)}
        className="w-full bg-[#FE93B9] text-[#393939] font-medium py-3 rounded-full cursor-pointer hover:bg-[#f2789d] transition-colors"
      >
        {/* {t("addToCart") || "ADD TO CART"}  */}
        {loading ? "Loading..." : t("addToCart")}
      </button>
    </div>
  );
};

export default ProductCard;
