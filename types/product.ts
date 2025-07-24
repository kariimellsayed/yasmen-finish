export interface Product {
  id: number;
  name: string;
  description: string;
  oldPrice: number;
  newPrice: number;
  rating: number;
  brandId: number;
  brandName: string | number;
  applicationUserId: string;
  userName: string;
  productImages?: string[];
}

// Product Details

export interface ProductDetails {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  rating: number;
  description: string;
  brandId: number;
  brandName: string | number;
  applicationUserId: string;
  userName: string;
  productImages: string[];
}
