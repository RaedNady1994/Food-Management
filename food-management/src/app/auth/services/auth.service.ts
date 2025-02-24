import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyRequest,
} from '../interfaces/auth.interfaces';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://upskilling-egypt.com:3006/api/v1';

  constructor(private http: HttpClient) {
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/Users/login`,
      credentials
    );
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    const formData = this.createFormData<RegisterRequest>(userData);
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/Users/Register`,
      formData
    );
  }

  verify(credentials: VerifyRequest): Observable<LoginResponse> {
    return this.http.put<LoginResponse>(
      `${this.baseUrl}/Users/verify`,
      credentials
    );
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getRole(): string {
    let token: any = this.getToken();
    if (token !== null) {
      let decoded: any = jwtDecode(token);
      return decoded.userGroup;
    }
    return '';
  }

  private createFormData<T extends Record<string, any>>(data: T): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value != null) {
        formData.append(
          key,
          value instanceof File || value instanceof Blob ? value : String(value)
        );
      }
    });

    return formData;
  }
}
