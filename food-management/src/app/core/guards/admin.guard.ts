import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
 
   const authservice = inject(AuthService);
   const router = inject(Router);
 
   if(authservice.getRole() === 'SuperAdmin')
     return true;
 
    router.navigate(['/auth']);
   return false;
};
