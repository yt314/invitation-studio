import { Injectable, computed, signal } from '@angular/core';
import {
  DesignDocument,
  DesignElement,
  ShapeElement,
  ShapeKind,
  TextAlign,
  TextElement,
} from '../core/models/design.model';
import { createBlankDesign } from '../core/services/design-factory';
import { DEFAULT_FONT } from '../data/fonts/fonts.data';

/**
 * Central state for the invitation editor.
 *
 * Holds the current design, the selected element, and an undo/redo history.
 * Components (canvas, toolbar, panels) all inject this single instance
 * (provided at the editor page level) so they stay in sync via signals.
 *
 * History model:
 *  - `commit()` makes a one-shot change with its own undo step (buttons).
 *  - `beginChange()` + `livePatch()` + `endChange()` coalesce a continuous
 *    interaction (dragging, typing, sliders) into a single undo step.
 */
@Injectable()
export class EditorStateService {
  private idc = 0;

  /** The design currently being edited. */
  readonly design = signal<DesignDocument>(createBlankDesign());
  /** Id of the selected element, or null. */
  readonly selectedId = signal<string | null>(null);

  readonly canUndo = signal(false);
  readonly canRedo = signal(false);

  /** The resolved selected element (or null if nothing/removed). */
  readonly selected = computed<DesignElement | null>(() => {
    const id = this.selectedId();
    if (!id) return null;
    return this.design().elements.find((e) => e.id === id) ?? null;
  });

  private past: DesignDocument[] = [];
  private future: DesignDocument[] = [];
  /** Snapshot captured at the start of a coalesced change. */
  private pendingBaseline: DesignDocument | null = null;
  /** The design as first loaded — used by reset(). */
  private initial: DesignDocument = createBlankDesign();

  /* ----------------------------- Loading ------------------------------ */

  load(design: DesignDocument): void {
    this.design.set(structuredClone(design));
    this.initial = structuredClone(design);
    this.past = [];
    this.future = [];
    this.pendingBaseline = null;
    this.selectedId.set(null);
    this.refreshFlags();
  }

  /* --------------------------- Selection ------------------------------ */

  select(id: string | null): void {
    this.selectedId.set(id);
  }

  /* --------------------------- History core --------------------------- */

  private snapshot(): DesignDocument {
    return structuredClone(this.design());
  }

  private refreshFlags(): void {
    this.canUndo.set(this.past.length > 0);
    this.canRedo.set(this.future.length > 0);
  }

  /** One-shot change with its own undo step. */
  private commit(updater: (d: DesignDocument) => DesignDocument): void {
    this.past.push(this.snapshot());
    this.future = [];
    this.design.set(updater(this.snapshot()));
    this.refreshFlags();
  }

  /** Apply a change without creating a new history step on its own. The first
   *  live change after beginChange() folds the captured baseline into history. */
  private live(updater: (d: DesignDocument) => DesignDocument): void {
    if (this.pendingBaseline) {
      this.past.push(this.pendingBaseline);
      this.pendingBaseline = null;
      this.future = [];
      this.refreshFlags();
    }
    this.design.set(updater(this.snapshot()));
  }

  beginChange(): void {
    if (!this.pendingBaseline) this.pendingBaseline = this.snapshot();
  }

  endChange(): void {
    this.pendingBaseline = null;
  }

  undo(): void {
    const prev = this.past.pop();
    if (!prev) return;
    this.future.push(this.snapshot());
    this.design.set(prev);
    this.refreshFlags();
  }

  redo(): void {
    const next = this.future.pop();
    if (!next) return;
    this.past.push(this.snapshot());
    this.design.set(next);
    this.refreshFlags();
  }

  /* --------------------- Element mutation helpers --------------------- */

  private replace(d: DesignDocument, id: string, patch: Partial<DesignElement>): DesignDocument {
    return {
      ...d,
      elements: d.elements.map((e) => (e.id === id ? ({ ...e, ...patch } as DesignElement) : e)),
    };
  }

  /** Update the selected element as one undo step (panel buttons, color, etc). */
  patchSelected(patch: Partial<DesignElement>): void {
    const id = this.selectedId();
    if (!id) return;
    this.commit((d) => this.replace(d, id, patch));
  }

  /** Update the selected element during a continuous interaction. */
  livePatchSelected(patch: Partial<DesignElement>): void {
    const id = this.selectedId();
    if (!id) return;
    this.live((d) => this.replace(d, id, patch));
  }

  /* ----------------------------- Adding ------------------------------- */

  private genId(prefix: string): string {
    return `${prefix}-${Date.now().toString(36)}-${++this.idc}`;
  }

  addText(): void {
    const el: TextElement = {
      id: this.genId('t'),
      type: 'text',
      x: 18,
      y: 44,
      width: 64,
      height: 10,
      rotation: 0,
      opacity: 1,
      text: 'טקסט חדש',
      fontFamily: DEFAULT_FONT,
      fontSize: 4,
      color: '#1b1830',
      align: 'center',
      bold: false,
      italic: false,
      underline: false,
      letterSpacing: 0,
      lineHeight: 1.3,
    };
    this.commit((d) => ({ ...d, elements: [...d.elements, el] }));
    this.select(el.id);
  }

  addShape(shape: ShapeKind): void {
    const base = {
      id: this.genId('s'),
      type: 'shape' as const,
      rotation: 0,
      opacity: 1,
      stroke: 'transparent',
      strokeWidth: 0,
      radius: shape === 'rectangle' ? 2 : 0,
    };
    const geometry =
      shape === 'line'
        ? { x: 25, y: 50, width: 50, height: 1 }
        : { x: 35, y: 40, width: 30, height: 22 };
    const el: ShapeElement = {
      ...base,
      ...geometry,
      shape,
      fill: shape === 'frame' ? 'transparent' : '#c4b5fd',
      stroke: shape === 'frame' ? '#6d28d9' : 'transparent',
      strokeWidth: shape === 'frame' ? 1 : 0,
    };
    this.commit((d) => ({ ...d, elements: [...d.elements, el] }));
    this.select(el.id);
  }

  /* --------------------------- Element ops ---------------------------- */

  duplicate(): void {
    const sel = this.selected();
    if (!sel) return;
    const copy: DesignElement = {
      ...structuredClone(sel),
      id: this.genId(sel.type[0]),
      x: Math.min(sel.x + 4, 90),
      y: Math.min(sel.y + 4, 90),
    };
    this.commit((d) => ({ ...d, elements: [...d.elements, copy] }));
    this.select(copy.id);
  }

  remove(): void {
    const id = this.selectedId();
    if (!id) return;
    this.commit((d) => ({ ...d, elements: d.elements.filter((e) => e.id !== id) }));
    this.select(null);
  }

  /** Move selected one step up the z-order (later in the array = on top). */
  bringForward(): void {
    this.reorderSelected(+1);
  }

  /** Move selected one step down the z-order. */
  sendBackward(): void {
    this.reorderSelected(-1);
  }

  private reorderSelected(dir: 1 | -1): void {
    const id = this.selectedId();
    if (!id) return;
    this.commit((d) => {
      const els = [...d.elements];
      const i = els.findIndex((e) => e.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= els.length) return d;
      [els[i], els[j]] = [els[j], els[i]];
      return { ...d, elements: els };
    });
  }

  /* --------------------------- Background ----------------------------- */

  setBackground(value: string, type: 'solid' | 'gradient' | 'pattern'): void {
    this.commit((d) => ({ ...d, background: { type, value } }));
  }

  /* --------------------------- Convenience ---------------------------- */

  setAlign(align: TextAlign): void {
    this.patchSelected({ align } as Partial<TextElement>);
  }

  setTitle(title: string): void {
    this.design.update((d) => ({ ...d, title }));
  }

  reset(): void {
    this.commit(() => structuredClone(this.initial));
    this.select(null);
  }
}
