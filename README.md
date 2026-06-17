# Invite Studio 🎨

A modern, **Canva-style invitation design web app**. Design beautiful invitations
for any event using templates, backgrounds, fonts, colors, shapes and stickers —
then save them to the cloud. Built with **Angular 21** and **Firebase**, with full
**Hebrew / RTL** support.

> Student project. Free to run — no paid services, no payments, no complicated backend.

---

## ✨ Main features

- **Landing page** with an animated hero and template showcase.
- **Templates gallery** — 18+ ready-made invitations (wedding, birthday, bar/bat
  mitzvah, baby, business and more) with category filters.
- **DOM-based invitation editor** that feels like a real design tool:
  - Add / select / drag / resize text, shapes (rectangle, circle, line, frame)
    and decorative stickers.
  - Change font family, size, color, alignment, bold/italic/underline.
  - Solid / gradient / pattern / decorative backgrounds + custom colors.
  - Layers panel, duplicate, delete, bring forward / send backward.
  - Undo / redo, reset, keyboard shortcuts.
- **Firebase Authentication** (email/password) with protected routes.
- **Firestore** saving — save, load, edit, duplicate and delete your designs.
- **My Designs** dashboard with live previews.
- Fully **responsive** and **RTL-first**, with toasts, loading and empty states.

> Export to PNG/PDF is added in a later phase.

---

## 🧱 Tech stack

| Area | Choice |
|------|--------|
| Framework | Angular 21 (standalone components, zoneless, signals) |
| Language | TypeScript |
| Styling | SCSS with a CSS-variable design system |
| Editor | DOM-based (no canvas library) — best RTL support, clean & readable |
| Auth & DB | Firebase Authentication + Cloud Firestore (modular SDK) |
| Hosting | Firebase Hosting (free tier) |

---

## 🏗️ Architecture (short)

```
src/app
├── core/            # models, services (auth, design, user, toast), guards, firebase init
├── data/            # local assets: templates, backgrounds, stickers, color-palettes, fonts
├── shared/          # reusable UI: navbar, footer, button, modal, toast, color-palette,
│                    #              template-card, design-preview
├── editor/          # EditorStateService + editor components
│   └── components/  # canvas-editor, editor-toolbar, assets-panel,
│                    # properties-panel, layers-panel
└── pages/           # home, templates, auth (login/register), editor, my-designs, profile
```

- A design is plain JSON (`DesignDocument`): canvas + background + an ordered list
  of elements (each positioned in **percentages**, so it scales to any size).
- `EditorStateService` is the single source of truth for the editor (signals +
  undo/redo history). The canvas, panels and layers all read/write it.
- The same `design-preview` component renders designs everywhere (cards, gallery,
  My Designs) directly from the JSON.

---

## 🚀 Run locally

```bash
npm install
npm start          # → http://localhost:4200
```

The app **compiles and runs without Firebase keys**, but login/register and
saving designs require a real Firebase config (see below). Designing, browsing
templates and using the editor work without any setup.

---

## 🔥 Firebase setup

### 1. Create a Firebase project
1. Go to <https://console.firebase.google.com> and click **Add project** (it's free).
2. Give it a name and finish the wizard (Google Analytics is optional).

### 2. Add a Web App
1. In the project, click the **Web** icon (`</>`) to register a web app.
2. Firebase shows a `firebaseConfig` object — keep this page open.

### 3. Paste your config
Open [`src/environments/environment.ts`](src/environments/environment.ts) and
replace the placeholder values with the ones from `firebaseConfig`:

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIza...',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: '1234567890',
    appId: '1:1234567890:web:abcdef',
  },
};
```

### 4. Enable Authentication
1. In the console: **Build → Authentication → Get started**.
2. Open **Sign-in method** → enable **Email/Password** → Save.

### 5. Enable Cloud Firestore
1. In the console: **Build → Firestore Database → Create database**.
2. Choose **Production mode** and a location → Enable.

### 6. Deploy the security rules
The rules in [`firestore.rules`](firestore.rules) ensure each user can read/write
**only their own** profile and designs. Deploy them:

```bash
npm install -g firebase-tools     # one-time
firebase login
# set your project id in .firebaserc (replace YOUR_FIREBASE_PROJECT_ID)
firebase deploy --only firestore:rules
```

You can now register a user, log in, and save/load designs. 🎉

---

## ☁️ Deploy to Firebase Hosting (free)

Everything is pre-configured: `firebase.json` already points Hosting at the
Angular build output (`dist/invite-studio/browser`) with an SPA rewrite, and
`firestore.rules` is ready to deploy.

### Full deployment steps

```bash
# 1. Install dependencies and verify the app locally
npm install
npm start                         # → http://localhost:4200

# 2. Build the production bundle
ng build                          # outputs to dist/invite-studio/browser

# 3. Log in to Firebase
npm install -g firebase-tools     # one-time
firebase login

# 4. (First time only) link this folder to your Firebase project.
#    Either edit .firebaserc and replace YOUR_FIREBASE_PROJECT_ID, OR run:
firebase init
#    → choose "Hosting" and "Firestore", select your existing project,
#      set public dir to: dist/invite-studio/browser,
#      configure as a single-page app: Yes,
#      keep the existing firestore.rules / firebase.json when asked.

# 5. Deploy
firebase deploy                   # deploys hosting + firestore rules
# or selectively:
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

Your app goes live at `https://YOUR_PROJECT_ID.web.app`. 🚀

### Deployment checklist
- ✅ Real Firebase config pasted into `src/environments/environment.ts`
- ✅ Email/Password sign-in enabled in **Authentication**
- ✅ **Cloud Firestore** database created
- ✅ Security rules deployed (`firebase deploy --only firestore:rules`)
- ✅ `.firebaserc` points to your project id

---

## 🔒 Data model

```
users/{uid}      → { uid, displayName, email, createdAt }
designs/{id}     → { userId, title, canvas, background, elements,
                     templateId, preview, createdAt, updatedAt }
```

Templates, backgrounds, stickers and color palettes are **bundled in the app**
(`src/app/data`), not stored in Firestore — so there is nothing public to secure.

---

## 🗺️ Roadmap

- ✅ Phase 1 — Project, routing, pages, editor shell
- ✅ Phase 2 — Interactive DOM editor
- ✅ Phase 3 — Templates, backgrounds, stickers, palettes, polish
- ✅ Phase 4 — Firebase Auth + Firestore (save/load/edit/duplicate/delete)
- ✅ Phase 5 — Export to PNG/PDF, responsive polish, deployment

---

## ⬇️ Export / download

Open any design in the editor and click **⬇ הורדה**. A dialog lets you choose:
- **PNG** — a high-resolution image (rendered at 2× via `html-to-image`).
- **PDF** — a clean, centered single-page A4 (`jsPDF`).

Exports come from an off-screen, full-resolution render of the design, so the
file looks exactly like the finished invitation — with correct Hebrew/RTL text
and no editor selection handles. The file name is taken from the design title.
