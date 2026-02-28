import { inject } from '@angular/core';
import { CanActivateFn ,Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  // const token=localStorage.getItem("accessToken");
  // if(token)
  // {
  //   return true;
  // }
  // else
  // { 
  //   router.navigate(['/dashboard']);
  //   return false;
  // }

  const userId = localStorage.getItem('User_id');
  const token = localStorage.getItem('Token');

  if (token) {
    return true; 
  }
  else 
  { 
    router.navigate([' ']);
    return false;
  }
};
