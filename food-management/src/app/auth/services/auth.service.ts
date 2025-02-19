import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://upskilling-egypt.com:3006';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/v1/Users/login`, credentials);
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    const formData = new FormData();
    formData.append('userName', userData.userName);
    formData.append('email', userData.email);
    formData.append('country', userData.country);
    formData.append('phoneNumber', userData.phoneNumber);
    formData.append('password', userData.password);
    formData.append('confirmPassword', userData.confirmPassword);
    formData.append('profileImage', userData.profileImage);

    return this.http.post<RegisterResponse>(`${this.baseUrl}/api/v1/Users/Register`, formData);
  }
}
