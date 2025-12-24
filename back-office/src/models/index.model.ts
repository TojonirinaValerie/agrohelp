import { Product } from "./product.model";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  city: string;
  region: string;
  address: string;
  phoneNumber: string;
  phoneNumberPay?: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id?: string;
  items: CartItem[];
  shipping: ShippingDetails;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt?: string;
}

export interface ProductTypeBase { 
  id: string;
  name: string; 
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
}

export interface ProductType extends ProductTypeBase { 
  categoryId?: string;
}

export interface ProductTypeDashboard extends ProductTypeBase { 
  category?: ProductCategory;
}

export interface ProductCategory {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
  descriptionEn?: string;
}

export type Language = 'fr' | 'en';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject: string;
}
