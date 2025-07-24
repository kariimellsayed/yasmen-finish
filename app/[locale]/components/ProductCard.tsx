"use client";

import React from "react";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type ProductCardProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  colors: string[];
  isOnSale?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  colors,
  isOnSale,
}) => {
  const locale = useLocale();
  const t = useTranslations("Landing");

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

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

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="overflow-hidden relative group bg-white p-3 rounded-xl shadow hover:shadow-md transition">
      {/* Sale Badge */}
      {isOnSale && (
        <span className="absolute top-2 left-2 z-40 bg-[#FE93B9] text-white font-medium px-3 py-1 rounded-tr-[10px] rounded-bl-[10px] text-sm shadow">
          {t("sale") || "Sale"}
        </span>
      )}

      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover View Details Button */}
        <Link
          href={`/${locale}/products/${id}`}
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

      <h3 className="font-medium text-gray-900 mb-2">{name}</h3>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex">{renderStars()}</div>
        <span className="text-sm text-gray-500">({reviewCount})</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mb-4">
        {originalPrice && (
          <span className="text-gray-400 line-through text-sm">
            {originalPrice},00 EGP
          </span>
        )}
        <span className="text-lg font-semibold text-gray-900">
          {price},00 EGP
        </span>
      </div>

      {/* Color Options */}
      <div className="flex gap-2 mb-6">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Add to Cart Button */}
      <button
        className="w-full bg-[#FE93B9] text-[#393939] font-medium py-3 rounded-full cursor-pointer hover:bg-[#f2789d] transition-colors
      cursor-pointer"
      >
        {t("addToCart") || "ADD TO CART"}
      </button>
    </div>
  );
};

export default ProductCard;
