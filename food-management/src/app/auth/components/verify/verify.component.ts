import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest, VerifyRequest } from '../../interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
 verifyForm: FormGroup;
  isHide = true;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.verifyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required]]
    });
  }

  get email() { return this.verifyForm.get('email'); }
  get code() { return this.verifyForm.get('code'); }

  sendData() {
    if (this.verifyForm.invalid) {
        this.toastr.error( 'Please insert valid data', 'Error');
      return;
    }

    const verifyData: VerifyRequest = this.verifyForm.value; 

    this.authService.verify(verifyData).subscribe({
      next: (response) => {
        this.toastr.success('Your account has been verified! You can now log in.', 'Success');
        this.router.navigateByUrl('/auth/login');
      },
      error: (err) => {
         
        this.toastr.error( err.error.message + ', Please try again.', 'Error');
      }
    });
  }
}