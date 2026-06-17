import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

/** Protects routes that require a signed-in user (My Designs, Profile). */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (auth.isLoggedIn()) {
    return true;
  }

  toast.info('יש להתחבר כדי לגשת לעמוד זה');
  return router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};
