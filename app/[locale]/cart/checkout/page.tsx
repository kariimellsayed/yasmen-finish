"use client";
import Image from "next/image";
import Link from "next/link";
import CheckoutForms from "../../components/CheckoutForms"
import { useLocale, useTranslations } from "next-intl";




export default function Checkout(params: []) {
  const locale = useLocale()
  const t = useTranslations("CheckoutPage")
    return (
        <section className="py-16">
        <div className="custom__container" dir={locale === "ar" ? "rtl" : "ltr"} >
        <div className='flex items-center gap-2 mb-8 text-[#393939] lg:text-lg mr-auto text-sm'>
         <Link  href={"/"} className='text-[#868686]'>{t("Home")}</Link>
         <Image
         src={"/arrow-right.svg"}
         alt="Arrow Right"
         width={24}
         height={24}
         />
           <div className='font-semibold'>{t("title")}</div>
         </div>
         <h3 className="text-[#393939] font-semibold text-3xl mb-3.5 pb-3.5">{t("title")}</h3>
         <CheckoutForms />
        </div>
        </section>
    )
}