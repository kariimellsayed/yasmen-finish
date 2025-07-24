"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl"; // دعم اللغات

type CartProduct = {
  id: number;
  image?: string;
  title: string;
  size?: string;
  color?: string;
  price: number;
  quantity?: number;
};

type ResultCartProps = {
  cartProducts: CartProduct[];
};

export default function ResultCart({ cartProducts }: ResultCartProps) {
  const [carts, setCarts] = useState<CartProduct[]>([]);
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("CartPage")



  const init = useMemo(() => {
    if (Array.isArray(cartProducts)) {
      return cartProducts.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));
    }
    return [];
  }, [cartProducts]);

  useEffect(() => {
    setCarts(init);
  }, [init]);

  const subTotal = carts.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0);
  const discount = subTotal * 0.2;
  const deliveryFee = 60;
  const total = subTotal - discount + deliveryFee;

  return (
    <div className={`flex flex-col lg:flex-row gap-14 items-center ${isAr ? "rtl" : "ltr"}`}> 
      {/* Cart Products */}
      <div className="w-full lg:w-1/2 border border-gray-200 rounded-2xl p-4 transition-all duration-300">
        {carts.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`relative flex items-start gap-3 mb-5 pb-5 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 rounded-xl p-3 transition-all duration-300 
              `}
          >
            <button className="absolute top-3.5 right-3.5 cursor-pointer hover:scale-105 transition-transform">
              <svg width="24" height="24" fill="none">
                <path
                  fill="#FF3B30"
                  d="M20.25 4.5H16.5V3.75A2.25 2.25 0 0 0 14.25 1.5H9.75A2.25 2.25 0 0 0 7.5 3.75V4.5H3.75A.75.75 0 0 0 3 5.25c0 .198.079.39.22.53A.75.75 0 0 0 3.75 6H4.5v13.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V6h.75a.75.75 0 0 0 0-1.5ZM10.5 15.75a.75.75 0 1 1-1.5 0V9.75a.75.75 0 1 1 1.5 0v6ZM15 15.75a.75.75 0 1 1-1.5 0V9.75a.75.75 0 1 1 1.5 0v6ZM9 3.75c0-.198.079-.39.22-.53A.75.75 0 0 1 9.75 3h4.5a.75.75 0 0 1 .53 1.28.75.75 0 0 1-.53.22H9V3.75Z"
                />
              </svg>
            </button>

            <Image
              src={item.image || "/images/product_1.png"}
              alt={item.title}
              width={85}
              height={85}
              className="rounded-lg hover:scale-105 transition-transform"
              loading="lazy"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500">
                <span className="text-gray-800">{t("size")}</span> {item.size}
              </p>
              <p className="text-sm text-gray-500">
                <span className="text-gray-800">{t("color")}</span> {item.color}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-2xl text-gray-800 font-medium">{item.price} EGP</p>
                <div className="bg-gray-200 w-28 h-10 rounded-full px-5 flex items-center justify-between text-xl">
                  <button className="text-black hover:text-[#f786ad]"
                    onClick={() => setCarts((prev) =>
                      prev.map((ele) =>
                        ele.id === item.id
                          ? { ...ele, quantity: Math.max(1, (ele.quantity ?? 1) - 1) }
                          : ele
                      )
                    )}
                  >
                    -
                  </button>
                  <span className="text-black">{item.quantity ?? 1}</span>
                  <button className="text-black hover:text-[#f786ad]"
                    onClick={() => setCarts((prev) =>
                      prev.map((ele) =>
                        ele.id === item.id
                          ? { ...ele, quantity: (ele.quantity ?? 1) + 1 }
                          : ele
                      )
                    )}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-1/2 border border-gray-200 rounded-2xl p-4 transition-all duration-300 hover:shadow-md">
        <h3 className="text-2xl text-gray-800 font-semibold mb-3">
          {t("orderSummary")}
        </h3>
        <ul className="mb-4">
          <li className="flex justify-between items-center text-lg text-gray-500 mb-2 pb-2 border-b border-gray-100">
            <span>{t("subtotal")}</span>
            <span className="text-gray-800">{subTotal} EGP</span>
          </li>
          <li className="flex justify-between items-center text-lg text-gray-500 mb-2 pb-2 border-b border-gray-100">
            <span>{t("discount")}</span>
            <span className="text-red-500">{discount} EGP</span>
          </li>
          <li className="flex justify-between items-center text-lg text-gray-500 mb-2 pb-2 border-b border-gray-100">
            <span>{t("deliveryFee")}</span>
            <span className="text-gray-800">{deliveryFee} EGP</span>
          </li>
        </ul>

        <div className="flex justify-between items-center text-xl text-gray-800 font-bold mb-5">
          <span>{t("total")}</span>
          <span>{total} EGP</span>
        </div>

        <div className="flex items-center mb-5 gap-2">
          <input
            type="text"
            name="discount"
            placeholder={t("promoPlaceholder")}
            className={`flex-1 bg-gray-200 placeholder:text-gray-400 p-2 rounded-full outline-none ${locale === "ar" ? "text-right" : "text-left"} `}
          />
          <button className="bg-[#FE93B9] hover:bg-[#f98ab1] text-white rounded-full px-4 py-2 h-12">
            {t("apply")}
          </button>
        </div>

        <Link href="/cart/checkout">
          <button className="w-full bg-[#FE93B9] hover:bg-[#f98ab1] text-white rounded-full h-16 text-lg font-medium flex items-center justify-center gap-3.5 transition-all">
            {t("checkout")}
          </button>
        </Link>
      </div>
    </div>
  );
}
