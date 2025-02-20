import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/auth.interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isHide = true;
  isHideConfirm = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      profileImage: [null],
    });

    this.registerForm.setValidators(this.passwordMatchValidator());
  }

  get userName() {
    return this.registerForm.get('userName');
  }
  get country() {
    return this.registerForm.get('country');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get profileImage() {
    return this.registerForm.get('profileImage');
  }

  passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl) => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ profileImage: file });
    }
  }

  sendData() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fix the errors before submitting.';
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
      },
      error: (errorResponse) => {
        if (errorResponse.error?.additionalInfo?.errors) {
          const errors = errorResponse.error.additionalInfo.errors;

          this.errorMessage = Object.values(errors).flat().join(' ');
        } else {
          this.errorMessage = errorResponse.error?.message;
        }

        this.toastr.error(this.errorMessage, 'Error');
      },
    });
  }
}
