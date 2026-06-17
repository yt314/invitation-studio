import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TEMPLATES } from '../../data/templates/templates.data';
import { CATEGORY_LABELS, TemplateCategory } from '../../core/models/design.model';
import { TemplateCard } from '../../shared/components/template-card/template-card';

interface Filter {
  id: TemplateCategory | 'all';
  label: string;
}

@Component({
  selector: 'app-templates',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TemplateCard],
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
})
export class Templates {
  readonly active = signal<TemplateCategory | 'all'>('all');

  /** Build the filter chips from categories actually present in the data. */
  readonly filters = computed<Filter[]>(() => {
    const present = new Set(TEMPLATES.map((t) => t.category));
    const chips: Filter[] = [{ id: 'all', label: 'הכול' }];
    (Object.keys(CATEGORY_LABELS) as TemplateCategory[])
      .filter((c) => present.has(c))
      .forEach((c) => chips.push({ id: c, label: CATEGORY_LABELS[c] }));
    return chips;
  });

  readonly visible = computed(() => {
    const a = this.active();
    return a === 'all' ? TEMPLATES : TEMPLATES.filter((t) => t.category === a);
  });

  setFilter(id: TemplateCategory | 'all'): void {
    this.active.set(id);
  }
}
