/**
 * Core data model for an invitation design.
 * A design is a canvas (size + background) plus an ordered list of elements.
 * This object is what we serialize to Firestore as JSON.
 */

export type ElementType = 'text' | 'shape' | 'sticker';

export type ShapeKind = 'rectangle' | 'circle' | 'line' | 'frame';

export type TextAlign = 'right' | 'center' | 'left';

export type BackgroundType = 'solid' | 'gradient' | 'pattern';

export interface CanvasBackground {
  type: BackgroundType;
  /** For solid: a hex color. For gradient/pattern: a CSS background value. */
  value: string;
}

/** Properties shared by every element on the canvas. */
export interface BaseElement {
  id: string;
  type: ElementType;
  /** Position/size are stored as percentages of the canvas (0-100) so the
   *  design scales perfectly at any preview size and on export. */
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number; // degrees
  opacity: number; // 0-1
  locked?: boolean;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontFamily: string;
  /** Font size as a percentage of canvas height (keeps text scaling correct). */
  fontSize: number;
  color: string;
  align: TextAlign;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  letterSpacing: number;
  lineHeight: number;
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shape: ShapeKind;
  fill: string;
  stroke: string;
  strokeWidth: number;
  radius: number; // corner radius for rectangles (%)
}

export interface StickerElement extends BaseElement {
  type: 'sticker';
  /** Key into the sticker catalogue (data/stickers). */
  stickerId: string;
  color: string;
}

export type DesignElement = TextElement | ShapeElement | StickerElement;

export interface DesignDocument {
  id?: string;
  ownerId?: string;
  title: string;
  /** Canvas aspect — invitations are usually portrait. */
  canvas: {
    width: number; // logical units (used for aspect ratio)
    height: number;
  };
  background: CanvasBackground;
  elements: DesignElement[];
  /** Optional template this design started from. */
  templateId?: string;
  /** Data-URL PNG preview, generated on save. */
  preview?: string;
  createdAt?: number;
  updatedAt?: number;
}

/** A ready-made starting point shown in the templates gallery. */
export interface TemplateDefinition {
  id: string;
  name: string;
  category: TemplateCategory;
  /** Short Hebrew tagline shown on the card. */
  tagline: string;
  design: Omit<DesignDocument, 'id' | 'ownerId' | 'createdAt' | 'updatedAt' | 'preview'>;
}

export type TemplateCategory =
  | 'wedding'
  | 'engagement'
  | 'birthday'
  | 'mitzvah'
  | 'baby'
  | 'family'
  | 'class'
  | 'business'
  | 'elegant'
  | 'floral'
  | 'minimal'
  | 'luxury'
  | 'classic'
  | 'modern';

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  wedding: 'חתונה',
  engagement: 'אירוסין',
  birthday: 'יום הולדת',
  mitzvah: 'בר/בת מצווה',
  baby: 'אירוע לתינוק',
  family: 'אירוע משפחתי',
  class: 'מסיבת כיתה',
  business: 'אירוע עסקי',
  elegant: 'אלגנטי',
  floral: 'פרחוני',
  minimal: 'מינימלי',
  luxury: 'יוקרתי',
  classic: 'קלאסי',
  modern: 'מודרני',
};
