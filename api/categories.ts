import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { Category } from "@/types/category";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await axiosInstance.get<Category[]>("/Brand/GetAll");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error("Error fetching categories ❌", error);

    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};
