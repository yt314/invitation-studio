import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  viewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DesignElement } from '../../../core/models/design.model';
import { STICKERS } from '../../../data/stickers/stickers.data';
import { EditorStateService } from '../../editor-state.service';

type ResizeDir = 'nw' | 'ne' | 'sw' | 'se';

interface DragStart {
  pointerX: number;
  pointerY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Interactive editing canvas. Renders the design's elements as absolutely
 * positioned DOM nodes (percent-based, so it scales) and handles selection,
 * drag-to-move and corner resizing via pointer events. RTL/Hebrew text works
 * natively because these are real DOM elements.
 */
@Component({
  selector: 'app-canvas-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './canvas-editor.html',
  styleUrl: './canvas-editor.scss',
})
export class CanvasEditor {
  readonly state = inject(EditorStateService);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly stageRef = viewChild.required<ElementRef<HTMLElement>>('stage');

  private mode: 'move' | 'resize' | null = null;
  private dir: ResizeDir = 'se';
  private start: DragStart | null = null;

  /* ----------------------------- Pointer ------------------------------ */

  onElementPointerDown(event: PointerEvent, el: DesignElement): void {
    event.stopPropagation();
    this.state.select(el.id);
    this.begin(event, 'move', 'se', el);
  }

  onHandlePointerDown(event: PointerEvent, dir: ResizeDir): void {
    event.stopPropagation();
    const sel = this.state.selected();
    if (!sel) return;
    this.begin(event, 'resize', dir, sel);
  }

  onStagePointerDown(): void {
    // Clicking empty canvas deselects.
    this.state.select(null);
  }

  private begin(event: PointerEvent, mode: 'move' | 'resize', dir: ResizeDir, el: DesignElement): void {
    this.mode = mode;
    this.dir = dir;
    this.start = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      x: el.x,
      y: el.y,
      width: el.width,
      height: el.height,
    };
    this.state.beginChange();
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.mode || !this.start) return;
    const rect = this.stageRef().nativeElement.getBoundingClientRect();
    const dx = ((event.clientX - this.start.pointerX) / rect.width) * 100;
    const dy = ((event.clientY - this.start.pointerY) / rect.height) * 100;

    if (this.mode === 'move') {
      this.state.livePatchSelected({
        x: this.clamp(this.start.x + dx, -40, 100),
        y: this.clamp(this.start.y + dy, -40, 100),
      });
    } else {
      this.state.livePatchSelected(this.resize(dx, dy));
    }
  }

  @HostListener('document:pointerup')
  onPointerUp(): void {
    if (this.mode) {
      this.state.endChange();
      this.mode = null;
      this.start = null;
    }
  }

  private resize(dx: number, dy: number): Partial<DesignElement> {
    const s = this.start!;
    let { x, y, width, height } = s;
    if (this.dir.includes('e')) width = s.width + dx;
    if (this.dir.includes('s')) height = s.height + dy;
    if (this.dir.includes('w')) {
      width = s.width - dx;
      x = s.x + dx;
    }
    if (this.dir.includes('n')) {
      height = s.height - dy;
      y = s.y + dy;
    }
    return {
      x,
      y,
      width: Math.max(5, width),
      height: Math.max(2, height),
    };
  }

  private clamp(v: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, v));
  }

  /* --------------------------- Keyboard ------------------------------- */

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;

    // Undo / redo work everywhere.
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      event.shiftKey ? this.state.redo() : this.state.undo();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') {
      event.preventDefault();
      this.state.redo();
      return;
    }

    if (typing || !this.state.selected()) return;

    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      this.state.remove();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.nudge(0, -1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.nudge(0, 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.nudge(-1, 0);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nudge(1, 0);
    }
  }

  private nudge(dx: number, dy: number): void {
    const sel = this.state.selected();
    if (!sel) return;
    this.state.patchSelected({ x: sel.x + dx, y: sel.y + dy });
  }

  /* --------------------- Template typing helpers ---------------------- */

  text(el: DesignElement) {
    return el as Extract<DesignElement, { type: 'text' }>;
  }
  shape(el: DesignElement) {
    return el as Extract<DesignElement, { type: 'shape' }>;
  }
  sticker(el: DesignElement) {
    return el as Extract<DesignElement, { type: 'sticker' }>;
  }

  svgFor(id: string): SafeHtml {
    const svg = STICKERS.find((s) => s.id === id)?.svg ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
