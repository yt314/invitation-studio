/**
 * Firebase configuration.
 *
 * 👉 PASTE YOUR REAL FIREBASE CONFIG HERE.
 *
 * These are PLACEHOLDERS — the app compiles and runs with them, but
 * Authentication and Firestore will only work once you replace them with the
 * real values from your Firebase project.
 *
 * Where to get them:
 *   1. Go to https://console.firebase.google.com and create a project (free).
 *   2. Add a Web App (</>) to the project.
 *   3. Copy the `firebaseConfig` object shown and paste its values below.
 *   4. In the console: enable Authentication → Sign-in method → Email/Password.
 *   5. In the console: create a Cloud Firestore database (production mode).
 *   6. Deploy the security rules from `firestore.rules` (see README).
 *
 * See README.md → "Firebase setup" for full step-by-step instructions.
 */
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
};

/** True when the Firebase config still contains placeholder values. */
export const firebaseConfigured = environment.firebase.apiKey !== 'YOUR_API_KEY';
