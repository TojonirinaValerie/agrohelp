import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../models/index.model';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
    private http = inject(HttpClient);
    protected API_URL = environment.apiUrl;
 
    getCategories = async (): Promise<Observable<{ data: { categories: ProductCategory[]; }; }>> => {
        try {
            return await this.http.get<{data: {categories: ProductCategory[]}}>(`${this.API_URL}/category`);
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    };

    getCategory = async (id: string): Promise<Observable<{ data: { category: ProductCategory; }; }>> => {
        try {
            return await this.http.get<{data: {category: ProductCategory}}>(`${this.API_URL}/category/${id}`);
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    };
}