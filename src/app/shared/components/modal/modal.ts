import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * Accessible modal dialog with backdrop. Controlled via the `open` input;
 * emits `closed` when the backdrop or close button is used.
 */
@Component({
  selector: 'app-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div class="backdrop" (click)="closed.emit()">
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          (click)="$event.stopPropagation()"
        >
          <header class="dialog__head">
            <h3>{{ heading() }}</h3>
            <button class="dialog__x" (click)="closed.emit()" aria-label="סגירה">✕</button>
          </header>
          <div class="dialog__body">
            <ng-content />
          </div>
          @if (showFooter()) {
            <footer class="dialog__foot">
              <ng-content select="[modal-footer]" />
            </footer>
          }
        </div>
      </div>
    }
  `,
  styles: [
    `
      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 3000;
        background: rgba(27, 24, 48, 0.45);
        backdrop-filter: blur(4px);
        display: grid;
        place-items: center;
        padding: 20px;
        animation: fade-in 0.2s ease both;
      }
      .dialog {
        width: 100%;
        max-width: 480px;
        max-height: 88vh;
        overflow: auto;
        background: var(--surface);
        border-radius: var(--r-xl);
        box-shadow: var(--sh-xl);
        animation: pop-in 0.28s var(--ease) both;
      }
      .dialog__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px;
        border-bottom: 1px solid var(--line);
      }
      .dialog__head h3 {
        font-size: 19px;
        font-weight: 800;
      }
      .dialog__x {
        background: var(--surface-3);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: var(--ink-soft);
        font-size: 13px;
        transition: background 0.15s, color 0.15s;
      }
      .dialog__x:hover {
        background: var(--line-strong);
        color: var(--ink);
      }
      .dialog__body {
        padding: 24px;
      }
      .dialog__foot {
        display: flex;
        gap: 10px;
        justify-content: flex-start;
        padding: 0 24px 24px;
      }
    `,
  ],
})
export class Modal {
  readonly open = input(false);
  readonly heading = input('');
  readonly showFooter = input(true);
  readonly closed = output<void>();
}
