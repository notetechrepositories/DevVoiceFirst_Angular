
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('usertype');

  if (token) {
    // Redirect based on userType
    if (userType === 'company') {
      router.navigate(['/admin']);
    }
    else if( userType === 'public') {
      router.navigate(['/user']);
    }
    else if( userType === 'notetech'){
      router.navigate(['/superadmin']);
    }
    return false;
  }

  return true;
};
