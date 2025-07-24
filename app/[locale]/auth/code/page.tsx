"use client";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const tchange = useTranslations("PasswordReset");
  const locale = useLocale();
  const router = useRouter();

  const [code, setCode] = useState("");
  const [savedCode, setSavedCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("reset-email");
    const storedCode = localStorage.getItem("reset-code");

    if (!storedEmail) {
      alert("No email found. Please try again.");
      router.push("/auth/forgot-password");
    } else {
      setEmail(storedEmail);
    }

    if (storedCode) {
      setSavedCode(storedCode);
    } else {
      router.push("/auth/forgot-password");
    }
  }, [router]);

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code) return alert("Please enter the verification code");

    setLoading(true);

    setTimeout(() => {
      if (code === savedCode) {
        alert("✅ Code verified successfully!");
        localStorage.removeItem("reset-code");
        router.push("/auth/change-password");
      } else {
        alert("❌ Wrong code, try again!");
        localStorage.removeItem("reset-code");
        router.push("/auth/forgot-password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleVerify}
      className="bg-[#f5f5f5] p-6 space-y-6 py-4"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <p className="text-center text-sm text-gray-600">
        {`A verification code has been sent to: `}
        <span className="font-semibold text-[#FE93B9]">{email}</span>
      </p>

      {/* Code Input */}
      <div
        className={`relative flex items-center border bg-[#F8F8F8] border-[#FE93B9] rounded-md overflow-hidden`}
      >
        <input
          type="text"
          placeholder={tchange("enterCode")}
          className={`w-full outline-none bg-[#F8F8F8] px-3 py-2 text-black placeholder:text-neutral-400`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Verify Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-[#FE93B9] text-[#393939] py-2 rounded-md transition cursor-pointer ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#ef91b2] hover:text-[#f5f5f5]"
        }`}
      >
        {loading ? "Verifying..." : tchange("verifyButton") || "Verify Code"}
      </button>

      {/* Resend Code */}
      <button
        type="button"
        disabled={loading}
        onClick={() => {
          localStorage.removeItem("reset-email");
          localStorage.removeItem("reset-code");
          router.push("/auth/forgot-password");
        }}
        className="w-full text-sm text-[#146ebe] hover:underline cursor-pointer"
      >
        Resend Code
      </button>
    </form>
  );
}
