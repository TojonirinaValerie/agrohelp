import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card-wrapper">
        <mat-card class="login-card">
          <div class="login-header">
            <div class="logo">
              <img class="logo-icon" src="assets/img/logo.png" alt="Logo">
            </div>
            <h2 class="login-title">Sign in to your account</h2>
          </div>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="Enter your email">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" placeholder="Enter your password">
              <button type="button" mat-icon-button matSuffix (click)="togglePasswordVisibility($event)">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
            </mat-form-field>
            
            <div class="login-actions">
              <mat-checkbox color="primary" class="remember-me">Remember me</mat-checkbox>
              <a href="#" class="forgot-password">Forgot password?</a>
            </div>
            
            <button mat-raised-button color="primary" type="submit" class="login-button" [disabled]="loginForm.invalid || isLoading">
              <mat-spinner *ngIf="isLoading" diameter="20" class="login-spinner"></mat-spinner>
              <span *ngIf="!isLoading">Sign In</span>
            </button>
          </form>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, var(--primary-700), var(--secondary-700));
      min-height: calc(100vh - 48px);
      padding: var(--space-3);
    }
    
    .login-card-wrapper {
      width: 100%;
      max-width: 500px;
    }
    
    .login-card {
      padding: var(--space-5);
      border-radius: 0.375rem;;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                  0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    
    .login-header {
      text-align: center;
      margin-bottom: var(--space-4);
    }
    
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--space-2);
    }
    
    .logo-icon {
      font-size: 32px;
      height: 80px;
      width: 80px;
      color: var(--primary-500);
      margin-right: var(--space-2);
    }
    
    .logo-text {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--primary-700);
      margin: 0;
    }
    
    .login-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-medium);
      color: var(--neutral-700);
      margin: 0;
    }
    
    .login-form {
      display: flex;
      flex-direction: column;
      margin: 0 var(--space-2);
    }
    
    .form-field {
      margin-bottom: var(--space-3);
    }
    
    .login-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-3);
      font-size: var(--font-size-sm);
    }
    
    .forgot-password {
      color: var(--primary-500);
      text-decoration: none;
    }
    
    .forgot-password:hover {
      text-decoration: underline;
    }
    
    .login-button {
      height: 44px;
      font-size: var(--font-size-md);
      transition: background-color var(--transition-normal);
    }
    
    .login-spinner {
      margin: 0 auto;
    }
    
    .login-footer {
      margin-top: var(--space-4);
      text-align: center;
      font-size: var(--font-size-sm);
      color: var(--neutral-600);
    }
    
    .demo-credentials {
      padding: var(--space-2);
      background-color: var(--neutral-100);
      border-radius: var(--border-radius-sm);
    }
    
    @media (max-width: 768px) {
      .login-container {
        min-height: calc(100vh - 32px);
    }
      .login-card {
        padding: var(--space-4);
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      }
    });
  }
}