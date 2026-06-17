import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditorStateService } from '../../editor-state.service';
import { EditorTab } from '../../editor.types';
import { BACKGROUNDS } from '../../../data/backgrounds/backgrounds.data';
import { STICKERS, STICKER_GROUPS } from '../../../data/stickers/stickers.data';
import { TEMPLATES } from '../../../data/templates/templates.data';
import { DesignDocument, TemplateDefinition } from '../../../core/models/design.model';
import { ColorPalette } from '../../../shared/components/color-palette/color-palette';
import { DesignPreview } from '../../../shared/components/design-preview/design-preview';
import { ToastService } from '../../../core/services/toast.service';

/**
 * Contextual left panel. Shows one of four toolsets based on the active tab:
 * templates · add elements · stickers · background.
 */
@Component({
  selector: 'app-assets-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ColorPalette, DesignPreview],
  templateUrl: './assets-panel.html',
  styleUrl: './assets-panel.scss',
})
export class AssetsPanel {
  readonly state = inject(EditorStateService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly toast = inject(ToastService);

  readonly tab = input.required<EditorTab>();

  readonly templates = TEMPLATES;
  readonly stickerGroups = STICKER_GROUPS;

  readonly bgGroups = computed(() => ({
    decorative: BACKGROUNDS.filter((b) => b.group === 'decorative'),
    solid: BACKGROUNDS.filter((b) => b.group === 'solid'),
    gradient: BACKGROUNDS.filter((b) => b.group === 'gradient'),
    pattern: BACKGROUNDS.filter((b) => b.group === 'pattern'),
  }));

  get currentSolid(): string {
    const bg = this.state.design().background;
    return bg.type === 'solid' ? bg.value : '#ffffff';
  }

  /** Stickers belonging to a group (for the grouped grid). */
  stickersIn(group: string) {
    return STICKERS.filter((s) => s.group === group);
  }

  svgFor(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  /** A renderable design document for a template preview. */
  templateDoc(t: TemplateDefinition): DesignDocument {
    return { ...t.design, title: t.name };
  }

  applyTemplate(t: TemplateDefinition): void {
    this.state.applyTemplate(this.templateDoc(t));
    this.toast.success('התבנית הוחלה על הקנבס ✨');
  }
}
