import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Help",
  description: ""
};

export default function Help(){
    const t = useTranslations("Activity")
    
    return (
        <section className="py-16">
            <div className="custom__container">


                <div className="flex items-center gap-2 mb-8 text-[#393939] text-sm md:text-base">
                    <Link href="/" className="text-[#868686] hover:underline transition-all">
                      {t("links.Home")}
                    </Link>
                    <Image 
                    src="/arrow-right.svg" 
                    alt="Arrow Right" 
                    width={20} 
                    height={20} 
                    />
                    <span className="font-semibold text-[#393939]">{t("links.Help")}</span>
                  </div>  
                <h1>Help Page</h1>
            </div>
        </section>
    )
}