import { inject, Injectable } from "@angular/core";
import { Product, ProductDashBoard, TopSellingProduct } from "../models/product.model";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    protected API_URL = environment.apiUrl;

    getProducts = async (): Promise<Observable<{ data: { products: Product[]; }; }>> => {
        try {
            return await this.http.get<{ data: { products: Product[]} }>(`${this.API_URL}/product`); 
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    }

    getDashboardProducts = async (): Promise<Observable<{ data: { products: ProductDashBoard[]; }; }>> => {
        try {
            return await this.http.get<{ data: { products: ProductDashBoard[]} }>(`${this.API_URL}/product-dashboard`); 
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    }

    getTopSellingProducts = async (): Promise<Observable<{ data: { topSellings: TopSellingProduct[]; }; }>> => {
        try {
            return await this.http.get<{ data: { topSellings: TopSellingProduct[]} }>(`${this.API_URL}/top-selling`); 
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    }

    getProductsByCategory = async (id: string): Promise<Observable<{ data: { products: Product[]; }; }>> => {
        try {
            return await this.http.get<{data:{ products: Product[]}}>(`${this.API_URL}/product/${id}/category`); 
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    }

    getProduct = async (id: string): Promise<Observable<{ data: { product: Product; }; }>> => {
        try {
            return await this.http.get<{data:{ product: Product}}>(`${this.API_URL}/product/${id}`);
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    }

    getProductTotal = async (): Promise<Observable<any>> => {
        try {
            return await this.http.get<any>(`${this.API_URL}/product-total`);
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    }

    updateProduct = (id: string, formData: FormData): any => {
        try {
            return this.http.put<any>(`${this.API_URL}/product/${id}`, formData);
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    }

    restockProduct = (id: string, quantity: number): any => {
        try {
            return this.http.put<any>(`${this.API_URL}/product-restock/${id}`, {quantity});
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    }

    addProduct = (formData: FormData): any => {
        try {
            return this.http.post<any>(`${this.API_URL}/product`, formData);
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    }

    autoFillEmptyStrings<T extends Record<string, any>>(obj: Partial<T>, defaults: Partial<Record<keyof T, any>>): Partial<T> {
        const result = { ...obj };
        for (const key in defaults) {
            if (result[key] == null) result[key] = defaults[key];
        }
        return result;
    }
}