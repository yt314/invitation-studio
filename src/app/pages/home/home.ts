import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TEMPLATES } from '../../data/templates/templates.data';
import { TemplateCard } from '../../shared/components/template-card/template-card';
import { DesignPreview } from '../../shared/components/design-preview/design-preview';
import { Button } from '../../shared/components/button/button';
import { TemplateDefinition } from '../../core/models/design.model';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TemplateCard, DesignPreview, Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  /** Three eye-catching templates floated in the hero. */
  readonly heroCards: TemplateDefinition[] = [
    TEMPLATES.find((t) => t.id === 'luxury-gold')!,
    TEMPLATES.find((t) => t.id === 'engagement-floral')!,
    TEMPLATES.find((t) => t.id === 'modern-bold')!,
  ];

  readonly showcase = TEMPLATES.slice(0, 6);

  toDoc(t: TemplateDefinition) {
    return { ...t.design, title: t.name };
  }

  readonly features = [
    { icon: '🎨', title: 'עורך גרירה ושחרור', text: 'הוסיפו טקסט, צורות ומדבקות וגררו אותם בחופשיות על הקנבס.' },
    { icon: '✨', title: 'תבניות מרהיבות', text: 'עשרות תבניות מעוצבות לכל אירוע — חתונה, יום הולדת, בר מצווה ועוד.' },
    { icon: '🖌️', title: 'פלטות צבעים וגופנים', text: 'פלטות צבע מוכנות וגופנים יפים בעברית, בלחיצת כפתור.' },
    { icon: '💾', title: 'שמירה בענן', text: 'שמרו את העיצובים שלכם וחזרו לערוך אותם מכל מקום.' },
    { icon: '⬇️', title: 'הורדה ל‑PNG ו‑PDF', text: 'ייצאו את ההזמנה באיכות גבוהה ושלחו לכל מי שתרצו.' },
    { icon: '📱', title: 'מותאם לכל מסך', text: 'עובד מצוין במחשב ובנייד, עם תמיכה מלאה בעברית ו‑RTL.' },
  ];

  readonly steps = [
    { n: '1', title: 'בחרו תבנית', text: 'התחילו מתבנית מעוצבת או מקנבס ריק.' },
    { n: '2', title: 'עצבו בקלות', text: 'שנו טקסט, צבעים, רקעים ומדבקות לפי הטעם שלכם.' },
    { n: '3', title: 'הורידו ושתפו', text: 'ייצאו לתמונה או PDF ושלחו לאורחים.' },
  ];
}
