import AuthService from "./Auth";
import TransactionService from "./Transaction";
import axios, { AxiosRequestConfig } from "axios";
import fetchAdapter from "axios";

export const MVOLA_BASE_URL = process.env.MVOLA_BASE_URL as string;
export const MVOLA_API_URL = process.env.MVOLA_API_URL as string;

class Client {
  transaction: TransactionService;
  auth: AuthService;

  constructor(baseURL: string = MVOLA_BASE_URL, useFetchAdapter: boolean = false) {
    const options: AxiosRequestConfig = { baseURL };
    if (useFetchAdapter) {
      options.adapter = fetchAdapter;
    }
    const client = axios.create(options);
    this.auth = new AuthService(axios.create(options));
    this.transaction = new TransactionService(client);
  }
}

export default Client;
