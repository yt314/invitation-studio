import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

/** Protects routes that require a signed-in user (My Designs, Profile).
 *  Waits for the initial Firebase auth state before deciding, so a page
 *  refresh on a protected route doesn't bounce a logged-in user to login. */
export const authGuard: CanActivateFn = async (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  await auth.whenReady();

  if (auth.isLoggedIn()) {
    return true;
  }

  toast.info('יש להתחבר כדי לגשת לעמוד זה');
  return router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};
