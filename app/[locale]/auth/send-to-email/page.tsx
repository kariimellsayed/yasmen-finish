"use client";
import axiosInstance from "@/lib/axios";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdEmail } from "react-icons/md";

export default function SendToEmail() {
  const tchange = useTranslations("PasswordReset");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return alert("Please enter your email");

    setLoading(true);
    axiosInstance
      .post("/Account/SendEmail", null, {
        params: { Email: email },
      })
      .then((res) => {
        alert("Check your email inbox for the verification code ✉️");
        localStorage.setItem("reset-email", email);
        localStorage.setItem("reset-code", res.data);

        router.push("/auth/code");
      })
      .catch((err) => {
        console.log("❌ Send Reset Code Error:", err);
        alert(
          `Error: ${err.response?.data?.message || "Something went wrong"}`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSendCode}
      className="bg-[#f5f5f5] p-6  space-y-6 py-4"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Email or Username */}
      <div
        className={`relative flex items-center border bg-[#F8F8F8] border-[#FE93B9] rounded-md overflow-hidden`}
      >
        <span
          className={`absolute h-full bg-[#FE93B9] px-2  flex justify-center items-center ${
            locale === "ar" ? "right-0" : "left-0"
          }`}
        >
          <MdEmail className="text-[#f5f5f5]" size={20} />
        </span>
        <input
          type="email"
          placeholder={tchange("sendCodeDescription")}
          className={`w-full outline-none bg-[#F8F8F8] px-3 py-2  text-black placeholder:text-neutral-400 ${
            locale === "ar" ? "pr-10" : "pl-10"
          }`}
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-[#FE93B9] text-[#393939] py-2 rounded-md  transition cursor-pointer hover:bg-[#ef91b2] hover:text-[#f5f5f5]"
      >
        {loading ? "loading...." : tchange("sendCodeButton")}
      </button>
    </form>
  );
}
