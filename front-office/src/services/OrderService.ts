import axios from "axios";
import { CartItem, ShippingDetails } from "../types";

const URL = import.meta.env.VITE_API_URL as string;
const API_URL = `${URL}/order`;
export const createOrder = async (shippingDetails: ShippingDetails, cartItems: CartItem[]): Promise<any> => {
  const response = await axios.post<any>(API_URL, {shippingDetails, cartItems});
  return response.data;
};

export const getInvoice = async (id: string): Promise<any> => {
  const response = await axios.get<any>(`${URL}/invoice-file/${id}`);
  return response;
};