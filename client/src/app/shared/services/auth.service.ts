import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { User } from '../models/user';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null;

  constructor(
    private http: HttpClient
  ) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', user)
      .pipe(
        tap(
          (loginResponse: LoginResponse) => {
            this.setToken(loginResponse.token);
          }
        )
      );
  }

  setToken(token: string) {
    this.token = token;

    if (token) {
      if (!localStorage.getItem('auth-token') || localStorage.getItem('auth-token') !== token) {
        localStorage.setItem('auth-token', token);
      }
    } else {
      localStorage.clear();
    }
  }

  getToken(): string {
    return this.token;
  }

  iaAuthenticated(): boolean {
    return !!this.token;
  }

  logOut() {
    this.setToken(null);
  }
}
