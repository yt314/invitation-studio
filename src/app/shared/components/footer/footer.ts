import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <span class="footer__logo">Invite<b>Studio</b></span>
          <p>סטודיו מקוון לעיצוב הזמנות מרהיבות לכל אירוע — חינמי, מהיר ומלא השראה.</p>
        </div>
        <div class="footer__cols">
          <div>
            <h4>ניווט</h4>
            <a routerLink="/">בית</a>
            <a routerLink="/templates">תבניות</a>
            <a routerLink="/editor">עורך</a>
          </div>
          <div>
            <h4>חשבון</h4>
            <a routerLink="/login">התחברות</a>
            <a routerLink="/register">הרשמה</a>
            <a routerLink="/my-designs">העיצובים שלי</a>
          </div>
        </div>
      </div>
      <div class="footer__bar container">
        <span>© {{ year }} Invite Studio · נבנה לפרויקט גמר</span>
        <span>עוצב באהבה ❤</span>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: var(--ink);
        color: #cfc9e6;
        padding-top: 56px;
      }
      .footer__inner {
        display: grid;
        grid-template-columns: 1.4fr 1fr;
        gap: 40px;
        padding-bottom: 40px;
      }
      .footer__logo {
        font-size: 22px;
        font-weight: 800;
        color: #fff;
      }
      .footer__logo b {
        color: var(--brand-300);
      }
      .footer__brand p {
        margin-top: 12px;
        max-width: 380px;
        font-size: 14px;
        line-height: 1.7;
        color: #a39dbd;
      }
      .footer__cols {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
      }
      .footer__cols h4 {
        color: #fff;
        font-size: 14px;
        margin-bottom: 14px;
      }
      .footer__cols a {
        display: block;
        font-size: 14px;
        color: #a39dbd;
        padding: 5px 0;
        transition: color 0.15s;
      }
      .footer__cols a:hover {
        color: #fff;
      }
      .footer__bar {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
        padding-block: 22px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 13px;
        color: #8983a3;
      }
      @media (max-width: 720px) {
        .footer__inner {
          grid-template-columns: 1fr;
          gap: 28px;
        }
      }
    `,
  ],
})
export class Footer {
  readonly year = 2026;
}
