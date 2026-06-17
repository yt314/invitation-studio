import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { EditorStateService } from '../../editor-state.service';
import { EditorTab } from '../../editor.types';
import { BACKGROUNDS } from '../../../data/backgrounds/backgrounds.data';
import { ColorPalette } from '../../../shared/components/color-palette/color-palette';

/**
 * Contextual left panel. Shows either the "add elements" tools or the
 * background chooser, depending on the active tab from the toolbar.
 */
@Component({
  selector: 'app-assets-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ColorPalette],
  templateUrl: './assets-panel.html',
  styleUrl: './assets-panel.scss',
})
export class AssetsPanel {
  readonly state = inject(EditorStateService);
  readonly tab = input.required<EditorTab>();

  readonly bgGroups = computed(() => ({
    solid: BACKGROUNDS.filter((b) => b.group === 'solid'),
    gradient: BACKGROUNDS.filter((b) => b.group === 'gradient'),
    pattern: BACKGROUNDS.filter((b) => b.group === 'pattern'),
  }));

  get currentSolid(): string {
    const bg = this.state.design().background;
    return bg.type === 'solid' ? bg.value : '#ffffff';
  }
}
