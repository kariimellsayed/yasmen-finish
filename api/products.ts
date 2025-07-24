import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { Product } from "@/types/product";

export const fetchProducts = async (
  categoryId: number = 0
): Promise<Product[]> => {
  try {
    const res = await axiosInstance.get<Product[]>(
      `/Product/GetAll?categryId=${categoryId}`
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error("Error fetching products ❌", error);

    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};
