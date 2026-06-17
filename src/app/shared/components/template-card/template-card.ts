import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CATEGORY_LABELS,
  DesignDocument,
  TemplateDefinition,
} from '../../../core/models/design.model';
import { DesignPreview } from '../design-preview/design-preview';

/** Gallery card showing a live template preview with a hover "use" action. */
@Component({
  selector: 'app-template-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DesignPreview],
  template: `
    <article class="tpl">
      <div class="tpl__preview">
        <div class="tpl__canvas">
          <app-design-preview [design]="doc()" />
        </div>
        <div class="tpl__overlay">
          <a class="tpl__use" [routerLink]="['/editor']" [queryParams]="{ template: template().id }">
            השתמשו בתבנית
          </a>
        </div>
        <span class="tpl__badge">{{ categoryLabel() }}</span>
      </div>
      <div class="tpl__meta">
        <h3>{{ template().name }}</h3>
        <p>{{ template().tagline }}</p>
      </div>
    </article>
  `,
  styleUrl: './template-card.scss',
})
export class TemplateCard {
  readonly template = input.required<TemplateDefinition>();

  readonly doc = computed<DesignDocument>(() => ({
    ...this.template().design,
    title: this.template().name,
  }));

  readonly categoryLabel = computed(() => CATEGORY_LABELS[this.template().category]);
}
