import axios from "axios";

const URL = import.meta.env.VITE_API_URL as string;
const API_URL = `${URL}/contact`;
export const createContact = async (name: string, email: string, phone: string, subject: string, message: string): Promise<any> => {
  const response = await axios.post<any>(API_URL, {name, email, phone, subject, message});
  return response;
};