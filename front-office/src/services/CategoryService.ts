// services/userService.ts
import axios from 'axios';
import { ProductType } from '../types';

const URL = import.meta.env.VITE_API_URL as string;
const API_URL = `${URL}/type`;
const newCategory: ProductType = {
  id: 'tous', name: 'Tous les produits', nameEn: 'All Products',
  description: '',
  descriptionEn: ''
};

export const getProductTypes = async (): Promise<ProductType[]> => {
  try {
    const response = await axios.get<{data: {types: ProductType[]}}>(API_URL);
    let categories = response.data.data.types;

    categories.unshift(newCategory);
    return categories;  
  } catch (error) {
    console.error(`Error fetching product:`, error);
    throw error;
  }
};

export const getProductType = async (id: string): Promise<ProductType> => {
  try {
    const response = await axios.get<{data: {type: ProductType}}>(`${API_URL}/${id}`);
    return response.data.data.type;  
  } catch (error) {
    console.error(`Error fetching product:`, error);
    throw error;
  }
};