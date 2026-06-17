import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DesignDocument, DesignElement } from '../../../core/models/design.model';
import { STICKERS } from '../../../data/stickers/stickers.data';

/**
 * Read-only renderer for a DesignDocument. Uses CSS container-query units
 * (cqw/cqh) so the invitation scales perfectly to whatever size the host
 * gives it — used in template cards, the designs dashboard, and as the basis
 * for PNG/PDF export. The interactive editor canvas (Phase 2) renders the
 * same elements with selection handles on top.
 */
@Component({
  selector: 'app-design-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stage" [style.background]="bg()">
      @for (el of design().elements; track el.id) {
        <div class="el" [style.left.%]="el.x" [style.top.%]="el.y"
             [style.width.%]="el.width" [style.height.%]="el.height"
             [style.transform]="'rotate(' + el.rotation + 'deg)'"
             [style.opacity]="el.opacity">
          @switch (el.type) {
            @case ('text') {
              <div class="text" [style.font-family]="text(el).fontFamily"
                   [style.font-size.cqh]="text(el).fontSize"
                   [style.color]="text(el).color"
                   [style.text-align]="text(el).align"
                   [style.font-weight]="text(el).bold ? 800 : 400"
                   [style.font-style]="text(el).italic ? 'italic' : 'normal'"
                   [style.text-decoration]="text(el).underline ? 'underline' : 'none'"
                   [style.letter-spacing.cqw]="text(el).letterSpacing"
                   [style.line-height]="text(el).lineHeight">{{ text(el).text }}</div>
            }
            @case ('shape') {
              @switch (shape(el).shape) {
                @case ('line') {
                  <div class="line" [style.background]="shape(el).fill"></div>
                }
                @case ('circle') {
                  <div class="fill" [style.background]="shape(el).fill"
                       [style.border-radius.%]="50"
                       [style.border]="shape(el).strokeWidth + 'cqw solid ' + shape(el).stroke"></div>
                }
                @case ('frame') {
                  <div class="fill" [style.border]="shape(el).strokeWidth + 'cqw solid ' + shape(el).stroke"
                       [style.border-radius.cqw]="shape(el).radius"></div>
                }
                @default {
                  <div class="fill" [style.background]="shape(el).fill"
                       [style.border-radius.cqw]="shape(el).radius"
                       [style.border]="shape(el).strokeWidth + 'cqw solid ' + shape(el).stroke"></div>
                }
              }
            }
            @case ('sticker') {
              <div class="sticker" [style.color]="sticker(el).color"
                   [innerHTML]="svgFor(sticker(el).stickerId)"></div>
            }
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .stage {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        container-type: size;
        background-size: cover;
        background-position: center;
      }
      .el {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .text {
        width: 100%;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .fill {
        width: 100%;
        height: 100%;
      }
      .line {
        width: 100%;
        height: 100%;
        border-radius: 99px;
      }
      .sticker {
        width: 100%;
        height: 100%;
      }
      .sticker ::ng-deep svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class DesignPreview {
  private readonly sanitizer = inject(DomSanitizer);
  readonly design = input.required<DesignDocument>();

  bg(): string {
    const b = this.design().background;
    return b.value;
  }

  // Typed narrowing helpers for the template (keeps it readable).
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
