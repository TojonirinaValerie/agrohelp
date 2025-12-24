import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { Product, ProductDashBoard } from '../../models/product.model';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ProductTypeService } from '../../services/product-type.service';
import { ProductType } from '../../models/index.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatChipsModule,
    RouterLink
  ],
  templateUrl: 'products.component.html',
  styleUrl: 'products.component.css'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  products$!: Promise<Observable<{ data: { products: ProductDashBoard[]; }; }>>;
  products: ProductDashBoard[] = [];
  displayedColumns: string[] = ['image', 'name', 'category', 'retailer-price', 'consumer-price', 'quantity', 'featured', 'actions'];

  constructor() {}

  ngOnInit() {
    this.products$ = this.productService.getDashboardProducts();
    this.products$.then((data) => {
      data.subscribe(p => {
        this.products = p.data.products;
      })
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      //this.productService.deleteProduct(id).subscribe();
    }
  }
}