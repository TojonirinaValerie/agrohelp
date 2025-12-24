export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone_number: string;
  house_address: string;
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  postal_code: string;
  totalOrders?: number;
  totalSpent?: number;
}

export interface CustomerHistory {
  totalOrder: number;
  totalSpent: number;
  createdAt: Date;
  updatedAt: Date;
  customer: Customer;
}