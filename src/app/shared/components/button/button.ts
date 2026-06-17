import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
type Size = 'sm' | 'md' | 'lg';

/**
 * Reusable button. Renders as an <a routerLink> when `link` is provided,
 * otherwise as a <button>. Supports variants, sizes and a loading state.
 */
@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgTemplateOutlet],
  template: `
    @if (link()) {
      <a
        [routerLink]="link()"
        class="btn btn--{{ variant() }} btn--{{ size() }}"
        [class.btn--block]="block()"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <button
        class="btn btn--{{ variant() }} btn--{{ size() }}"
        [class.btn--block]="block()"
        [class.btn--loading]="loading()"
        [disabled]="disabled() || loading()"
        [type]="type()"
        (click)="pressed.emit()"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </button>
    }

    <ng-template #content>
      @if (loading()) {
        <span class="btn__spinner"></span>
      }
      <ng-content />
    </ng-template>
  `,
  styleUrl: './button.scss',
})
export class Button {
  readonly variant = input<Variant>('primary');
  readonly size = input<Size>('md');
  readonly link = input<string | null>(null);
  readonly block = input(false);
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly type = input<'button' | 'submit'>('button');
  readonly pressed = output<void>();
}
