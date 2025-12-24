import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let cloned;
        if(req.url.includes('/login') || req.url.includes('/register') || (req.method === 'GET' && (req.url.includes('/api/product-image'))) ) {
            return next.handle(req);
        } else {
            const token = localStorage.getItem('refreshToken');
            if((req.method === 'POST' || req.method === 'PUT') && req.body instanceof FormData) {
                cloned = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${ token }`
                    }
                });
            } else {
                cloned = req.clone({
                    setHeaders: {
                        'Content-Type': 'application/json; charset=utf-8',
                        Accept: 'application/json',
                        Authorization: `Bearer ${ token }`
                    }
                });
            }

            return next.handle(cloned)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if(error && error.status === 401) {
                        console.log("ERROR 401 UNAUTHORIZED");
                        this.router.navigate(['/auth/login']);
                    }
                    const err = error.error.message || error.statusText;
                    return throwError(() => err);
                })
            );
        }      
    }
}