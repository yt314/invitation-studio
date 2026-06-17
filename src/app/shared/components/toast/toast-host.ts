import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'toast-host' },
  template: `
    @for (t of toast.toasts(); track t.id) {
      <div class="toast toast--{{ t.type }}" role="status">
        <span class="toast__icon">
          @switch (t.type) {
            @case ('success') { ✓ }
            @case ('error') { ✕ }
            @default { ℹ }
          }
        </span>
        <span class="toast__msg">{{ t.message }}</span>
        <button class="toast__close" (click)="toast.dismiss(t.id)" aria-label="סגירה">✕</button>
      </div>
    }
  `,
  styles: [
    `
      .toast-host {
        position: fixed;
        bottom: 24px;
        inset-inline-start: 24px;
        z-index: 4000;
        display: flex;
        flex-direction: column;
        gap: 12px;
        pointer-events: none;
      }
      .toast {
        pointer-events: auto;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 260px;
        max-width: 380px;
        padding: 13px 16px;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: var(--r-md);
        box-shadow: var(--sh-lg);
        animation: pop-in 0.32s var(--ease) both;
      }
      .toast__icon {
        display: grid;
        place-items: center;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        color: #fff;
        font-size: 13px;
        font-weight: 800;
        flex: none;
      }
      .toast--success .toast__icon { background: var(--success); }
      .toast--error .toast__icon { background: var(--danger); }
      .toast--info .toast__icon { background: var(--info); }
      .toast--success { border-inline-start: 3px solid var(--success); }
      .toast--error { border-inline-start: 3px solid var(--danger); }
      .toast--info { border-inline-start: 3px solid var(--info); }
      .toast__msg {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--ink);
      }
      .toast__close {
        background: none;
        border: none;
        color: var(--muted);
        font-size: 12px;
        padding: 4px;
        border-radius: 6px;
        transition: background 0.15s, color 0.15s;
      }
      .toast__close:hover {
        background: var(--surface-3);
        color: var(--ink);
      }
    `,
  ],
})
export class ToastHost {
  readonly toast = inject(ToastService);
}
