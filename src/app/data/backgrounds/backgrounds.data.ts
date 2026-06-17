import { BackgroundType } from '../../core/models/design.model';

/** Built-in canvas backgrounds — all pure CSS (solids, gradients, patterns).
 *  No external images, so nothing to pay for and everything exports cleanly. */
export interface BackgroundOption {
  id: string;
  name: string;
  type: BackgroundType;
  /** CSS background value applied to the canvas. */
  value: string;
  group: 'solid' | 'gradient' | 'pattern' | 'decorative';
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

  // Decorative (richer, themed backgrounds — still pure CSS)
  {
    id: 'd-floral',
    name: 'פרחוני אלגנטי',
    type: 'pattern',
    value:
      'radial-gradient(circle at 12% 16%, rgba(236,136,180,0.38) 0 16px, transparent 18px), radial-gradient(circle at 88% 22%, rgba(122,166,127,0.34) 0 13px, transparent 15px), radial-gradient(circle at 82% 84%, rgba(236,136,180,0.32) 0 18px, transparent 20px), radial-gradient(circle at 16% 86%, rgba(122,166,127,0.32) 0 13px, transparent 15px), linear-gradient(160deg, #fdf4ee, #fbf7f0)',
    group: 'decorative',
  },
  {
    id: 'd-floral-pink',
    name: 'ורוד פורח',
    type: 'pattern',
    value:
      'radial-gradient(circle at 20% 25%, rgba(244,166,198,0.5) 0 14px, transparent 16px), radial-gradient(circle at 78% 30%, rgba(236,136,180,0.42) 0 11px, transparent 13px), radial-gradient(circle at 70% 82%, rgba(244,166,198,0.45) 0 15px, transparent 17px), #fff3f8',
    group: 'decorative',
  },
  {
    id: 'd-botanical',
    name: 'בוטני עלים',
    type: 'pattern',
    value:
      'radial-gradient(ellipse 18px 8px at 15% 18%, rgba(61,107,70,0.4) 0 100%, transparent), radial-gradient(ellipse 8px 18px at 86% 24%, rgba(122,166,127,0.4) 0 100%, transparent), radial-gradient(ellipse 18px 8px at 84% 82%, rgba(61,107,70,0.35) 0 100%, transparent), radial-gradient(ellipse 8px 18px at 18% 84%, rgba(122,166,127,0.4) 0 100%, transparent), linear-gradient(160deg, #f1f7ef, #f7fbf4)',
    group: 'decorative',
  },
  {
    id: 'd-abstract',
    name: 'מודרני מופשט',
    type: 'pattern',
    value:
      'radial-gradient(42% 48% at 82% 8%, rgba(139,92,246,0.28), transparent 70%), radial-gradient(50% 42% at 8% 28%, rgba(236,72,153,0.24), transparent 70%), radial-gradient(46% 44% at 62% 92%, rgba(59,130,246,0.22), transparent 70%), #ffffff',
    group: 'decorative',
  },
  {
    id: 'd-gold-lux',
    name: 'זהב יוקרתי',
    type: 'pattern',
    value:
      'radial-gradient(60% 50% at 50% 0%, rgba(200,164,92,0.28), transparent 70%), repeating-linear-gradient(45deg, rgba(200,164,92,0.08) 0 12px, transparent 12px 24px), linear-gradient(160deg, #1b1712, #2b2114)',
    group: 'decorative',
  },
  {
    id: 'd-blue-elegant',
    name: 'כחול אלגנטי',
    type: 'pattern',
    value:
      'radial-gradient(50% 40% at 80% 10%, rgba(125,158,240,0.32), transparent 70%), radial-gradient(45% 40% at 12% 85%, rgba(58,91,191,0.22), transparent 70%), linear-gradient(160deg, #eef3ff, #f6f9ff)',
    group: 'decorative',
  },
];
