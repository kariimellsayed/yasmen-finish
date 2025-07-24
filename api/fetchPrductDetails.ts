import axiosInstance from "@/lib/axios";
import { ProductDetails } from "@/types/product";
import { AxiosError } from "axios";

export const fetchPrductDetails = async (
  id: number
): Promise<ProductDetails> => {
  try {
    const res = await axiosInstance.get<ProductDetails>(
      `/Product/GetById?Id=${id}`
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error("Error fetching product details ❌", error);

    throw new Error(
      error.response?.data?.message || "Failed to fetch product details"
    );
  }
};
