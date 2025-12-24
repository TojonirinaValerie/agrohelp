import { ProductType, ProductTypeDashboard } from "./index.model";

export interface BaseProduct {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  retailer_price: number;
  consumer_price: number;
  userId?: string;
  in_stock?: boolean;
  quantity: number;
  image?: string;
  barcode: string;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product extends BaseProduct {
  typeId: string;
}

export interface ProductDashBoard extends BaseProduct {
  typeId: ProductTypeDashboard;
}

export interface TopSellingProduct {
  totalOrder: number;
  product: Product;
  createdAt: Date;
  updatedAt: Date;
}