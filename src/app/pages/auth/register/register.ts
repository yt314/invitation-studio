import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, Button],
  templateUrl: './register.html',
  styleUrl: '../auth.scss',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async submit(): Promise<void> {
    this.submitted.set(true);
    if (this.form.invalid) return;

    this.loading.set(true);
    try {
      const { name, email, password } = this.form.getRawValue();
      await this.auth.register(name, email, password);
      this.toast.success('החשבון נוצר בהצלחה! ברוכים הבאים 🎉');
      this.router.navigateByUrl('/my-designs');
    } catch {
      this.toast.error('ההרשמה נכשלה. ייתכן שהאימייל כבר בשימוש.');
    } finally {
      this.loading.set(false);
    }
  }
}
