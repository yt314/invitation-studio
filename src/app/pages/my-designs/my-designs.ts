import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { DesignService } from '../../core/services/design.service';
import { ToastService } from '../../core/services/toast.service';
import { DesignDocument } from '../../core/models/design.model';
import { Button } from '../../shared/components/button/button';
import { DesignPreview } from '../../shared/components/design-preview/design-preview';
import { Modal } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-my-designs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, DesignPreview, Modal],
  templateUrl: './my-designs.html',
  styleUrl: './my-designs.scss',
})
export class MyDesigns {
  readonly auth = inject(AuthService);
  private readonly designService = inject(DesignService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly designs = signal<DesignDocument[]>([]);
  /** Design pending deletion confirmation. */
  readonly deleteTarget = signal<DesignDocument | null>(null);
  /** Id of a design currently being duplicated (for per-card spinner). */
  readonly busyId = signal<string | null>(null);

  constructor() {
    // Reload whenever the signed-in user changes (and on first load).
    effect(() => {
      const user = this.auth.user();
      if (user) {
        this.fetch(user.uid);
      } else {
        this.designs.set([]);
        this.loading.set(false);
      }
    });
  }

  private async fetch(uid: string): Promise<void> {
    this.loading.set(true);
    try {
      this.designs.set(await this.designService.listByUser(uid));
    } catch {
      this.toast.error('טעינת העיצובים נכשלה');
    } finally {
      this.loading.set(false);
    }
  }

  edit(d: DesignDocument): void {
    this.router.navigate(['/editor', d.id]);
  }

  async duplicate(d: DesignDocument): Promise<void> {
    const user = this.auth.user();
    if (!user) return;
    this.busyId.set(d.id ?? null);
    try {
      await this.designService.duplicate(d, user.uid);
      this.toast.success('נוצר עותק חדש של העיצוב ✓');
      await this.fetch(user.uid);
    } catch {
      this.toast.error('שכפול העיצוב נכשל');
    } finally {
      this.busyId.set(null);
    }
  }

  askDelete(d: DesignDocument): void {
    this.deleteTarget.set(d);
  }

  async confirmDelete(): Promise<void> {
    const d = this.deleteTarget();
    if (!d?.id) return;
    try {
      await this.designService.remove(d.id);
      this.designs.update((list) => list.filter((x) => x.id !== d.id));
      this.toast.success('העיצוב נמחק');
    } catch {
      this.toast.error('מחיקת העיצוב נכשלה');
    } finally {
      this.deleteTarget.set(null);
    }
  }

  formatDate(ts?: number): string {
    return ts
      ? new Date(ts).toLocaleDateString('he-IL', { day: 'numeric', month: 'short', year: 'numeric' })
      : '';
  }
}
