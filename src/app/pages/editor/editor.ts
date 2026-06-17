import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DesignDocument } from '../../core/models/design.model';
import { createBlankDesign, designFromTemplate } from '../../core/services/design-factory';
import { ToastService } from '../../core/services/toast.service';
import { DesignPreview } from '../../shared/components/design-preview/design-preview';
import { BACKGROUNDS } from '../../data/backgrounds/backgrounds.data';

type ToolId = 'select' | 'text' | 'shapes' | 'stickers' | 'background' | 'layers';

/**
 * Editor page — Phase 1 builds the full studio layout (top bar, tool rail,
 * canvas stage, side panels) and loads a template or blank design. Background
 * switching already works to demonstrate the live canvas. Phase 2 adds the
 * interactive canvas (drag/resize/rotate) and full element editing via a
 * dedicated EditorStateService.
 */
@Component({
  selector: 'app-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DesignPreview],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  readonly design = signal<DesignDocument>(createBlankDesign());
  readonly activeTool = signal<ToolId>('background');

  readonly backgrounds = BACKGROUNDS;
  readonly bgGroups = computed(() => ({
    solid: BACKGROUNDS.filter((b) => b.group === 'solid'),
    gradient: BACKGROUNDS.filter((b) => b.group === 'gradient'),
    pattern: BACKGROUNDS.filter((b) => b.group === 'pattern'),
  }));

  readonly tools: { id: ToolId; icon: string; label: string }[] = [
    { id: 'select', icon: '🖱️', label: 'בחירה' },
    { id: 'text', icon: 'T', label: 'טקסט' },
    { id: 'shapes', icon: '◻️', label: 'צורות' },
    { id: 'stickers', icon: '✨', label: 'מדבקות' },
    { id: 'background', icon: '🎨', label: 'רקע' },
    { id: 'layers', icon: '📑', label: 'שכבות' },
  ];

  constructor() {
    const templateId = this.route.snapshot.queryParamMap.get('template');
    if (templateId) {
      const d = designFromTemplate(templateId);
      if (d) {
        this.design.set(d);
        this.toast.info('התבנית נטענה — אפשר להתחיל לערוך');
      }
    }
  }

  selectTool(id: ToolId): void {
    this.activeTool.set(id);
  }

  setBackground(value: string, type: 'solid' | 'gradient' | 'pattern'): void {
    this.design.update((d) => ({ ...d, background: { type, value } }));
  }

  setTitle(value: string): void {
    this.design.update((d) => ({ ...d, title: value }));
  }

  comingSoon(): void {
    this.toast.info('כלי זה מתווסף בשלב הבא של העורך ✨');
  }
}
