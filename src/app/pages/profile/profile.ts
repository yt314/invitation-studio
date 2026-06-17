import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  initials(name?: string): string {
    return (name ?? '?').trim().charAt(0).toUpperCase();
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.toast.success('התנתקת בהצלחה');
    this.router.navigate(['/']);
  }
}
