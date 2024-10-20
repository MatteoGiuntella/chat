import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private basicUrlLogin = 'https://your-api-url.com/login';
  private basicUrlRefresh = 'https://your-api-url.com/refresh'; 

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    const encryptedUsername = btoa(user.username);
    const encryptedPassword = btoa(user.password);

    const loginData = {
      username: encryptedUsername,
      password: encryptedPassword
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.basicUrlLogin, loginData, { headers });
  }

  refreshToken(refreshToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.basicUrlRefresh, { refreshToken }, { headers });
  }
}
