import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authservice = inject(AuthService);
  const router = inject(Router);

  if(authservice.isAuthenticated())
    return true;

    router.navigate(['/auth']);
  return false;
};
