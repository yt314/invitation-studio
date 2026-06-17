import { BackgroundType } from '../../core/models/design.model';

/** Built-in canvas backgrounds — all pure CSS (solids, gradients, patterns).
 *  No external images, so nothing to pay for and everything exports cleanly. */
export interface BackgroundOption {
  id: string;
  name: string;
  type: BackgroundType;
  /** CSS background value applied to the canvas. */
  value: string;
  group: 'solid' | 'gradient' | 'pattern';
}

export const BACKGROUNDS: BackgroundOption[] = [
  // Minimal / solid
  { id: 'white', name: 'לבן נקי', type: 'solid', value: '#ffffff', group: 'solid' },
  { id: 'cream', name: 'קרם קלאסי', type: 'solid', value: '#faf3ea', group: 'solid' },
  { id: 'blush', name: 'ורוד עדין', type: 'solid', value: '#fff3f8', group: 'solid' },
  { id: 'ink', name: 'כהה אלגנטי', type: 'solid', value: '#15121f', group: 'solid' },
  { id: 'sage', name: 'מרווה רך', type: 'solid', value: '#eef3ec', group: 'solid' },

  // Gradients
  {
    id: 'g-blush',
    name: 'שקיעה ורודה',
    type: 'gradient',
    value: 'linear-gradient(160deg, #fde7f1 0%, #fff7f0 60%, #fdeede 100%)',
    group: 'gradient',
  },
  {
    id: 'g-lavender',
    name: 'לבנדר חלומי',
    type: 'gradient',
    value: 'linear-gradient(160deg, #ede9fe 0%, #f5f0ff 55%, #fdeef7 100%)',
    group: 'gradient',
  },
  {
    id: 'g-gold',
    name: 'זהב יוקרתי',
    type: 'gradient',
    value: 'linear-gradient(160deg, #1c1813 0%, #34291a 55%, #1c1813 100%)',
    group: 'gradient',
  },
  {
    id: 'g-ocean',
    name: 'תכלת רגוע',
    type: 'gradient',
    value: 'linear-gradient(160deg, #eaf1ff 0%, #f3f8ff 55%, #eef6ff 100%)',
    group: 'gradient',
  },
  {
    id: 'g-botanical',
    name: 'בוטני ירוק',
    type: 'gradient',
    value: 'linear-gradient(160deg, #e9f3e9 0%, #f4faf1 55%, #eaf4ec 100%)',
    group: 'gradient',
  },
  {
    id: 'g-night',
    name: 'לילה סגול',
    type: 'gradient',
    value: 'radial-gradient(120% 90% at 50% -10%, #3b2a72 0%, #1a1330 60%, #0e0a1c 100%)',
    group: 'gradient',
  },

  // Patterns (CSS only)
  {
    id: 'p-dots',
    name: 'נקודות עדינות',
    type: 'pattern',
    value:
      'radial-gradient(#e7ddff 1.6px, transparent 1.7px), linear-gradient(160deg,#faf8ff,#fff)',
    group: 'pattern',
  },
  {
    id: 'p-grid',
    name: 'רשת קלה',
    type: 'pattern',
    value:
      'linear-gradient(#f0ecf9 1px, transparent 1px), linear-gradient(90deg,#f0ecf9 1px, transparent 1px), #ffffff',
    group: 'pattern',
  },
  {
    id: 'p-stripes',
    name: 'פסים זהב',
    type: 'pattern',
    value:
      'repeating-linear-gradient(45deg, #fbf3df 0 14px, #faf6ea 14px 28px)',
    group: 'pattern',
  },
  {
    id: 'p-confetti',
    name: 'קונפטי חגיגי',
    type: 'pattern',
    value:
      'radial-gradient(circle at 20% 30%, #f9c0d8 0 6px, transparent 7px), radial-gradient(circle at 70% 60%, #c9b6f7 0 6px, transparent 7px), radial-gradient(circle at 45% 80%, #ffe3a8 0 5px, transparent 6px), #ffffff',
    group: 'pattern',
  },
];
