import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (!authService.isLoggedIn()) {
    router.navigate(["/signin"]);
    return false;
  }

  const userRole = authService.getUserRole(); // JWT se role nikalna
  const allowedRoles = route.data?.["roles"];

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    router.navigate(["/unauthorized"]);
    return false;
  }

  return true;
};
