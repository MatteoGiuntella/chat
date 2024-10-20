import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service'; // Assicurati che il percorso sia corretto

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    const expiredToken = localStorage.getItem('expiredToken');
    const currentTime = new Date().getTime();

    if (authToken && expiredToken && currentTime < Number(expiredToken)) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.handle401Error(req, next);
          }
          return throwError(error);
        })
      );
    } else if (authToken && expiredToken && currentTime >= Number(expiredToken)) {
      return this.handle401Error(req, next);
    } else {
      return next.handle(req);
    }
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = localStorage.getItem('refreshToken');
    const expiredRefreshToken = localStorage.getItem('expiredRefreshToken');
    const currentTime = new Date().getTime();

    if (refreshToken && expiredRefreshToken && currentTime < Number(expiredRefreshToken)) {
      return this.apiService.refreshToken(refreshToken).pipe(
        switchMap((response: any) => {
          if (response && response.token && response.expiredToken) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('expiredToken', response.expiredToken);

            const cloned = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${response.token}`)
            });
            return next.handle(cloned);
          }
          return throwError('Refresh token failed');
        }),
        catchError((error: any) => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('expiredToken');
          localStorage.removeItem('expiredRefreshToken');
          return throwError(error);
        })
      );
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiredToken');
      localStorage.removeItem('expiredRefreshToken');
      return throwError('Refresh token expired');
    }
  }
}
