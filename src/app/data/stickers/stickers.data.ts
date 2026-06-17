/**
 * Built-in decorative stickers as inline SVG (use `currentColor` so the
 * editor can recolor them). No external/paid assets. Grouped by theme.
 */
export interface Sticker {
  id: string;
  name: string;
  group: 'nature' | 'celebration' | 'shapes' | 'dividers';
  /** SVG markup; fill/stroke use currentColor to follow the element color. */
  svg: string;
}

export const STICKERS: Sticker[] = [
  {
    id: 'heart',
    name: 'לב',
    group: 'celebration',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 86C30 70 12 56 12 36c0-12 9-20 20-20 8 0 14 4 18 11 4-7 10-11 18-11 11 0 20 8 20 20 0 20-18 34-38 50Z"/></svg>`,
  },
  {
    id: 'star',
    name: 'כוכב',
    group: 'celebration',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 6l11 29 31 2-24 20 8 30-26-17-26 17 8-30L8 37l31-2z"/></svg>`,
  },
  {
    id: 'sparkle',
    name: 'נצנוץ',
    group: 'celebration',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 4c4 24 18 38 42 42-24 4-38 18-42 42-4-24-18-38-42-42 24-4 38-18 42-42z"/></svg>`,
  },
  {
    id: 'leaf',
    name: 'עלה',
    group: 'nature',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M82 14C40 16 18 40 18 78c0 4 0 8 1 8 22-2 63-18 63-72zM30 74C40 50 56 34 74 28"/><path d="M30 74C40 50 56 34 74 28" fill="none" stroke="#fff" stroke-width="2" opacity="0.5"/></svg>`,
  },
  {
    id: 'branch',
    name: 'ענף',
    group: 'nature',
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M50 92V14"/><path d="M50 30c-12-4-20-12-22-20M50 30c12-4 20-12 22-20M50 50c-14-2-24-10-28-20M50 50c14-2 24-10 28-20M50 70c-12-2-20-10-24-18M50 70c12-2 20-10 24-18"/></svg>`,
  },
  {
    id: 'flower',
    name: 'פרח',
    group: 'nature',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><g><ellipse cx="50" cy="24" rx="11" ry="18"/><ellipse cx="50" cy="76" rx="11" ry="18"/><ellipse cx="24" cy="50" rx="18" ry="11"/><ellipse cx="76" cy="50" rx="18" ry="11"/></g><circle cx="50" cy="50" r="10" fill="#fff" opacity="0.85"/></svg>`,
  },
  {
    id: 'rings',
    name: 'טבעות',
    group: 'celebration',
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5"><circle cx="38" cy="56" r="24"/><circle cx="64" cy="56" r="24"/></svg>`,
  },
  {
    id: 'balloon',
    name: 'בלון',
    group: 'celebration',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><ellipse cx="50" cy="38" rx="26" ry="32"/><path d="M50 70l-4 8h8z"/><path d="M50 78c0 10 6 10 6 18" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>`,
  },
  {
    id: 'dots',
    name: 'נקודות',
    group: 'shapes',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><circle cx="14" cy="50" r="7"/><circle cx="38" cy="50" r="7"/><circle cx="62" cy="50" r="7"/><circle cx="86" cy="50" r="7"/></svg>`,
  },
  {
    id: 'crown',
    name: 'כתר',
    group: 'celebration',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M16 74h68l6-40-22 16-18-30-18 30-22-16z"/><rect x="16" y="76" width="68" height="8" rx="2"/></svg>`,
  },
  {
    id: 'divider-leaves',
    name: 'מפריד עלים',
    group: 'dividers',
    svg: `<svg viewBox="0 0 200 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10 20h60M130 20h60"/><circle cx="100" cy="20" r="6" fill="currentColor"/><path d="M80 20c0-8 6-12 12-12M120 20c0-8-6-12-12-12M80 20c0 8 6 12 12 12M120 20c0 8-6 12-12 12"/></svg>`,
  },
  {
    id: 'divider-line',
    name: 'מפריד עדין',
    group: 'dividers',
    svg: `<svg viewBox="0 0 200 24" fill="currentColor" stroke="currentColor"><line x1="20" y1="12" x2="80" y2="12" stroke-width="2"/><line x1="120" y1="12" x2="180" y2="12" stroke-width="2"/><path d="M100 4l6 8-6 8-6-8z"/></svg>`,
  },
  {
    id: 'cake',
    name: 'עוגה',
    group: 'celebration',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><rect x="22" y="48" width="56" height="32" rx="4"/><rect x="16" y="74" width="68" height="10" rx="3"/><circle cx="50" cy="30" r="4"/><rect x="48.5" y="34" width="3" height="14"/></svg>`,
  },
  {
    id: 'baby',
    name: 'רגלי תינוק',
    group: 'celebration',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><ellipse cx="34" cy="56" rx="14" ry="18"/><circle cx="22" cy="40" r="5"/><circle cx="32" cy="36" r="5"/><circle cx="43" cy="38" r="4"/><ellipse cx="70" cy="56" rx="14" ry="18"/><circle cx="58" cy="40" r="5"/><circle cx="68" cy="36" r="5"/><circle cx="79" cy="38" r="4"/></svg>`,
  },
];

export const STICKER_GROUPS: { id: Sticker['group']; label: string }[] = [
  { id: 'celebration', label: 'חגיגה' },
  { id: 'nature', label: 'טבע ופרחים' },
  { id: 'shapes', label: 'צורות' },
  { id: 'dividers', label: 'מפרידים' },
];
