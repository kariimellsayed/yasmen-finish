"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = form;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    axiosInstance
      .post("Account/Login", form)
      .then((res) => {
        const { token, role } = res.data;
        storage.setToken(token);
        storage.setRole(role);
        router.push("/");
      })
      .catch((err) => {
        console.log("Login Error ❌", err);
        alert(
          `Error: ${err.response?.data?.message || "Something went wrong"}`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (storage.getToken()) {
      router.push("/");
    }
  }, [router]);

  return (
    <form onSubmit={handleSubmit} className="bg-[#f5f5f5] p-6 space-y-6 py-4">
      {/* Email */}
      <div className="relative flex items-center border border-[#FE93B9] rounded-md overflow-hidden">
        <span className="absolute h-full bg-[#FE93B9] px-2 left-0 flex justify-center items-center">
          <Image src={"/email.svg"} width={20} height={20} alt="email" />
        </span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          className="w-full outline-none bg-[#F8F8F8] text-black font-medium px-3 py-2 pl-10 placeholder:text-neutral-400 disabled:opacity-50"
        />
      </div>

      {/* Password */}
      <div className="relative flex items-center border border-[#FE93B9] bg-[#F8F8F8] rounded-md overflow-hidden">
        <span className="absolute h-full bg-[#FE93B9] px-2 left-0 flex justify-center items-center">
          <Image src={"/password.svg"} width={20} height={20} alt="password" />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          className="w-full outline-none bg-[#F8F8F8] text-black font-medium px-3 py-2 pl-10 placeholder:text-neutral-400 disabled:opacity-50"
        />
        <button
          type="button"
          className="px-2"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={loading}
        >
          <Image src={"/eye.svg"} width={20} height={20} alt="toggle" />
        </button>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-center items-center text-sm">
        <Link
          href="/auth/send-to-email"
          className="text-[#FF3B30] hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FE93B9] text-[#393939] py-2 rounded-md cursor-pointer transition hover:bg-[#ef91b2] hover:text-[#f5f5f5] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
