"use client";
// import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Categories from "../components/Categories";
import { useTranslations } from "next-intl";

export default function ProductsPage() {
  const t = useTranslations("ProductPage");
  const tCommon = useTranslations("Navbar");
  // const searchParams = useSearchParams();
  // const searchKeyword = searchParams.get("search") || "";
  // const category = searchParams.get("category") || "";

  return (
    <section className="py-16">
      <div className="custom__container px-4 md:px-10 transition-all duration-300">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-[#393939] lg:text-lg mr-auto md:pl-9 text-sm transition-all">
          <Link
            href="/"
            className="text-[#868686] hover:text-[#FE93B9] transition-colors duration-200"
          >
            {tCommon("home")}
          </Link>
          <Image
            src="/arrow-right.svg"
            alt="Arrow Right"
            width={24}
            height={24}
          />
          <div className="font-semibold text-[#393939]">{t("title")}</div>
        </div>
        {/* search={searchKeyword} category={category} */}
        {/* Categories + Filtered Products */}
        <Categories />
      </div>
    </section>
  );
}
