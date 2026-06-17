import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { EditorStateService } from '../../editor-state.service';
import { EditorTab } from '../../editor.types';

/**
 * Slim left tool rail: switches the contextual panel (add / background) and
 * exposes the global history + reset actions.
 */
@Component({
  selector: 'app-editor-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rail">
      <div class="rail__group">
        <button class="tool" [class.is-active]="tab() === 'templates'" (click)="tabChange.emit('templates')" title="תבניות">
          <span class="tool__icon">🖼️</span>
          <span class="tool__label">תבניות</span>
        </button>
        <button class="tool" [class.is-active]="tab() === 'add'" (click)="tabChange.emit('add')" title="הוספת אלמנטים">
          <span class="tool__icon">➕</span>
          <span class="tool__label">הוספה</span>
        </button>
        <button class="tool" [class.is-active]="tab() === 'stickers'" (click)="tabChange.emit('stickers')" title="מדבקות וקישוטים">
          <span class="tool__icon">✨</span>
          <span class="tool__label">מדבקות</span>
        </button>
        <button class="tool" [class.is-active]="tab() === 'background'" (click)="tabChange.emit('background')" title="רקע">
          <span class="tool__icon">🎨</span>
          <span class="tool__label">רקע</span>
        </button>
      </div>

      <div class="rail__group rail__group--bottom">
        <button class="tool" [disabled]="!state.canUndo()" (click)="state.undo()" title="בטל (Ctrl+Z)">
          <span class="tool__icon">↩</span>
          <span class="tool__label">בטל</span>
        </button>
        <button class="tool" [disabled]="!state.canRedo()" (click)="state.redo()" title="בצע שוב (Ctrl+Shift+Z)">
          <span class="tool__icon">↪</span>
          <span class="tool__label">שחזר</span>
        </button>
        <button class="tool tool--danger" (click)="reset.emit()" title="איפוס העיצוב">
          <span class="tool__icon">🗑</span>
          <span class="tool__label">איפוס</span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .rail {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 12px 8px;
      }
      .rail__group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .tool {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        background: none;
        border: none;
        border-radius: var(--r-md);
        padding: 11px 4px;
        color: var(--ink-soft);
        transition: background 0.16s, color 0.16s, opacity 0.16s;
      }
      .tool__icon {
        font-size: 18px;
      }
      .tool__label {
        font-size: 11px;
        font-weight: 600;
      }
      .tool:hover:not(:disabled) {
        background: var(--surface-3);
        color: var(--ink);
      }
      .tool.is-active {
        background: var(--brand-50);
        color: var(--brand-700);
      }
      .tool:disabled {
        opacity: 0.4;
      }
      .tool--danger:hover:not(:disabled) {
        background: #fdeaea;
        color: var(--danger);
      }
    `,
  ],
})
export class EditorToolbar {
  readonly state = inject(EditorStateService);
  readonly tab = input.required<EditorTab>();
  readonly tabChange = output<EditorTab>();
  readonly reset = output<void>();
}
