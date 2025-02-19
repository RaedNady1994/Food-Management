import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loginForm: FormGroup;
    isHide = true;
    errorMessage = '';
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  
    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }
  
    sendData() {
      if (this.loginForm.invalid) return;
  
      const loginData: LoginRequest = this.loginForm.value; 
  
      this.authService.login(loginData).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err)
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      });
    }
  }
  