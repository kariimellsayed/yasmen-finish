"use client";
import { fetchCategories } from "@/api/categories";
import { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BASE_URL = "https://ymstore.runasp.net/Images/";

export default function Landing() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // GetAllCategories
  const getAllCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <section className="landing">
      <Image
        src={"/landing.svg"}
        width={1920}
        height={1080}
        loading="lazy"
        alt="Landing Image"
        className="w-full h-[541px] min-[1440px]:h-full object-cover max-[475px]:h-[315px]"
      />
      <div className="py-20">
        <div className="custom__container">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[#393939] font-semibold text-3xl max-[475px]:text-2xl">
              Top Categories
            </h3>
            <Link
              href="/products"
              className="block border-[#868686] border-b-[1px] w-fit ml-auto text-[15px] font-bold text-[#868686]"
            >
              Shop all products
            </Link>
          </div>

          {loading ? (
            // 🔥 Spinner Loading
            <div className="flex justify-center items-center py-10">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-[#FE93B9] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((cat) => {
                const isLastOdd =
                  categories.length % 2 !== 0 &&
                  cat.id === categories.length - 1;

                return (
                  <div
                    key={cat.id}
                    className={`flex flex-col items-center space-y-2 ${
                      isLastOdd
                        ? "col-span-2 mx-auto sm:col-span-1 sm:mx-0"
                        : ""
                    }`}
                  >
                    <Image
                      src={
                        cat.imageUrl
                          ? `${BASE_URL}${cat.imageUrl}`
                          : "/images/placeholder.png"
                      }
                      width={96}
                      height={96}
                      loading="lazy"
                      alt={cat.name}
                      className="w-24 h-24 object-contain"
                    />
                    <h3 className="text-center text-[#393939] text-base sm:text-lg font-semibold">
                      {cat.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
