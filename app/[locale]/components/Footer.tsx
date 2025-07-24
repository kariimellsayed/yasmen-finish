import Link from "next/link";
import Image from 'next/image'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";

export default  function Footer() {
    const t = useTranslations("Footer");
    const locale = useLocale();
    return (
        <footer className="bg-[#FE93B9] py-16" dir={locale === "en" ? "ltr" : "rtl"}  >
            <div className="custom__container">
                <div className="flex items-end  justify-between max-[992px]:flex-col max-[992px]:items-center gap-4 pb-7 border-b-2 border-white">
                    <div className="w-[47%] mb-20 max-[992px]:w-full">
                        <Image 
                        src="/logo.svg"
                        alt="logo" 
                        loading="lazy"
                        className="mb-4 max-[992px]:m-auto"
                        width={220}
                        height={220}
                        />

                        <p className="text-[#393939] max-[992px]:text-center">
                            {t("description")}
                        </p>
                    </div>
                    <div className="w-[47%] grid grid-cols-3 gap-6 max-[992px]:grid-cols-1 max-[992px]:w-full" >
                        <div  className="max-[992px]:text-center">
                        <h3 className="relative custom__border text-[#393939] font-bold mb-5 pl-2.5 max-[992px]:w-fit max-[992px]:mx-auto">{t("shop")}</h3>
                        <ul>
                            <li><Link  className="text-[#393939] block pb-2.5" href={""}>{t("eye")}</Link></li>
                            <li><Link  className="text-[#393939] block pb-2.5" href={""}>{t("face")}</Link></li>
                            <li><Link  className="text-[#393939] block pb-2.5" href={""}>{t("body")}</Link></li>
                            <li><Link  className="text-[#393939] block pb-2.5" href={""}>{("lips")}</Link></li>
                            <li><Link  className="text-[#393939] block pb-2.5" href={""}>{t("perfume")}</Link></li>
                        </ul>
                    </div>
                    <div className="max-[992px]:text-center">
                        <h3 className="relative custom__border text-[#393939] font-bold mb-5 pl-2.5 max-[992px]:w-fit max-[992px]:mx-auto">{t("customerService")}</h3>
                        <ul>
                            <li><Link  className="text-[#393939] block pb-2.5" href={""}>{t("about")}</Link></li>
                            <li><Link  className="text-[#393939] block pb-2.5" href={""}>{t("contact")}</Link></li>
                            <li><Link  className="text-[#393939] block pb-2.5" href={""}>{("privacyPolicy")}</Link></li>
                            <li><Link  className="text-[#393939] block pb-2.5" href={""}>{t("refundPolicy")}</Link></li>
                            <li><Link  className="text-[#393939] block pb-2.5" href={""}>{t("shippingPolicy")}</Link></li>
                        </ul>
                    </div>
                    <div className="max-[992px]:text-center">
                        <h3 className="relative custom__border text-[#393939] font-bold mb-5 pl-2.5 max-[992px]:w-fit max-[992px]:mx-auto">{t("followUs")}</h3>
                        <ul>
                            <li><Link className="text-[#393939] block pb-2.5"  href={""}>{t("viewTrends")}</Link></li>
                            <ul className="flex items-center gap-3 max-[992px]:w-fit max-[992px]:m-auto">
                               <li className="w-7 h-7 cursor-pointer  rounded-full bg-white flex justify-center items-center"><FaFacebookF /></li> 
                               <li className="w-7 h-7 cursor-pointer  rounded-full bg-white flex justify-center items-center"><FaInstagram /></li> 
                            </ul>
                        </ul>
                    </div>
                    </div>
                </div>

                <div className="flex justify-between items-center py-4 text-[#393939]"><p>&copy; {t("copyright")}</p> <a href="#">{t("privacyPolicy")}</a></div>
            </div> 
        </footer>
    )
}