import { Injectable } from '@angular/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AppUser } from '../models/user.model';

/** Reads/writes the user's profile document at `users/{uid}` in Firestore. */
@Injectable({ providedIn: 'root' })
export class UserService {
  /** Create (or merge) the profile document for a user. */
  async createProfile(user: AppUser): Promise<void> {
    await setDoc(
      doc(db, 'users', user.uid),
      {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        createdAt: user.createdAt ?? Date.now(),
      },
      { merge: true },
    );
  }

  /** Load a profile document, or null if it doesn't exist. */
  async getProfile(uid: string): Promise<AppUser | null> {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? (snap.data() as AppUser) : null;
  }
}
