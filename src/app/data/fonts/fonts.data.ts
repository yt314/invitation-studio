/** Font catalogue for the editor. All are loaded via Google Fonts in index.html
 *  and chosen to look great with Hebrew text and elegant invitations. */
export interface FontOption {
  /** CSS font-family value. */
  value: string;
  /** Label shown in the picker (Hebrew). */
  label: string;
  /** Style category used to group fonts in the UI. */
  group: 'sans' | 'serif' | 'display' | 'script';
  /** Whether the font renders Hebrew glyphs well. */
  hebrew: boolean;
}

export const FONTS: FontOption[] = [
  { value: 'Heebo, sans-serif', label: 'Heebo · נקי ומודרני', group: 'sans', hebrew: true },
  { value: 'Assistant, sans-serif', label: 'Assistant · עדין', group: 'sans', hebrew: true },
  { value: "'Frank Ruhl Libre', serif", label: 'פרנק רוהל · קלאסי', group: 'serif', hebrew: true },
  { value: "'Suez One', serif", label: 'Suez One · נועז', group: 'display', hebrew: true },
  { value: "'Playfair Display', serif", label: 'Playfair · אלגנטי', group: 'serif', hebrew: false },
  { value: "'Dancing Script', cursive", label: 'Dancing · כתב יד', group: 'script', hebrew: false },
  { value: "'Caveat', cursive", label: 'Caveat · כתב יד עדין', group: 'script', hebrew: false },
  { value: 'Georgia, serif', label: 'Georgia · סריף בטוח', group: 'serif', hebrew: true },
];

export const DEFAULT_FONT = FONTS[0].value;
