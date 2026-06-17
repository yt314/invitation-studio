/**
 * Single Firebase initialization point.
 *
 * Uses the modular Firebase SDK directly (no @angular/fire) to keep the setup
 * simple, version-independent and easy to understand. Services import the
 * exported `auth` and `db` from here.
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../../../environments/environment';

export const firebaseApp = initializeApp(environment.firebase);

/** Firebase Authentication instance. */
export const auth = getAuth(firebaseApp);

/** Cloud Firestore database instance. */
export const db = getFirestore(firebaseApp);
