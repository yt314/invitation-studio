import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DesignElement } from '../../../core/models/design.model';
import { EditorStateService } from '../../editor-state.service';

/** Lists all elements (top layer first) and lets the user select / reorder. */
@Component({
  selector: 'app-layers-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="layers">
      <h3 class="layers__title">שכבות</h3>

      @if (layers().length === 0) {
        <p class="layers__empty">אין עדיין אלמנטים בעיצוב.</p>
      } @else {
        <ul class="layers__list">
          @for (el of layers(); track el.id) {
            <li
              class="layer"
              [class.is-active]="el.id === state.selectedId()"
              (click)="state.select(el.id)"
            >
              <span class="layer__icon">{{ icon(el) }}</span>
              <span class="layer__label">{{ label(el) }}</span>
              <span class="layer__order">
                <button (click)="up($event)" title="קדימה" [disabled]="el.id !== state.selectedId()">⬆</button>
                <button (click)="down($event)" title="אחורה" [disabled]="el.id !== state.selectedId()">⬇</button>
              </span>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [
    `
      .layers__title {
        font-size: 15px;
        font-weight: 800;
        margin-bottom: 10px;
      }
      .layers__empty {
        font-size: 13px;
        color: var(--muted);
      }
      .layers__list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .layer {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border: 1.5px solid transparent;
        border-radius: var(--r-sm);
        cursor: pointer;
        transition: background 0.14s, border-color 0.14s;
      }
      .layer:hover {
        background: var(--surface-3);
      }
      .layer.is-active {
        background: var(--brand-50);
        border-color: var(--brand-200);
      }
      .layer__icon {
        width: 22px;
        text-align: center;
        font-weight: 800;
        color: var(--brand-700);
      }
      .layer__label {
        flex: 1;
        font-size: 13px;
        font-weight: 600;
        color: var(--ink);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .layer__order {
        display: flex;
        gap: 2px;
      }
      .layer__order button {
        background: none;
        border: none;
        font-size: 12px;
        padding: 3px 5px;
        border-radius: 5px;
        color: var(--ink-soft);
        transition: background 0.14s, opacity 0.14s;
      }
      .layer__order button:hover:not(:disabled) {
        background: var(--line);
      }
      .layer__order button:disabled {
        opacity: 0.25;
      }
    `,
  ],
})
export class LayersPanel {
  readonly state = inject(EditorStateService);

  /** Top layer (last in array) shown first. */
  readonly layers = computed(() => [...this.state.design().elements].reverse());

  icon(el: DesignElement): string {
    if (el.type === 'text') return 'T';
    if (el.type === 'sticker') return '✦';
    return '◻';
  }

  label(el: DesignElement): string {
    if (el.type === 'text') return el.text || 'טקסט';
    if (el.type === 'sticker') return 'מדבקה';
    const names: Record<string, string> = {
      rectangle: 'מלבן',
      circle: 'עיגול',
      line: 'קו',
      frame: 'מסגרת',
    };
    return names[el.shape] ?? 'צורה';
  }

  up(event: Event): void {
    event.stopPropagation();
    this.state.bringForward();
  }

  down(event: Event): void {
    event.stopPropagation();
    this.state.sendBackward();
  }
}
