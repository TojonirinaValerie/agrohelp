import { Product } from "./product.model";

export interface Order {
  id: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentId: Payment;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface Payment {
  orderId?: string;
  transactionStatus: string;
  serverCorrelationId: string;
  transactionReference?: string;
  requestDate?: string;
  debitParty?: string;
  creditParty?: string;
  fees?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  consumerPrice: number;
  retailerPrice: number;
}

export interface Address {
  id: string;
  fullName: string;
  house_address: string;
  city: string;
  country: string;
  postal_code: string;
  phone_number: string;
  email: string;
}

export interface City {
  id: string;
  name: string;
  region: string;
}

export interface Country {
  id: string;
  name: string;
}

export interface OrderList {
  id: string;
  items: [{
    product: Product;  
    quantity: number;
  }];
  orderDetails: Order;
}

export interface Revenue {
  shopRevenue: string;
  totalPriceOrderEstimated: number;
  totalPriceOrderConfirmed: number;
}