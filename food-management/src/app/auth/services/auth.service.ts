import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://upskilling-egypt.com:3006/api/v1';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/Users/login`, credentials);
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    const formData = this.createFormData<RegisterRequest>(userData);
    return this.http.post<RegisterResponse>(`${this.baseUrl}/Users/Register`, formData);
}

createFormData<T extends Record<string, any>>(data: T): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value != null) {
      formData.append(key, value instanceof File || value instanceof Blob ? value : String(value));
    }
  });

  return formData;
}


}

