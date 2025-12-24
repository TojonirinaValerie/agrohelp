import axios from "axios";
import { PaymentDetails } from "../types";

const URL = import.meta.env.VITE_API_URL as string;
const API_URL = `${URL}/payment/mvola`;
export const initiatePayment = async (paymentDetails: PaymentDetails): Promise<any> => {
  const response = await axios.post<any>(API_URL, paymentDetails);
  return response.data;
};