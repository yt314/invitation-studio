import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DesignDocument } from '../../core/models/design.model';
import { Button } from '../../shared/components/button/button';
import { DesignPreview } from '../../shared/components/design-preview/design-preview';

@Component({
  selector: 'app-my-designs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, DesignPreview],
  templateUrl: './my-designs.html',
  styleUrl: './my-designs.scss',
})
export class MyDesigns {
  readonly auth = inject(AuthService);

  /** Phase 1: no persistence yet — shows the loading then empty state.
   *  Phase 4 replaces this with a live Firestore query for the user. */
  readonly loading = signal(true);
  readonly designs = signal<DesignDocument[]>([]);

  constructor() {
    // Simulate the initial fetch so the loading skeleton is visible.
    setTimeout(() => this.loading.set(false), 600);
  }
}
