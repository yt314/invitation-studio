/** Authenticated user profile, mirrored into Firestore (`users/{uid}`). */
export interface AppUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  createdAt?: number;
}
