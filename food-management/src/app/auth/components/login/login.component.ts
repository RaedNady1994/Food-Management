import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/auth.interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isHide = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  sendData() {
    if (this.loginForm.invalid) {
      
        this.toastr.error( 'Please insert valid data', 'Error');

      return;
    }

    const loginData: LoginRequest = this.loginForm.value; 

    this.authService.login(loginData).subscribe({
      next: (response) => {
        localStorage.setItem('userToken', response.token);
        this.toastr.success('Login Successful!', 'Success');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.toastr.error( err.error.message + ', Please try again.', 'Error');
      }
    });
  }
}
