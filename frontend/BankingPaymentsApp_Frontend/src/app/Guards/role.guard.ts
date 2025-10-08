import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data?.['role'];
  const userRole = auth.getUserRole();

  if (auth.isLoggedIn() && userRole === expectedRole) {
    return true; 
  } else {
    auth.logout();
    return router.createUrlTree(['/login']);
  }
};
