import { HttpClient } from '@angular/common/http';
import { ProductType } from '../models/index.model';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
    private http = inject(HttpClient);
    protected API_URL = environment.apiUrl;
    public newCategory: ProductType = {
        id: 'tous', name: 'Tous les produits', nameEn: 'All Products',
        description: '',
        descriptionEn: ''
    };

    getProductTypes = async (): Promise<Observable<{data: {types: ProductType[]} }>> => {
        try {
            return await this.http.get<{data: {types: ProductType[]}}>(`${this.API_URL}/product-type`);  
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    };

    getProductType = async (id: string): Promise<Observable<{data: {type: ProductType} }>> => {
        try {
            return await this.http.get<{data: {type: ProductType}}>(`${this.API_URL}/product-type/${id}`);
        } catch (error) {
            console.error(`Error fetching product:`, error);
            throw error;
        }
    };
}