"use client";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  const categories = [
    { id: 1, title: "Lips", image: "/lips.svg" },
    { id: 2, title: "Eye", image: "/eyeC.svg" },
    { id: 3, title: "Face", image: "/face.svg" },
    { id: 4, title: "Body", image: "/body.svg" },
    { id: 5, title: "Perfume", image: "/perfume.svg" },
  ];

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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((ele, idx) => {
              const isLastOdd =
                categories.length % 2 !== 0 && idx === categories.length - 1;

              return (
                <div
                  key={ele.id}
                  className={`flex flex-col items-center space-y-2 ${
                    isLastOdd
                      ? "col-span-2 mx-auto sm:col-span-1 sm:mx-0"
                      : ""
                  }`}
                >
                  <Image
                    src={ele.image}
                    width={96}
                    height={96}
                    loading="lazy"
                    alt={ele.title}
                    className="w-24 h-24 object-contain"
                  />
                  <h3 className="text-center text-[#393939] text-base sm:text-lg font-semibold">
                    {ele.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    </section>
  );
}
