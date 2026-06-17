import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { ToastHost } from './shared/components/toast/toast-host';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Navbar, Footer, ToastHost],
  template: `
    @if (!chromeless()) {
      <app-navbar />
    }
    <main [class.main--chromeless]="chromeless()">
      <router-outlet />
    </main>
    @if (!chromeless()) {
      <app-footer />
    }
    <app-toast-host />
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      main {
        flex: 1;
        padding-top: var(--nav-h);
      }
      main.main--chromeless {
        padding-top: 0;
      }
    `,
  ],
})
export class App {
  /** Editor uses a full-screen, navbar-less layout. */
  readonly chromeless = signal(false);

  constructor(router: Router) {
    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.chromeless.set(e.urlAfterRedirects.startsWith('/editor')));
  }
}
