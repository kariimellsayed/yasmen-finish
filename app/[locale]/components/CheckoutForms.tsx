"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { 
    FaInstagram, 
    FaWhatsapp 
} 
    from "react-icons/fa";



export default function CheckoutForms() {
    const loacla =  useLocale();
    const t  = useTranslations("CheckoutPage")
const icons = [
  {
    id: 1,
    link: "#",
    icon: <FaWhatsapp size={25} />,
    text: t("whatsapp")
  },
  {
    id: 2,
    link: "#",
    icon: <FaInstagram size={25} />,
    text: t("instagram")
  }
];


    return (
     <form className="text-center pb-20">
        <div className="pb-20 flex items-start gap-12 flex-col lg:flex-row text-left">
            <div className="lg:w-1/2 w-full">
                <h4 className="text-[20px] font-semibold mb-5 pb-5">{t("billingDetails")}</h4>
                <div className="">
                    <div className="mb-3.5 last:mb-0 flex items-center gap-4 flex-col lg:flex-row">
                        <div className="w-full mb-3.5 lg:mb-0">
                            <label htmlFor="FName" className=" text-lg text-[#393939] block font-medium mb-1.5">{t("firstName")}<span className="text-[#FF3B30] ml-1 text-lg font-semibold">*</span></label>
                            <input type="text" name="fName" id="FName" placeholder={t("firstName")} required
                            className="outline-none w-full bg-white p-3.5 rounded-lg placeholder:text-[#868686]"
                            />
                        </div>
                        <div className="w-full mb-3.5 lg:mb-0">
                            <label htmlFor="LName" className=" text-lg text-[#393939] block font-medium mb-1.5">{t("lastName")}<span className="text-[#FF3B30] ml-1 text-lg font-semibold">*</span></label>
                            <input type="text" name="lName" id="LName" placeholder={t("lastName")} required
                            className="outline-none w-full bg-white p-3.5 rounded-lg placeholder:text-[#868686]"
                            />
                        </div>
                    </div>
                    <div className="mb-3.5 last:mb-0">
                        <label htmlFor="Address" className=" text-lg text-[#393939] block font-medium mb-1.5">{t("address")}<span className="text-[#FF3B30] ml-1 text-lg font-semibold">*</span></label>
                        <input type="text" name="address" id="Address" placeholder={t("address")} required
                        className="outline-none w-full bg-white p-3.5 rounded-lg placeholder:text-[#868686]"
                        />
                    </div>
                    <div className="mb-3.5 last:mb-0">
                        <label htmlFor="Area" className=" text-lg text-[#393939] block font-medium mb-1.5">{t("area")}</label>
                        <input type="text" name="area" id="Area" placeholder={t("area")} required
                        className="outline-none w-full bg-white p-3.5 rounded-lg placeholder:text-[#868686]"
                        />
                    </div>
                    <div className="mb-3.5 last:mb-0 flex items-center gap-4 flex-col lg:flex-row">
                        <div className="w-full mb-3.5 lg:mb-0">
                            <label htmlFor="City" className=" text-lg text-[#393939] block font-medium mb-1.5">{t("city")}</label>
                            <input type="text" name="city" id="City" placeholder={t("city")} required
                            className="outline-none w-full bg-white p-3.5 rounded-lg placeholder:text-[#868686]"
                            />
                        </div>
                        <div className="w-full mb-3.5 lg:mb-0">
                            <label htmlFor="Covernorat" className="text-lg text-[#393939] block font-medium mb-1.5">{t("covernorat")}</label>
                            <select defaultValue={"0"} className="outline-none w-full bg-white p-3.5 rounded-lg placeholder:text-[#868686]"  name="covernorat" id="Covernorat">
                                <option value="0">{t("options.Cairo")}</option>
                                <option value="1">{t("options.Mans")}</option>
                                <option value="2">{t("options.Alex")}</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3.5 last:mb-0">
                        <label htmlFor="Phone" className="text-lg text-[#393939] block font-medium mb-1.5">{t("phone")}<span className="text-[#FF3B30] ml-1 text-lg font-semibold">*</span></label>
                        <input type="text" name="phone" id="Phone" placeholder="Phone" required
                        className="outline-none w-full bg-white p-3.5 rounded-lg placeholder:text-[#868686]"
                        />
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 w-full">
            <h4 className="text-[20px] font-semibold mb-5 pb-5 text-[#393939]">{t("yourOrder")}</h4>
             <div className="bg-[#E3E3E3] p-4">
                <h4 className="mb-4 pb-2 font-semibold text-lg">{t("product")}</h4>
                <div className="flex justify-between items-center mb-5 pb-5 border-b-[1px] border-b-[#FE93B9]">
                <div className="flex items-center gap-3.5 pb-1">
                    <div className="relative">
                    <span className="absolute -right-1.5 -top-1.5 bg-[#393939] border-[#FE93B9] border text-[#FE93B9] w-6 h-6 rounded-full flex justify-center items-center text-[14px]">2</span>
                    <Image
                    src="/images/product_1.png"
                    alt=""
                    title=""
                    width={70}
                    height={70}
                    className="rounded-[14px]"
                    />
                    </div>
                    <span className="text-[#393939] font-medium">Lipgloss</span>
                </div>
                <p className="text-[#393939] font-medium">320.00 EGP</p>
                </div>

            <div className="text-[#393939]">
                <h4 className="mb-4 pb-2 font-semibold text-lg">{t("shipping")}</h4>
                <div className="flex justify-between items-center border-b-[1px] border-b-[#FE93B9] mb-5 pb-5">
                <p className="font-medium">{t("enterAddress")}</p>
                <p className="font-medium">60.00 EGP</p>
                </div>
             </div>

             <div className="text-[#393939] flex justify-between items-center pt-5">
                <h3 className="font-semibold text-lg uppercase">{t("total")}</h3>
                <p className="text-lg font-semibold">60.00 EGP</p>
             </div>
             </div>

            <div className="bg-[#E3E3E3] text-center mt-10 py-10 p-2.5 text-[#393939]">
                <p className="font-semibold uppercase text-lg">{t("confirmDeposit")}</p>
                <span className="font-medium mt-3.5 pt-4 block">{t("sendTransfer")}</span>
                <div className="flex w-1/2 justify-between items-center mt-5 m-auto">
                 {icons.map((ele) => (
                    <Link  className="flex items-center gap-2.5 bg-[#F3F3F3] p-1 rounded-[8px]" href={ele.link} key={ele.id}>

                        <span>{ele.icon}</span>
                        <span className="font-medium text-[#393939]">{ele.text}</span>
                    </Link>
                ))}
                </div>
                <div>
                </div>
             </div>
            </div>
        </div>
    <button type="submit" className="w-2/3 m-auto font-medium text-lg bg-[#FE93B9] p-3.5 rounded-4xl cursor-pointer">{t("confirmOrder")}</button>
     </form>
    )
}