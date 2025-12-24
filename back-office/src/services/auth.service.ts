import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  updatedAt: Date;
  createdAt: Date;
  status: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected API_URL = environment.apiUrl+'/auth/login'; 
  private http = inject(HttpClient);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticated.asObservable();
  
  constructor(private router: Router) {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticated.next(true);
    }
  }
  
  login(email: string, password: string): Observable<{data: AuthResponse}> {
    return this.http.post<any>(this.API_URL, {email, password} ).pipe(
      tap(res => {
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        this.currentUserSubject.next(res.data.user);
        this.isAuthenticated.next(true);
        return this.currentUser$;
    }));
    
    return throwError(() => new Error('Invalid email or password'));
  }
  
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticated.next(false);
    this.router.navigate(['/auth/login']);
  }
  
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  
  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }
}