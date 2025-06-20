import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('usertype');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }


  if (state.url.startsWith('/admin') && userType !== 'company') {
    router.navigate(['/unauthorized']);
    return false;
  }


  if (state.url.startsWith('/user') && userType !== 'public') {
    router.navigate(['/unauthorized']);
    return false;
  }

   if (state.url.startsWith('/superadmin') && userType !== 'notetech') {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};