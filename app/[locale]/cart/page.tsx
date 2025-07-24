"use client";

import Image from "next/image";
import Link from "next/link";
import ResultCart from "../components/ResultCart";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

type Product = {
  id: number;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
};

type CartProps = {
  Products: Product[];
};

const cartProducts: Product[] = [
  {
    id: 1,
    title: "Lip gloss",
    size: "Large",
    color: "white",
    price: 320.0,
    quantity: 1,
  },
  {
    id: 2,
    title: "Lip gloss",
    size: "Medium",
    color: "Red",
    price: 320.0,
    quantity: 1,
  },
  {
    id: 3,
    title: "Lip gloss",
    size: "Large",
    color: "Blue",
    price: 320.0,
    quantity: 1,
  },
];

export default function Cart() {
  const locale = useLocale();
  const t = useTranslations("CartPage");

  return (
    <motion.section
      className="py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      dir={locale === "ar" ? "rtl":"ltr"}
    >
      <div className="custom__container">
        <motion.div
          className="flex items-center gap-2 mb-8 text-[#393939] lg:text-lg mr-auto md:pl-9 text-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href={`/${locale}`} className="text-[#868686]">
            {t("home") || "home"}
          </Link>
          <Image
            src={"/arrow-right.svg"}
            alt="Arrow Right"
            width={24}
            height={24}
          />
          <div className="font-semibold">{t("title") || "Cart"}</div>
        </motion.div>

        <ResultCart cartProducts={cartProducts} />
      </div>
    </motion.section>
  );
}
