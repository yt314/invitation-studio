import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { COLOR_PALETTES, QUICK_COLORS } from '../../../data/color-palettes/color-palettes.data';

/**
 * Reusable color picker: predefined palettes + a quick swatch row + a native
 * color input. Emits the chosen hex color. Used by the editor properties panel.
 */
@Component({
  selector: 'app-color-palette',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cp">
      <input
        class="cp__native"
        type="color"
        [value]="value()"
        (input)="pick($any($event.target).value)"
        aria-label="בחירת צבע"
      />
      <div class="cp__swatches">
        @for (c of quick; track c) {
          <button
            class="cp__sw"
            [class.is-active]="value().toLowerCase() === c.toLowerCase()"
            [style.background]="c"
            (click)="pick(c)"
            [attr.aria-label]="c"
          ></button>
        }
      </div>

      @if (showPalettes()) {
        <div class="cp__palettes">
          @for (p of palettes; track p.id) {
            <div class="cp__pal">
              <span class="cp__pal-name">{{ p.name }}</span>
              <div class="cp__pal-row">
                @for (c of p.colors; track c) {
                  <button class="cp__sw" [style.background]="c" (click)="pick(c)" [attr.aria-label]="c"></button>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './color-palette.scss',
})
export class ColorPalette {
  readonly value = input('#000000');
  readonly showPalettes = input(true);
  readonly changed = output<string>();

  readonly quick = QUICK_COLORS;
  readonly palettes = COLOR_PALETTES;

  pick(color: string): void {
    this.changed.emit(color);
  }
}
