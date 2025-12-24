export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  barcode: string;
  in_stock: boolean;
  quantity: number;
  retailer_price: number;
  consumer_price: number;
  typeId: string;
  userId: string;
  image?: string;
  rating?: number;
  reviews?: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  city: string;
  address: string;
  phoneNumber: string;
  phoneNumberPay: string;
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

export interface ProductType { 
  id: string;
  name: string; 
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  category?: ProductCategory;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  nameEn: string;
  descriptionEn: string;
}

export interface PaymentDetails {
  orderId: string;
  correlationId: string;
  customerNumber: string;
  amount: number;
  descriptionText: string;
}

export interface OrderResponse {
  id: string;        // MongoDB ObjectId as string
  address: string;    // Reference to an Address ObjectId
  status: string;
  createdAt: string;  // ISO date string
  updatedAt: string;
}


export type Language = 'fr' | 'en';