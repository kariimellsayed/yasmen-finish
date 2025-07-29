"use client";
import axiosInstance from "@/lib/axios";
import { storage } from "@/lib/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaSquarePhone , FaLocationDot} from "react-icons/fa6";


export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      userName,
      phoneNumber,
      email,
      password,
      address,
    } = form;

    if (
      !firstName ||
      !lastName ||
      !userName ||
      !phoneNumber ||
      !email ||
      !password ||
      !address
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    axiosInstance
      .post("Account/Register", form)
      .then((res) => {
        const { token, role } = res.data;
        storage.setToken(token);
        storage.setRole(role);
        router.push("/");
      })
      .catch((err) => {
        console.log("Registration Error ❌", err);
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
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#f5f5f5] p-6 py-4">
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

      {/* First Name & Last Name */}
      <div className="flex gap-2 max-[767px]:flex-col ">
        <div className="max-[767px]:w-full relative flex items-center border border-[#FE93B9] rounded-md w-1/2 overflow-hidden">
          <span className=" absolute h-full bg-[#FE93B9] px-2 left-0 flex justify-center items-center">
            <Image src={"/user.svg"} width={20} height={20} alt="first" />
          </span>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            disabled={loading}
            className="w-full outline-none bg-[#F8F8F8] text-black font-medium px-3 py-2 pl-10 placeholder:text-neutral-400 disabled:opacity-50"
          />
        </div>
        <div className="max-[767px]:w-full relative flex items-center border border-[#FE93B9] rounded-md w-1/2 overflow-hidden">
          <span className="absolute h-full bg-[#FE93B9] px-2 left-0 flex justify-center items-center">
            <Image src={"/user.svg"} width={20} height={20} alt="last" />
          </span>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            disabled={loading}
            className="w-full outline-none bg-[#F8F8F8] text-black font-medium px-3 py-2 pl-10 placeholder:text-neutral-400 disabled:opacity-50"
          />
        </div>
      </div>

      {/* Username */}
      <div className="relative flex items-center border border-[#FE93B9] rounded-md overflow-hidden">
        <span className="absolute h-full bg-[#FE93B9] px-2 left-0 flex justify-center items-center">
          <Image src={"/user.svg"} width={20} height={20} alt="user" />
        </span>
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          disabled={loading}
          className="w-full outline-none bg-[#F8F8F8] text-black font-medium px-3 py-2 pl-10 placeholder:text-neutral-400 disabled:opacity-50"
        />
      </div>

      {/* Phone Number */}
      <div className="relative flex items-center border border-[#FE93B9] rounded-md overflow-hidden">
        <span className="absolute h-full bg-[#FE93B9] px-2 left-0 flex justify-center items-center">
          <FaSquarePhone className="w-5 h-5 text-white" />
        </span>
        <input
          type="tel"
          placeholder="Phone Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          disabled={loading}
          className="w-full outline-none bg-[#F8F8F8] text-black font-medium px-3 py-2 pl-10 placeholder:text-neutral-400 disabled:opacity-50"
        />
      </div>

      {/* Address */}
      <div className="relative flex items-center border border-[#FE93B9] rounded-md overflow-hidden">
        <span className="absolute h-full bg-[#FE93B9] px-2 left-0 flex justify-center items-center">
          <FaLocationDot className="w-5 h-5 text-white"/>
        </span>
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={form.address}
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
          disabled={loading}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <Image src={"/eye.svg"} width={20} height={20} alt="toggle" />
        </button>
      </div>

      {/* Checkboxes */}
      <div className="space-y-2 text-sm text-gray-700">
        <label className="flex items-center gap-2 max-[425px]:text-[12px]">
          <div className="relative">
            <input
              type="checkbox"
              className="peer appearance-none w-[19px] h-[18px] bg-[#f8f8f8] border border-[#868686] rounded-[3px] cursor-pointer checked:bg-[#FE93B9] checked:border-[#FE93B9]"
            />
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-white text-[15px] opacity-0 peer-checked:opacity-100 pointer-events-none select-none">
              <FaCheck className="mt-[1px]" />
            </span>
          </div>
          I accept the{" "}
          <a href="#" className="text-blue-500 underline">
            Terms of Service and Privacy Policy
          </a>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FE93B9] text-[#393939] py-2 rounded-md cursor-pointer transition hover:bg-[#ef91b2] hover:text-[#f5f5f5] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
}
