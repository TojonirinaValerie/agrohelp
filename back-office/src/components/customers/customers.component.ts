import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Customer, CustomerHistory } from '../../models/customer.model';
import { Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem, OrderList } from '../../models/order.model';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: 'customers.component.html',
  styleUrl: 'customers.component.css' 
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'contact', 'registration', 'orders', 'spent', 'actions'];
  customers: CustomerHistory[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getAllCustomersHistory().then(
      (res: any) => res.subscribe(
        (customerData: any) => {
          this.customers = customerData.data.customers;
        }));
  }
}