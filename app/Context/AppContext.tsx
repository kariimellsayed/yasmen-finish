"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axiosInstance from "@/lib/axios";

/*=======================
 Types
========================*/
type CartItem = {
  productId: number;
  productName: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

type CartResponse = {
  id: number;
  applicationUserId: string;
  cartItems: CartItem[];
  totalAmount: number;
};

// type WishlistItem = {
//   productId: number;
//   productName: string;
//   image?: string;
// };

type AppContextType = {
  cart: CartResponse | null;
  // wishlist: WishlistItem[];
  fetchCart: () => Promise<void>;
  addToCart: (
    productId: number,
    quantity?: number,
    color?: string,
    size?: string
  ) => Promise<void>;
  removeFromCart: (productId: number, userId: number) => Promise<void>;
  clearCart: (userId: number) => Promise<void>;
};

/*=======================
  Context & Provider
========================*/
export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartResponse | null>(null);
  // const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/Cart/GetUserCart");
      setCart(res.data);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    }
  };

  const addToCart = async (
    productId: number,
    quantity: number = 1,
    color?: string,
    size?: string
  ) => {
    try {
      await axiosInstance.post("Cart/AddToCart", {
        productId,
        quantity,
        color,
        size,
      });
      await fetchCart();
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId: number, userId: number) => {
    try {
      await axiosInstance.delete(
        `/Cart/RemoveFromCart?userId=${userId}&productId=${productId}`
      );
      await fetchCart();
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
    }
  };

  const clearCart = async (userId: number) => {
    try {
      await axiosInstance.delete(`/Cart/ClearCart?userId=${userId}`);
      await fetchCart();
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        // wishlist,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/*=======================
Custom Hook
========================*/
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
