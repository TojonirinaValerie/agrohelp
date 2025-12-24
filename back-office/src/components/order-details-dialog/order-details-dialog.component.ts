import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderItem } from '../../models/order.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-order-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: 'order-details-dialog.component.html',
  styleUrl: 'order-details-dialog.component.css'
})
export class OrderDetailsDialogComponent {
  orderList: any;
  total = 0;
  displayedColumns: string[] = ['items', 'quantity', 'total'];
  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: OrderItem[], total: number} 
  ) {
    this.orderList = data.items;
    this.total = data.total;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
