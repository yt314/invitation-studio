import {
  ShapeElement,
  StickerElement,
  TemplateDefinition,
  TextElement,
} from '../../core/models/design.model';

/* ------------------------------------------------------------------ *
 *  Element factory helpers — keep the template definitions readable.
 *  Position/size are percentages of the canvas; fontSize is % of height.
 * ------------------------------------------------------------------ */
let idc = 0;
const uid = (p: string) => `${p}-${++idc}`;

interface TextOpts extends Partial<TextElement> {
  text: string;
  y: number;
}
function txt(o: TextOpts): TextElement {
  return {
    id: uid('t'),
    type: 'text',
    x: o.x ?? 8,
    y: o.y,
    width: o.width ?? 84,
    height: o.height ?? 10,
    rotation: o.rotation ?? 0,
    opacity: o.opacity ?? 1,
    text: o.text,
    fontFamily: o.fontFamily ?? 'Heebo, sans-serif',
    fontSize: o.fontSize ?? 4,
    color: o.color ?? '#1b1830',
    align: o.align ?? 'center',
    bold: o.bold ?? false,
    italic: o.italic ?? false,
    underline: o.underline ?? false,
    letterSpacing: o.letterSpacing ?? 0,
    lineHeight: o.lineHeight ?? 1.3,
  };
}

function shp(o: Partial<ShapeElement> & Pick<ShapeElement, 'shape' | 'x' | 'y' | 'width' | 'height'>): ShapeElement {
  return {
    id: uid('s'),
    type: 'shape',
    rotation: o.rotation ?? 0,
    opacity: o.opacity ?? 1,
    fill: o.fill ?? '#c8a45c',
    stroke: o.stroke ?? 'transparent',
    strokeWidth: o.strokeWidth ?? 0,
    radius: o.radius ?? 0,
    ...o,
  };
}

function stk(o: Partial<StickerElement> & Pick<StickerElement, 'stickerId' | 'x' | 'y' | 'width' | 'height'>): StickerElement {
  return {
    id: uid('k'),
    type: 'sticker',
    rotation: o.rotation ?? 0,
    opacity: o.opacity ?? 1,
    color: o.color ?? '#c8a45c',
    ...o,
  };
}

const CANVAS = { width: 1000, height: 1400 };

/* ------------------------------------------------------------------ *
 *  Templates — one or more per requested category.
 * ------------------------------------------------------------------ */
export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'wedding-classic',
    name: 'חתונה קלאסית',
    category: 'wedding',
    tagline: 'אלגנטיות נצחית בזהב ולבן',
    design: {
      title: 'חתונה קלאסית',
      canvas: CANVAS,
      background: { type: 'solid', value: '#faf3ea' },
      elements: [
        shp({ shape: 'frame', x: 6, y: 4, width: 88, height: 92, stroke: '#c8a45c', strokeWidth: 0.5, radius: 2 }),
        txt({ text: 'הזמנה לחתונה', y: 14, fontFamily: "'Frank Ruhl Libre', serif", fontSize: 3, color: '#9a7b3a', letterSpacing: 0.4 }),
        txt({ text: 'דנה  &  יואב', y: 26, fontFamily: "'Playfair Display', serif", fontSize: 8.5, color: '#1c1a17', bold: true }),
        stk({ stickerId: 'divider-leaves', x: 32, y: 41, width: 36, height: 5, color: '#c8a45c' }),
        txt({ text: 'מתכבדים להזמינכם לחגוג עמנו', y: 50, fontSize: 3, color: '#6a5c44' }),
        txt({ text: 'יום שלישי · 12 ביולי 2026 · 19:00', y: 62, fontFamily: "'Frank Ruhl Libre', serif", fontSize: 3.4, color: '#1c1a17', bold: true }),
        txt({ text: 'אולמי הגן הלבן · רחוב הפרחים 10, תל אביב', y: 70, fontSize: 2.8, color: '#6a5c44' }),
        stk({ stickerId: 'rings', x: 44, y: 80, width: 12, height: 9, color: '#c8a45c' }),
      ],
    },
  },
  {
    id: 'engagement-floral',
    name: 'אירוסין פרחוני',
    category: 'engagement',
    tagline: 'רכות פרחונית בגווני ורוד',
    design: {
      title: 'אירוסין פרחוני',
      canvas: CANVAS,
      background: { type: 'gradient', value: 'linear-gradient(160deg, #fde7f1 0%, #fff7f0 60%, #fdeede 100%)' },
      elements: [
        stk({ stickerId: 'flower', x: 6, y: 6, width: 16, height: 16, color: '#ec88b4', rotation: -20 }),
        stk({ stickerId: 'leaf', x: 78, y: 8, width: 16, height: 16, color: '#7aa67f', rotation: 30 }),
        txt({ text: 'מסיבת אירוסין', y: 22, fontSize: 3, color: '#b14a78', letterSpacing: 0.3 }),
        txt({ text: 'חוגגים אהבה', y: 32, fontFamily: "'Dancing Script', cursive", fontSize: 9, color: '#a83a6c', bold: true }),
        txt({ text: 'נשמח לראותכם בערב מיוחד', y: 50, fontSize: 3, color: '#7a4a60' }),
        txt({ text: 'שבת · 5 בספטמבר · 20:00', y: 60, fontSize: 3.4, color: '#5b2540', bold: true }),
        txt({ text: 'בית משפחת לוי · הגליל', y: 67, fontSize: 2.8, color: '#7a4a60' }),
        stk({ stickerId: 'flower', x: 40, y: 78, width: 20, height: 16, color: '#f4a6c6' }),
      ],
    },
  },
  {
    id: 'birthday-fun',
    name: 'יום הולדת חגיגי',
    category: 'birthday',
    tagline: 'צבעוני ושמח עם קונפטי',
    design: {
      title: 'יום הולדת',
      canvas: CANVAS,
      background: { type: 'pattern', value: 'radial-gradient(circle at 20% 30%, #f9c0d8 0 6px, transparent 7px), radial-gradient(circle at 70% 60%, #c9b6f7 0 6px, transparent 7px), radial-gradient(circle at 45% 80%, #ffe3a8 0 5px, transparent 6px), #ffffff' },
      elements: [
        stk({ stickerId: 'balloon', x: 10, y: 6, width: 14, height: 18, color: '#ec4899' }),
        stk({ stickerId: 'balloon', x: 76, y: 6, width: 14, height: 18, color: '#8b5cf6' }),
        txt({ text: 'מזמינים אתכם ליום הולדת', y: 26, fontSize: 3, color: '#6d28d9', bold: true }),
        txt({ text: 'נועה בת 8!', y: 36, fontFamily: "'Suez One', serif", fontSize: 9, color: '#db2777', bold: true }),
        stk({ stickerId: 'cake', x: 42, y: 50, width: 16, height: 14, color: '#8b5cf6' }),
        txt({ text: 'יום שישי · 14:00', y: 66, fontSize: 3.6, color: '#1b1830', bold: true }),
        txt({ text: 'גן השעשועים העירוני · באר שבע', y: 73, fontSize: 2.8, color: '#4b4763' }),
      ],
    },
  },
  {
    id: 'mitzvah-modern',
    name: 'בר מצווה מודרני',
    category: 'mitzvah',
    tagline: 'נקי ומודרני בכחול ולבן',
    design: {
      title: 'בר מצווה',
      canvas: CANVAS,
      background: { type: 'gradient', value: 'linear-gradient(160deg, #eaf1ff 0%, #f3f8ff 55%, #eef6ff 100%)' },
      elements: [
        shp({ shape: 'rectangle', x: 0, y: 0, width: 100, height: 6, fill: '#3a5bbf' }),
        shp({ shape: 'rectangle', x: 0, y: 94, width: 100, height: 6, fill: '#3a5bbf' }),
        txt({ text: 'הזמנה לבר מצווה', y: 22, fontSize: 3, color: '#3a5bbf', letterSpacing: 0.3 }),
        txt({ text: 'איתי', y: 32, fontFamily: "'Suez One', serif", fontSize: 11, color: '#1e2a52', bold: true }),
        stk({ stickerId: 'star', x: 44, y: 48, width: 12, height: 10, color: '#3a5bbf' }),
        txt({ text: 'עולה לתורה', y: 60, fontSize: 3.2, color: '#1e2a52' }),
        txt({ text: 'שבת פרשת יתרו · 8 בפברואר 2026', y: 68, fontSize: 3, color: '#1e2a52', bold: true }),
        txt({ text: 'בית הכנסת הגדול · חיפה', y: 75, fontSize: 2.7, color: '#3a5bbf' }),
      ],
    },
  },
  {
    id: 'baby-soft',
    name: 'ברית / בריתה רכה',
    category: 'baby',
    tagline: 'עדין ומתוק לקבלת הרך הנולד',
    design: {
      title: 'אירוע לתינוק',
      canvas: CANVAS,
      background: { type: 'gradient', value: 'linear-gradient(160deg, #ede9fe 0%, #f5f0ff 55%, #fdeef7 100%)' },
      elements: [
        stk({ stickerId: 'baby', x: 42, y: 12, width: 16, height: 14, color: '#a78bfa' }),
        txt({ text: 'בשמחה רבה', y: 30, fontSize: 3, color: '#7c3aed' }),
        txt({ text: 'מזמינים לחגוג', y: 38, fontFamily: "'Dancing Script', cursive", fontSize: 8, color: '#6d28d9', bold: true }),
        txt({ text: 'את הולדת בננו', y: 52, fontSize: 3.2, color: '#4b4763' }),
        txt({ text: 'יום ראשון · 10:00', y: 62, fontSize: 3.4, color: '#1b1830', bold: true }),
        txt({ text: 'בביתנו · רחוב האלון 4', y: 69, fontSize: 2.8, color: '#6a5c8a' }),
        stk({ stickerId: 'dots', x: 35, y: 80, width: 30, height: 5, color: '#c4b5fd' }),
      ],
    },
  },
  {
    id: 'family-warm',
    name: 'אירוע משפחתי',
    category: 'family',
    tagline: 'חמים ומזמין למפגש משפחתי',
    design: {
      title: 'אירוע משפחתי',
      canvas: CANVAS,
      background: { type: 'solid', value: '#faf3ea' },
      elements: [
        stk({ stickerId: 'branch', x: 8, y: 8, width: 14, height: 18, color: '#8a6646', rotation: -10 }),
        stk({ stickerId: 'branch', x: 78, y: 8, width: 14, height: 18, color: '#8a6646', rotation: 10 }),
        txt({ text: 'מפגש משפחתי', y: 28, fontFamily: "'Frank Ruhl Libre', serif", fontSize: 7, color: '#3d2c1e', bold: true }),
        txt({ text: 'כל המשפחה מוזמנת לחגוג יחד', y: 46, fontSize: 3, color: '#6a5236' }),
        txt({ text: 'שבת · ארוחת צהריים', y: 60, fontSize: 3.4, color: '#3d2c1e', bold: true }),
        txt({ text: 'בית סבא וסבתא · מושב ניר', y: 67, fontSize: 2.8, color: '#6a5236' }),
        stk({ stickerId: 'divider-line', x: 32, y: 78, width: 36, height: 4, color: '#c9a989' }),
      ],
    },
  },
  {
    id: 'class-party',
    name: 'מסיבת כיתה',
    category: 'class',
    tagline: 'אנרגטי וצעיר לסיום שנה',
    design: {
      title: 'מסיבת כיתה',
      canvas: CANVAS,
      background: { type: 'gradient', value: 'radial-gradient(120% 90% at 50% -10%, #3b2a72 0%, #1a1330 60%, #0e0a1c 100%)' },
      elements: [
        stk({ stickerId: 'sparkle', x: 12, y: 10, width: 10, height: 10, color: '#a78bfa' }),
        stk({ stickerId: 'sparkle', x: 78, y: 14, width: 8, height: 8, color: '#f472b6' }),
        txt({ text: 'מסיבת סיום', y: 26, fontSize: 3, color: '#c4b5fd', letterSpacing: 0.4 }),
        txt({ text: 'כיתה ו׳ חוגגת!', y: 36, fontFamily: "'Suez One', serif", fontSize: 8, color: '#ffffff', bold: true }),
        txt({ text: 'באים לרקוד, לצחוק ולחגוג', y: 54, fontSize: 3, color: '#cfc6f0' }),
        txt({ text: 'חמישי · 19:30', y: 64, fontSize: 3.6, color: '#ffffff', bold: true }),
        txt({ text: 'מועדון הנוער · רעננה', y: 71, fontSize: 2.8, color: '#b3a8e0' }),
      ],
    },
  },
  {
    id: 'business-event',
    name: 'אירוע עסקי',
    category: 'business',
    tagline: 'מקצועי ומדויק לכנס או השקה',
    design: {
      title: 'אירוע עסקי',
      canvas: CANVAS,
      background: { type: 'solid', value: '#15121f' },
      elements: [
        shp({ shape: 'rectangle', x: 8, y: 30, width: 30, height: 0.5, fill: '#c8a45c' }),
        txt({ text: 'INVITATION', y: 16, fontFamily: "'Playfair Display', serif", fontSize: 2.6, color: '#c8a45c', letterSpacing: 0.6, align: 'left', x: 8, width: 60 }),
        txt({ text: 'כנס החדשנות 2026', y: 34, fontFamily: "'Frank Ruhl Libre', serif", fontSize: 6.5, color: '#ffffff', bold: true, align: 'left', x: 8, width: 84 }),
        txt({ text: 'הרצאות · נטוורקינג · קוקטייל', y: 52, fontSize: 3, color: '#bdb6d0', align: 'left', x: 8, width: 84 }),
        txt({ text: 'יום רביעי · 18 במרץ · 18:00', y: 64, fontSize: 3.2, color: '#ffffff', bold: true, align: 'left', x: 8, width: 84 }),
        txt({ text: 'מרכז הכנסים · תל אביב', y: 70, fontSize: 2.8, color: '#bdb6d0', align: 'left', x: 8, width: 84 }),
      ],
    },
  },
  {
    id: 'elegant-simple',
    name: 'אלגנטי פשוט',
    category: 'elegant',
    tagline: 'תחכום שקט בקווים נקיים',
    design: {
      title: 'הזמנה אלגנטית',
      canvas: CANVAS,
      background: { type: 'solid', value: '#ffffff' },
      elements: [
        shp({ shape: 'frame', x: 10, y: 8, width: 80, height: 84, stroke: '#1b1830', strokeWidth: 0.3, radius: 0 }),
        txt({ text: 'אתם מוזמנים', y: 30, fontFamily: "'Playfair Display', serif", fontSize: 6, color: '#1b1830', italic: true }),
        stk({ stickerId: 'divider-line', x: 35, y: 44, width: 30, height: 4, color: '#1b1830' }),
        txt({ text: 'לחגוג רגע מיוחד', y: 52, fontSize: 3, color: '#4b4763' }),
        txt({ text: 'בתאריך 20.06.2026', y: 64, fontSize: 3.2, color: '#1b1830', bold: true }),
        txt({ text: 'פרטים נוספים בהמשך', y: 71, fontSize: 2.6, color: '#8b86a3' }),
      ],
    },
  },
  {
    id: 'floral-garden',
    name: 'פרחוני גן',
    category: 'floral',
    tagline: 'שופע פריחה בגווני טבע',
    design: {
      title: 'פרחוני',
      canvas: CANVAS,
      background: { type: 'gradient', value: 'linear-gradient(160deg, #e9f3e9 0%, #f4faf1 55%, #eaf4ec 100%)' },
      elements: [
        stk({ stickerId: 'flower', x: 4, y: 4, width: 18, height: 18, color: '#ec88b4', rotation: -15 }),
        stk({ stickerId: 'leaf', x: 80, y: 6, width: 16, height: 16, color: '#3d6b46', rotation: 25 }),
        stk({ stickerId: 'leaf', x: 6, y: 80, width: 14, height: 14, color: '#7aa67f', rotation: 200 }),
        stk({ stickerId: 'flower', x: 80, y: 80, width: 16, height: 16, color: '#f4a6c6', rotation: 20 }),
        txt({ text: 'הזמנה', y: 30, fontFamily: "'Dancing Script', cursive", fontSize: 9, color: '#3d6b46', bold: true }),
        txt({ text: 'לאירוע בין הפרחים', y: 48, fontSize: 3, color: '#3f5f44' }),
        txt({ text: '11 במאי · 17:00', y: 60, fontSize: 3.4, color: '#1f3324', bold: true }),
        txt({ text: 'גן בוטני · ירושלים', y: 67, fontSize: 2.8, color: '#3f5f44' }),
      ],
    },
  },
  {
    id: 'minimal-clean',
    name: 'מינימלי לבן',
    category: 'minimal',
    tagline: 'הכי פחות זה הכי הרבה',
    design: {
      title: 'מינימלי',
      canvas: CANVAS,
      background: { type: 'solid', value: '#ffffff' },
      elements: [
        txt({ text: 'SAVE THE DATE', y: 30, fontSize: 2.6, color: '#8b86a3', letterSpacing: 0.7 }),
        txt({ text: '20·06·26', y: 42, fontFamily: "'Frank Ruhl Libre', serif", fontSize: 11, color: '#1b1830', bold: true }),
        shp({ shape: 'line', x: 38, y: 60, width: 24, height: 0.4, fill: '#1b1830' }),
        txt({ text: 'פרטים מלאים בקרוב', y: 66, fontSize: 2.8, color: '#4b4763' }),
      ],
    },
  },
  {
    id: 'luxury-gold',
    name: 'יוקרה זהב',
    category: 'luxury',
    tagline: 'פאר וזוהר על רקע כהה',
    design: {
      title: 'יוקרתי',
      canvas: CANVAS,
      background: { type: 'gradient', value: 'linear-gradient(160deg, #1c1813 0%, #34291a 55%, #1c1813 100%)' },
      elements: [
        shp({ shape: 'frame', x: 7, y: 5, width: 86, height: 90, stroke: '#c8a45c', strokeWidth: 0.4, radius: 0 }),
        stk({ stickerId: 'sparkle', x: 44, y: 14, width: 12, height: 12, color: '#e7d4a8' }),
        txt({ text: 'הזמנה מיוחדת', y: 30, fontFamily: "'Playfair Display', serif", fontSize: 3, color: '#e7d4a8', letterSpacing: 0.4, italic: true }),
        txt({ text: 'ערב גאלה', y: 40, fontFamily: "'Playfair Display', serif", fontSize: 9, color: '#f5e9cf', bold: true }),
        stk({ stickerId: 'divider-leaves', x: 32, y: 56, width: 36, height: 5, color: '#c8a45c' }),
        txt({ text: 'מוצאי שבת · 21:00', y: 64, fontSize: 3.2, color: '#f5e9cf', bold: true }),
        txt({ text: 'מלון המלך דוד · ירושלים', y: 71, fontSize: 2.8, color: '#cbb98f' }),
      ],
    },
  },
  {
    id: 'classic-cream',
    name: 'קלאסי קרם',
    category: 'classic',
    tagline: 'מסורתי ומכובד בגווני קרם',
    design: {
      title: 'קלאסי',
      canvas: CANVAS,
      background: { type: 'solid', value: '#f6efe2' },
      elements: [
        shp({ shape: 'frame', x: 8, y: 6, width: 84, height: 88, stroke: '#8a6646', strokeWidth: 0.3, radius: 1 }),
        txt({ text: 'בחסד עליון', y: 16, fontFamily: "'Frank Ruhl Libre', serif", fontSize: 2.8, color: '#8a6646' }),
        txt({ text: 'הזמנה', y: 28, fontFamily: "'Frank Ruhl Libre', serif", fontSize: 8, color: '#3d2c1e', bold: true }),
        stk({ stickerId: 'divider-line', x: 34, y: 44, width: 32, height: 4, color: '#8a6646' }),
        txt({ text: 'לכבוד שמחתנו', y: 52, fontSize: 3, color: '#5a4530' }),
        txt({ text: 'יום שני · ט״ו בשבט · 19:00', y: 63, fontSize: 3.2, color: '#3d2c1e', bold: true }),
        txt({ text: 'אולמי המלכה · פתח תקווה', y: 70, fontSize: 2.8, color: '#5a4530' }),
      ],
    },
  },
  {
    id: 'modern-bold',
    name: 'מודרני נועז',
    category: 'modern',
    tagline: 'גיאומטרי ובטוח בגווני סגול',
    design: {
      title: 'מודרני',
      canvas: CANVAS,
      background: { type: 'solid', value: '#ffffff' },
      elements: [
        shp({ shape: 'rectangle', x: 0, y: 0, width: 100, height: 26, fill: '#6d28d9' }),
        shp({ shape: 'circle', x: 70, y: 60, width: 40, height: 28, fill: '#fce7f3' }),
        txt({ text: 'YOU ARE INVITED', y: 9, fontSize: 2.6, color: '#ede9fe', letterSpacing: 0.5, align: 'left', x: 8, width: 84 }),
        txt({ text: 'מסיבת השקה', y: 34, fontFamily: "'Suez One', serif", fontSize: 8, color: '#1b1830', bold: true, align: 'left', x: 8, width: 84 }),
        txt({ text: 'בואו לחגוג איתנו בגדול', y: 50, fontSize: 3, color: '#4b4763', align: 'left', x: 8, width: 70 }),
        txt({ text: 'שבת · 22:00', y: 64, fontSize: 3.6, color: '#6d28d9', bold: true, align: 'left', x: 8, width: 84 }),
        txt({ text: 'גג העיר · תל אביב', y: 71, fontSize: 2.8, color: '#4b4763', align: 'left', x: 8, width: 84 }),
      ],
    },
  },
];

export function getTemplate(id: string): TemplateDefinition | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
