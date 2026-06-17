import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  DesignElement,
  ShapeElement,
  StickerElement,
  TextAlign,
  TextElement,
} from '../../../core/models/design.model';
import { FONTS } from '../../../data/fonts/fonts.data';
import { ColorPalette } from '../../../shared/components/color-palette/color-palette';
import { EditorStateService } from '../../editor-state.service';

/** Right-hand panel: edits the currently selected element. */
@Component({
  selector: 'app-properties-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ColorPalette],
  templateUrl: './properties-panel.html',
  styleUrl: './properties-panel.scss',
})
export class PropertiesPanel {
  readonly state = inject(EditorStateService);
  readonly fonts = FONTS;

  readonly selected = this.state.selected;
  readonly asText = computed<TextElement | null>(() => {
    const s = this.selected();
    return s?.type === 'text' ? s : null;
  });
  readonly asShape = computed<ShapeElement | null>(() => {
    const s = this.selected();
    return s?.type === 'shape' ? s : null;
  });
  readonly asSticker = computed<StickerElement | null>(() => {
    const s = this.selected();
    return s?.type === 'sticker' ? s : null;
  });

  readonly aligns: { id: TextAlign; icon: string; label: string }[] = [
    { id: 'right', icon: '⬛▬▬', label: 'ימין' },
    { id: 'center', icon: '▬⬛▬', label: 'מרכז' },
    { id: 'left', icon: '▬▬⬛', label: 'שמאל' },
  ];

  patch(p: Partial<DesignElement>): void {
    this.state.patchSelected(p);
  }

  /* Continuous controls (sliders) coalesce into a single undo step. */
  sliderStart(): void {
    this.state.beginChange();
  }
  sliderEnd(): void {
    this.state.endChange();
  }
  live(p: Partial<DesignElement>): void {
    this.state.livePatchSelected(p);
  }

  num(value: string): number {
    return Number(value);
  }
}
