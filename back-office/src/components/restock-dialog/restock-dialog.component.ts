import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-restock-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: 'restock-dialog.component.html',
  styleUrl: 'restock-dialog.component.css'
})
export class RestockDialogComponent {
  quantity: number = 1;

  constructor(
    public dialogRef: MatDialogRef<RestockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(this.quantity);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
