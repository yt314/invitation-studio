import { Injectable, computed, signal } from '@angular/core';
import { AppUser } from '../models/user.model';

/**
 * Authentication facade.
 *
 * PHASE 1 NOTE: This is a lightweight stub exposing a signal-based auth state
 * so the navbar, guards and pages can be built and demoed without Firebase.
 * In Phase 4 the method bodies are replaced with real Firebase Auth calls
 * (signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut) while
 * the public surface (signals + method signatures) stays the same.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Current signed-in user, or null when signed out. */
  readonly user = signal<AppUser | null>(null);
  readonly isLoggedIn = computed(() => this.user() !== null);
  /** True until the initial auth state has been resolved. */
  readonly ready = signal(true);

  async register(name: string, email: string, _password: string): Promise<void> {
    // Replaced by Firebase in Phase 4.
    this.user.set({ uid: 'demo-' + email, displayName: name, email });
  }

  async login(email: string, _password: string): Promise<void> {
    this.user.set({ uid: 'demo-' + email, displayName: email.split('@')[0], email });
  }

  async logout(): Promise<void> {
    this.user.set(null);
  }
}
