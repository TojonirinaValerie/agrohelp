import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { ProductTypeService } from '../../../services/product-type.service';
import { ProductCategory, ProductType } from '../../../models/index.model';
import { ProductCategoryService } from '../../../services/product-category.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: 'product-form.component.html',
  styleUrl: 'product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  productId: string | null = null;
  productTypes!: ProductType[];
  productCategories!: ProductCategory[];
  productTypeByCategories!: ProductType[];
  formData = new FormData;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    private productCategoryService: ProductCategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode && this.productId) {
      this.loadProduct(this.productId);
    }

    this.productTypeService.getProductTypes().then(data => {
      data.subscribe(pT => {
        this.productTypes = pT.data.types;
      })
    });

    this.productCategoryService.getCategories().then(data =>
      data.subscribe(pC => {
        this.productCategories = pC.data.categories;
      })
    );
  }

  private initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      nameEn: ['', Validators.required],
      description: [''],
      descriptionEn: [''],
      retailer_price: [0, [Validators.required, Validators.min(0.01)]],
      consumer_price: [0, [Validators.required, Validators.min(0.01)]],
      typeId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      image: [null],
      barcode: ['', Validators.required],
      featured: [false, Validators.required],
      category: ['']
    });
  }

  private loadProduct(id: string) {
    this.productService.getProduct(id).then(data => {
        data.subscribe(p => {
          const productData = p.data.product;
          
          this.productForm.patchValue({
            name: productData.name,
            nameEn: productData.nameEn,
            description: productData.description,
            descriptionEn: productData.descriptionEn,
            retailer_price: productData.retailer_price,
            consumer_price: productData.consumer_price,
            typeId: productData.typeId,
            quantity: productData.quantity,
            image: '',
            imageUrl: '',
            barcode: productData.barcode,
            featured: productData.featured,
            category: ''
          });
        });
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isLoading = true;
      const formValue = this.productForm.value;
      delete formValue.category;
      const product = this.productService.autoFillEmptyStrings(formValue, { nameEn: "", description: "", descriptionEn: "" });
      this.formData.set('product', JSON.stringify(product));
      const user = localStorage.getItem('currentUser');
      if(user)  this.formData.set('user', user);
      if (this.isEditMode && this.productId) {
        this.productService.updateProduct(this.productId, this.formData).subscribe(
          (res: any)=> {
            this.isLoading = false;
            if(res.success) this.router.navigate(['/products']);
            alert(res.message);
        })
      } else {
        this.productService.addProduct(this.formData).subscribe(
          (res: any) => {
            this.isLoading = false;
            if(res.success) this.router.navigate(['/products']);
            alert(res.message);
          });
      }
    }
  }

  async getProductTypeBycategory(id: string) {
    this.productTypeByCategories = await this.productTypes.filter(p => p.categoryId === id);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  uploadFile(event: Event) {
    this.updateFileFormControl(event);
  }

  private updateFileFormControl(event: any) {
    let file: File = event.target.files[0];
    
    if(file) {
      this.formData.set('image', file);  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.productForm.patchValue({ imageUrl: this.imagePreview });
      };
      reader.readAsDataURL(file);
    }
  }
}