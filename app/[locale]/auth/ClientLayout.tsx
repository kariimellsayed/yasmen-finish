"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const locale = useLocale();

  return (
    <section className="py-16">
      <div className="custom__container">
        <div className="flex items-center gap-2 mb-8 text-[#393939] lg:text-lg mr-auto md:pl-9 text-sm">
          <Link href={"/"} className="text-[#868686]">
            Home
          </Link>
          <Image
            src={"/arrow-right.svg"}
            alt="Arrow Right"
            width={24}
            height={24}
          />
          <div className="font-semibold">Account</div>
        </div>

        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 px-4 max-[575px]:min-h-auto max-[575px]:py-12">
          <div className="w-3/5 space-y-8 max-[767px]:w-full">
            {/* Navigation buttons */}
            <div className="flex justify-between">
              <Link href="/auth/login">
                <button
                  className={`px-6 py-2 rounded-[10px] w-52 max-[767px]:w-[140px] cursor-pointer ${
                    pathName === `/${locale}/auth/login`
                      ? "bg-[#FE93B9] text-[#393939] shadow-md"
                      : "border border-pink-400 text-pink-400 bg-[#F8F8F8]"
                  }`}
                >
                  Login
                </button>
              </Link>

              <Link href="/auth/signup">
                <button
                  className={`px-6 py-2 rounded-[10px] w-52 max-[767px]:w-[140px] cursor-pointer ${
                    pathName === `/${locale}/auth/signup`
                      ? "bg-[#FE93B9] text-[#393939] shadow-md"
                      : "border border-pink-400 text-pink-400 bg-[#F8F8F8]"
                  }`}
                >
                  Sign Up
                </button>
              </Link>
            </div>

            {/* Page Content */}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
