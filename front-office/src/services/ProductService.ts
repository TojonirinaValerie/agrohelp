// services/userService.ts
import axios from 'axios';
import { Product } from '../types';

const URL = import.meta.env.VITE_API_URL as string;
const API_URL = `${URL}/product`;

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<{data:{ products: Product[]}}>(API_URL);
    return response.data.data.products; 
  } catch (error) {
    console.error(`Error fetching product:`, error);
    throw error;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<{data:{ products: Product[]}}>(`${API_URL}/featured/all`);
    return response.data.data.products; 
  } catch (error) {
    console.error(`Error fetching featured product:`, error);
    throw error;
  }
};

export const getProductsByCategory = async (id: string): Promise<Product[]> => {
  try {
    const response = await axios.get<{data:{ products: Product[]}}>(`${API_URL}/${id}/category`);
    return response.data.data.products; 
  } catch (error) {
    console.error(`Error fetching product:`, error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get<{data:{ product: Product}}>(`${API_URL}/${id}`);
    return response.data.data.product;  
  } catch (error) {
    console.error(`Error fetching product:`, error);
    throw error;
  }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  try {
    const response = await axios.put<{data:{ product: Product}}>(`${API_URL}/${id}`, product);
    return response.data.data.product;  
  } catch (error) {
    console.error(`Error fetching product:`, error);
    throw error;
  }
};