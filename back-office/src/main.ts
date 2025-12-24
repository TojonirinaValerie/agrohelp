import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { App } from './app.component';
import { TokenInterceptorService } from './services/token-interceptor.service';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    provideAnimationsAsync()
  ]
});