import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Order, OrderList } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    private http = inject(HttpClient);
    protected API_URL = environment.apiUrl;

    getOrders = async (): Promise<Observable< { data: { orders: Order[]} }>> => {
        return await this.http.get<{ data: { orders: Order[]} }>(`${this.API_URL}/order`);
    }

    putOrders = async (id: string, status: string): Promise<Observable<any>> => {
        return await this.http.put<any>(`${this.API_URL}/order/${id}`, { status: status });
    }

    getTotalOrders = async (): Promise<Observable<any>> => {
        return await this.http.get<any>(`${this.API_URL}/order-total`);
    }

    getTotalCustomers = async (): Promise<Observable<any>> => {
        return await this.http.get<any>(`${this.API_URL}/customer-total`);
    }

    getOrderListByOrder = async (id: string): Promise<Observable< { data: { orderList: OrderList[]} }>> => {
        return await this.http.get<{ data: { orderList: OrderList[]} }>(`${this.API_URL}/order-list/${id}`);
    }

    getOrderList = async (): Promise<Observable< { data: { orderList: OrderList[]} }>> => {
        return await this.http.get<{ data: { orderList: OrderList[]} }>(`${this.API_URL}/order-list`);
    }

    getAllCustomers = async (): Promise<Observable<any>> => {
        return await this.http.get<any>(`${this.API_URL}/customer`);
    }

    getAllCity = async (): Promise<Observable<any>> => {
        return await this.http.get<any>(`${this.API_URL}/city`);
    }  

    getAllCustomersHistory = async (): Promise<Observable<any>> => {
        return await this.http.get<any>(`${this.API_URL}/customer/history`);
    }

    getRevenue = async (): Promise<Observable<any>> => {
        return await this.http.get<any>(`${this.API_URL}/revenue`);
    }

    downloadInvoice = (id: string): Observable<any> => {
        return this.http.get<any>(`${this.API_URL}/invoice-file/${id}`);
    }
}