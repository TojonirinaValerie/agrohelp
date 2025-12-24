import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Product, ProductDashBoard } from '../../models/product.model';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { RestockDialogComponent } from '../restock-dialog/restock-dialog.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
    RouterLink
  ],
  templateUrl: 'inventory.component.html',
  styleUrl: 'inventory.component.css'
})
export class InventoryComponent implements OnInit {
  products$!: Observable<ProductDashBoard[]>;
  displayedColumns: string[] = ['product', 'category', 'quantity', 'status', 'value', 'actions'];
  products: ProductDashBoard[] = []; 

  totalProducts = 0;
  lowStockCount = 0;
  inStockCount = 0;

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getDashboardProducts().then(res => res.subscribe(p => {
      this.products = p.data.products;
      this.totalProducts = this.products.length;
      this.lowStockCount = this.products.filter(p => p.quantity < 10).length;
      this.inStockCount = this.products.filter(p => p.quantity >= 10).length;
    }));
  }

  getStockClass(stock: number): string {
    if (stock === 0) return 'critical-stock';
    if (stock < 10) return 'low-stock';
    return 'good-stock';
  }

  getStockPercentage(stock: number): number {
    const maxStock = 50; // Assume 50 is the ideal stock level
    return Math.min((stock / maxStock) * 100, 100);
  }

  getProgressColor(stock: number): string {
    if (stock === 0) return 'warn';
    if (stock < 10) return 'accent';
    return 'primary';
  }

  getStockStatus(stock: number): string {
    if (stock === 0) return 'Out of Stock';
    if (stock < 5) return 'Critical';
    if (stock < 10) return 'Low Stock';
    return 'In Stock';
  }

  getStatusIcon(stock: number): string {
    if (stock === 0) return 'error';
    if (stock < 10) return 'warning';
    return 'check_circle';
  }

  getStatusIconClass(stock: number): string {
    if (stock === 0) return 'status-critical';
    if (stock < 10) return 'status-warning';
    return 'status-good';
  }

  openRestockDialog(productId: string): void {
    const dialogRef = this.dialog.open(RestockDialogComponent, {
      width: '300px',
      data: { productId }
    });

    dialogRef.afterClosed().subscribe(quantity => {
      if (quantity) {
        console.log(`Restock ${quantity} units of product ${productId}`);
        this.productService.restockProduct(productId, quantity).subscribe((res: any) => {
          if(res.success) {
            this.loadProducts();
            alert(`Product restocked with ${quantity} quantity`)
          };
        });
      }
    });
  }

}