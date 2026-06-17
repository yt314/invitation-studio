import { Injectable, computed, inject, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { AppUser } from '../models/user.model';
import { UserService } from './user.service';

/**
 * Authentication facade over Firebase Auth.
 *
 * Exposes signal-based state (`user`, `isLoggedIn`, `ready`) so the rest of the
 * app stays reactive. `whenReady()` lets guards wait for the initial auth state
 * to resolve (important on page refresh).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly users = inject(UserService);

  /** Current signed-in user, or null when signed out. */
  readonly user = signal<AppUser | null>(null);
  readonly isLoggedIn = computed(() => this.user() !== null);
  /** False until the first auth-state callback fires. */
  readonly ready = signal(false);

  private resolveReady!: () => void;
  private readonly readyPromise = new Promise<void>((r) => (this.resolveReady = r));

  constructor() {
    onAuthStateChanged(auth, (fbUser) => {
      this.user.set(fbUser ? this.toAppUser(fbUser) : null);
      if (!this.ready()) {
        this.ready.set(true);
        this.resolveReady();
      }
    });
  }

  /** Resolves once the initial auth state has been determined. */
  whenReady(): Promise<void> {
    return this.readyPromise;
  }

  async register(name: string, email: string, password: string): Promise<void> {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      const profile: AppUser = { uid: cred.user.uid, displayName: name, email, createdAt: Date.now() };
      await this.users.createProfile(profile);
      this.user.set(profile);
    } catch (e) {
      throw new Error(this.message(e));
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      this.user.set(this.toAppUser(cred.user));
    } catch (e) {
      throw new Error(this.message(e));
    }
  }

  async logout(): Promise<void> {
    await signOut(auth);
    this.user.set(null);
  }

  private toAppUser(fb: User): AppUser {
    return {
      uid: fb.uid,
      displayName: fb.displayName ?? fb.email?.split('@')[0] ?? 'משתמש',
      email: fb.email ?? '',
      photoURL: fb.photoURL ?? undefined,
    };
  }

  /** Translate Firebase auth error codes into friendly Hebrew messages. */
  private message(e: unknown): string {
    const code = (e as { code?: string })?.code ?? '';
    switch (code) {
      case 'auth/invalid-email':
        return 'כתובת אימייל לא תקינה';
      case 'auth/email-already-in-use':
        return 'האימייל כבר רשום במערכת';
      case 'auth/weak-password':
        return 'הסיסמה חלשה מדי (לפחות 6 תווים)';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'אימייל או סיסמה שגויים';
      case 'auth/too-many-requests':
        return 'יותר מדי ניסיונות. נסו שוב מאוחר יותר';
      case 'auth/network-request-failed':
        return 'בעיית רשת. בדקו את החיבור לאינטרנט';
      case 'auth/invalid-api-key':
      case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
        return 'תצורת Firebase חסרה — יש להזין מפתחות אמיתיים בקובץ environment.ts';
      default:
        return 'אירעה שגיאה. נסו שוב';
    }
  }
}
