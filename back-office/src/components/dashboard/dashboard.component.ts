import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product, TopSellingProduct } from '../../models/product.model';
import { OrderService } from '../../services/order.service';
import { Order, OrderList, Revenue } from '../../models/order.model';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    RouterLink
  ],
  templateUrl: 'dashboard.component.html',
  styleUrl: 'dashboard.component.css' 
})
export class DashboardComponent implements OnInit {
  lowStockProducts: any[] = [];
  totalProducts: number = 0;
  totalOrders: number = 0;
  totalCustomers: number = 0;
  products!: Product[];
  orders!: Order[];
  ordersList!: OrderList[];
  customers!: Customer[];
  topSellings!: TopSellingProduct[];
  revenue!: Revenue;
  totalEstimated = 0;
  totalConfirmed = 0;
  constructor(private productService: ProductService, private orderService: OrderService) {}

  ngOnInit() {  
    this.productService.getProducts().then(data => 
      data.subscribe(p => {
        this.products = p.data.products;
        if(this.products)
          this.lowStockProducts = p.data.products.filter(p => p.quantity < 10);
      })
    );

    this.productService.getTopSellingProducts().then(data => 
      data.subscribe(p => {
        this.topSellings = p.data.topSellings;
      })
    );

    this.orderService.getRevenue().then(res => 
      res.subscribe(rT => {
        this.revenue = rT.data.revenue
        if(this.revenue) {
          this.totalConfirmed = this.revenue.totalPriceOrderConfirmed;
          this.totalEstimated = this.revenue.totalPriceOrderEstimated;
        }
      }));

    this.productService.getProductTotal().then(res => 
      res.subscribe(pT => this.totalProducts = pT.data.productsTotal));

    this.orderService.getTotalOrders().then(res => 
      res.subscribe(oT => this.totalOrders = oT.data.ordersTotal));

    this.orderService.getTotalCustomers().then(res => 
      res.subscribe(cT => this.totalCustomers = cT.data.customersTotal));

    this.orderService.getOrderList().then(dataOrd => 
      dataOrd.subscribe(ord => this.ordersList = ord.data.orderList));

    this.orderService.getAllCustomers().then(dataCustomers => 
      dataCustomers.subscribe(c => this.customers = c.data.customers));
  }


  private generateSalesData() {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales',
        data: [12000, 15000, 18000, 14000, 20000, 22000],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4
      }]
    };
  }

  getOrderItemspriceTotal(orderList: OrderList) {
    return orderList.items.reduce((sum, item) => sum + item.quantity * item.product.consumer_price, 0);
  } 

  getCustomerById(id: string) {
    if(this.customers) {
      const customer = this.customers.filter(data => data.id === id);
      return customer[0].fullName;
    }
    return; 
  }
}