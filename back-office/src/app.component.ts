import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { MatMenuModule } from "@angular/material/menu";
import { Subscription } from "rxjs";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatSnackBarModule,
    MatBadgeModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport mode="side" closed>
        <mat-toolbar class="sidenav-header"  *ngIf="isAuth">
          <img src="./favicon.ico" alt="logo">
        </mat-toolbar>
        <mat-nav-list *ngIf="isAuth">
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/products" routerLinkActive="active">
            <mat-icon>inventory</mat-icon>
            <span>Products</span>
          </a>
          <a mat-list-item routerLink="/orders" routerLinkActive="active">
            <mat-icon>shopping_cart</mat-icon>
            <span>Orders</span>
          </a>
          <a mat-list-item routerLink="/customers" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            <span>Customers</span>
          </a>
          <a mat-list-item routerLink="/inventory" routerLinkActive="active">
            <mat-icon>warehouse</mat-icon>
            <span>Inventory</span>
          </a>
          <a mat-list-item routerLink="/contacts" routerLinkActive="active">
            <mat-icon>contacts</mat-icon>
            <span>Contacts</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar *ngIf="isAuth">
          <button mat-icon-button (click)="drawer.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Agrohelp Consulting</span>
          <span class="spacer"></span>
          <button mat-icon-button *ngIf="isAuth"
           [matBadge]="notificationCount"
            matBadgePosition="above after"
            matBadgeColor="warn"
            matBadgeHidden="notificationCount === 0"
          >
            <mat-icon>notifications</mat-icon>
          </button>
          <button mat-icon-button [matMenuTriggerFor]="menu" *ngIf="isAuth">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="logout()">
                <mat-icon>logout</mat-icon>
                <span>logout</span>
            </button>
          </mat-menu>
        </mat-toolbar>
        
        <div class="main-content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .mat-toolbar {
      color: #ffffff;
      background-color: #058F00;
    }

    .sidenav-container {
      height: 100vh;
    }
    
    .sidenav {
      width: 250px;
      background: #f8f9fa;
      border-right: 1px solid #e0e0e0;
    }
    
    .sidenav-header {
      /*background: #9EC44B;*/
      background: #ffffff;
      color: white;
      font-weight: 500;
      justify-content: center;
    }
    
    .mat-mdc-list-item.active {
      background-color: #e3f2fd;
      color: #009430;
    }
    
    .mat-mdc-list-item.active .mat-icon {
      color: #59AE2D;
    }
    
    .mat-mdc-list-item {
      margin: 4px 8px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    
    .mat-mdc-list-item:hover {
      background-color: rgba(25, 118, 210, 0.1);
    }
    
    .mat-mdc-list-item .mat-icon {
      margin-right: 16px;
      color: #666;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    .main-content {
      padding: 24px;
      min-height: calc(100vh - 64px);
      background: #f5f5f5;
    }
    
    @media (max-width: 768px) {
      .sidenav {
        width: 100%;
      }
      
      .main-content {
        padding: 16px;
      }
    }
  `]
})
export class App implements OnInit, OnDestroy {
    isAuth: boolean = false;
    notificationCount = 0;
    private orderSub!: Subscription;
    constructor(
      private authService: AuthService, 
      private snackBar: MatSnackBar) {}

    ngOnInit(): void {
      this.authService.isAuthenticated$.subscribe(isAuth => {
        this.isAuth = isAuth;
      });
    }

    logout() {
      this.authService.logout();
    }

    ngOnDestroy() {
      if (this.orderSub) this.orderSub.unsubscribe();
    }
}