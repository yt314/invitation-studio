import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Invite Studio · עיצוב הזמנות מרהיבות',
  },
  {
    path: 'templates',
    loadComponent: () => import('./pages/templates/templates').then((m) => m.Templates),
    title: 'גלריית תבניות · Invite Studio',
  },
  {
    path: 'editor',
    loadComponent: () => import('./pages/editor/editor').then((m) => m.Editor),
    title: 'עורך ההזמנות · Invite Studio',
  },
  {
    path: 'editor/:id',
    loadComponent: () => import('./pages/editor/editor').then((m) => m.Editor),
    title: 'עורך ההזמנות · Invite Studio',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login').then((m) => m.Login),
    title: 'התחברות · Invite Studio',
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register').then((m) => m.Register),
    title: 'הרשמה · Invite Studio',
  },
  {
    path: 'my-designs',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/my-designs/my-designs').then((m) => m.MyDesigns),
    title: 'העיצובים שלי · Invite Studio',
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
    title: 'הפרופיל שלי · Invite Studio',
  },
  { path: '**', redirectTo: '' },
];
