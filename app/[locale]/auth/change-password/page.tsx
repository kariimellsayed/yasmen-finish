"use client";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { MdLockOpen } from "react-icons/md";
import axiosInstance from "@/lib/axios";

export default function ChangePassword() {
  const tchange = useTranslations("PasswordReset");
  const locale = useLocale();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("reset-email");
    if (!storedEmail) {
      alert("No email found. Please try again.");
      router.push("/auth/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) return alert("Please enter your new password");

    setLoading(true);
    axiosInstance
      .post("/Account/ChangePassword", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        alert("✅ Password changed successfully!");
        localStorage.removeItem("reset-email");
        router.push("/auth/login");
      })
      .catch((err) => {
        console.log("❌ Change Password Error:", err);
        alert(
          `Error: ${err.response?.data?.message || "Something went wrong"}`
        );
        localStorage.removeItem("reset-email");
        router.push("/auth/forgot-password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleChangePassword}
      className="bg-[#f5f5f5] p-6 space-y-6 py-4"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Password Input */}
      <div
        className={`relative flex items-center border bg-[#F8F8F8] border-[#FE93B9] rounded-md overflow-hidden`}
      >
        <span
          className={`absolute h-full bg-[#FE93B9] px-2 flex justify-center items-center ${
            locale === "ar" ? "right-0" : "left-0"
          }`}
        >
          <MdLockOpen className="text-[#f5f5f5]" size={20} />
        </span>
        <input
          type="password"
          placeholder={tchange("changePasswordTitle")}
          className={`w-full outline-none bg-[#F8F8F8] px-3 py-2 text-black placeholder:text-neutral-400 ${
            locale === "ar" ? "pr-10" : "pl-10"
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="newPassword"
          autoComplete="new-password"
          disabled={loading}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FE93B9] text-[#393939] py-2 rounded-md transition cursor-pointer hover:bg-[#ef91b2] hover:text-[#f5f5f5] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? tchange("loading") || "Loading..."
          : tchange("changePasswordTitle") || "Change Password"}
      </button>
    </form>
  );
}
