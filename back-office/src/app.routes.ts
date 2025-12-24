import { Routes } from '@angular/router';
import { authGuard } from './components/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.LoginComponent) 
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products/new',
    loadComponent: () => import('./components/products/product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products/edit/:id',
    loadComponent: () => import('./components/products/product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent),
    canActivate: [authGuard]
  },
  {
    path: 'customers',
    loadComponent: () => import('./components/customers/customers.component').then(m => m.CustomersComponent),
    canActivate: [authGuard]
  },
  {
    path: 'inventory',
    loadComponent: () => import('./components/inventory/inventory.component').then(m => m.InventoryComponent),
    canActivate: [authGuard]
  },
  {
    path: 'contacts',
    loadComponent: () => import('./components/contact-dashboard/contact-dashboard.component').then(m => m.ContactDashboardComponent),
    canActivate: [authGuard]
  }
];