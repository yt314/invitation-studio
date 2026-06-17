import { DesignDocument } from '../models/design.model';
import { getTemplate } from '../../data/templates/templates.data';

/** A fresh, empty portrait invitation to start designing from scratch. */
export function createBlankDesign(): DesignDocument {
  return {
    title: 'הזמנה חדשה',
    canvas: { width: 1000, height: 1400 },
    background: { type: 'solid', value: '#ffffff' },
    elements: [
      {
        id: 't-blank-1',
        type: 'text',
        x: 8,
        y: 30,
        width: 84,
        height: 12,
        rotation: 0,
        opacity: 1,
        text: 'הכותרת שלכם',
        fontFamily: "'Frank Ruhl Libre', serif",
        fontSize: 7,
        color: '#1b1830',
        align: 'center',
        bold: true,
        italic: false,
        underline: false,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
      {
        id: 't-blank-2',
        type: 'text',
        x: 8,
        y: 50,
        width: 84,
        height: 8,
        rotation: 0,
        opacity: 1,
        text: 'הוסיפו כאן את פרטי האירוע',
        fontFamily: 'Heebo, sans-serif',
        fontSize: 3.2,
        color: '#4b4763',
        align: 'center',
        bold: false,
        italic: false,
        underline: false,
        letterSpacing: 0,
        lineHeight: 1.4,
      },
    ],
  };
}

/** Build a fresh design document from a template id (deep-cloned). */
export function designFromTemplate(templateId: string): DesignDocument | null {
  const tpl = getTemplate(templateId);
  if (!tpl) return null;
  const clone = structuredClone(tpl.design);
  return {
    ...clone,
    title: tpl.name,
    templateId: tpl.id,
  };
}
