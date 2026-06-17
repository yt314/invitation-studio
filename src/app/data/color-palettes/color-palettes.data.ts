/** Curated color palettes for quick, harmonious design choices. */
export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
}

export const COLOR_PALETTES: ColorPalette[] = [
  { id: 'gold', name: 'זהב אלגנטי', colors: ['#1c1a17', '#7a5c1e', '#c8a45c', '#e7d4a8', '#fbf6ea'] },
  { id: 'pink', name: 'ורוד רך', colors: ['#5b2540', '#b14a78', '#ec88b4', '#f9cfe0', '#fff3f8'] },
  { id: 'blue', name: 'תכלת פסטל', colors: ['#1e2a52', '#3a5bbf', '#7d9ef0', '#c3d4f7', '#eef3ff'] },
  { id: 'cream', name: 'קרם וחום', colors: ['#3d2c1e', '#8a6646', '#c9a989', '#ead9c5', '#faf3ea'] },
  { id: 'botanical', name: 'ירוק בוטני', colors: ['#1f3324', '#3d6b46', '#7aa67f', '#bcd7bd', '#eef6ee'] },
  { id: 'mono', name: 'שחור ולבן', colors: ['#0a0a0a', '#3d3d3d', '#8a8a8a', '#d4d4d4', '#ffffff'] },
  { id: 'dark', name: 'יוקרה כהה', colors: ['#0e0b1a', '#2a2150', '#6d28d9', '#a78bfa', '#ece7ff'] },
];

/** A flat set of swatches for the color picker quick row. */
export const QUICK_COLORS: string[] = [
  '#ffffff', '#000000', '#1b1830', '#6d28d9', '#8b5cf6', '#ec4899', '#f472b6',
  '#c8a45c', '#e7d4a8', '#3d6b46', '#7aa67f', '#3a5bbf', '#7d9ef0', '#b14a78',
  '#ef4444', '#f59e0b', '#10b981', '#faf3ea', '#fce7f3', '#ede9fe',
];
