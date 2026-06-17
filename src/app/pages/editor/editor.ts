import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { createBlankDesign, designFromTemplate } from '../../core/services/design-factory';
import { AuthService } from '../../core/services/auth.service';
import { DesignService } from '../../core/services/design.service';
import { ToastService } from '../../core/services/toast.service';
import { EditorStateService } from '../../editor/editor-state.service';
import { EditorTab } from '../../editor/editor.types';
import { CanvasEditor } from '../../editor/components/canvas-editor/canvas-editor';
import { EditorToolbar } from '../../editor/components/editor-toolbar/editor-toolbar';
import { AssetsPanel } from '../../editor/components/assets-panel/assets-panel';
import { PropertiesPanel } from '../../editor/components/properties-panel/properties-panel';
import { LayersPanel } from '../../editor/components/layers-panel/layers-panel';
import { Modal } from '../../shared/components/modal/modal';
import { Button } from '../../shared/components/button/button';

/**
 * Editor page — composes the studio layout and owns the EditorStateService
 * instance. Loads a saved design (editor/:id), a template (?template=), or a
 * blank design, and handles saving/duplicating to Firestore.
 */
@Component({
  selector: 'app-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditorStateService],
  imports: [
    RouterLink,
    CanvasEditor,
    EditorToolbar,
    AssetsPanel,
    PropertiesPanel,
    LayersPanel,
    Modal,
    Button,
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class Editor {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly auth = inject(AuthService);
  private readonly designs = inject(DesignService);
  readonly state = inject(EditorStateService);

  readonly tab = signal<EditorTab>('templates');
  readonly resetOpen = signal(false);

  /** Firestore id of the design being edited (null = unsaved/new). */
  readonly currentId = signal<string | null>(null);
  readonly saving = signal(false);
  readonly loading = signal(false);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadExisting(id);
    } else {
      const templateId = this.route.snapshot.queryParamMap.get('template');
      const design = (templateId && designFromTemplate(templateId)) || createBlankDesign();
      this.state.load(design);
      if (templateId) {
        this.tab.set('add');
        this.toast.info('התבנית נטענה — אפשר להתחיל לערוך ✨');
      }
    }
  }

  private async loadExisting(id: string): Promise<void> {
    this.loading.set(true);
    try {
      const design = await this.designs.getById(id);
      if (design) {
        this.state.load(design);
        this.currentId.set(design.id ?? id);
        this.tab.set('add');
      } else {
        this.toast.error('העיצוב לא נמצא');
        this.state.load(createBlankDesign());
      }
    } catch {
      this.toast.error('טעינת העיצוב נכשלה');
      this.state.load(createBlankDesign());
    } finally {
      this.loading.set(false);
    }
  }

  setTab(tab: EditorTab): void {
    this.tab.set(tab);
  }

  /** Save the current design — creates on first save, updates afterwards. */
  async save(): Promise<void> {
    const user = this.auth.user();
    if (!user) {
      this.toast.error('יש להתחבר כדי לשמור עיצוב');
      this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
      return;
    }

    this.saving.set(true);
    try {
      const design = this.state.design();
      const id = this.currentId();
      if (id) {
        await this.designs.update(id, design, user.uid);
        this.toast.success('העיצוב עודכן בהצלחה ✓');
      } else {
        const newId = await this.designs.create(design, user.uid);
        this.currentId.set(newId);
        this.router.navigate(['/editor', newId], { replaceUrl: true });
        this.toast.success('העיצוב נשמר בהצלחה ✓');
      }
    } catch (e) {
      this.toast.error((e as Error).message || 'שמירת העיצוב נכשלה');
    } finally {
      this.saving.set(false);
    }
  }

  /** Save the current design as a brand-new copy. */
  async saveCopy(): Promise<void> {
    const user = this.auth.user();
    if (!user) {
      this.toast.error('יש להתחבר כדי לשמור עיצוב');
      this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
      return;
    }

    this.saving.set(true);
    try {
      const newId = await this.designs.duplicate(this.state.design(), user.uid);
      this.currentId.set(newId);
      this.router.navigate(['/editor', newId], { replaceUrl: true });
      this.toast.success('נשמר עותק חדש של העיצוב ✓');
    } catch (e) {
      this.toast.error((e as Error).message || 'שמירת העותק נכשלה');
    } finally {
      this.saving.set(false);
    }
  }

  confirmReset(): void {
    this.state.reset();
    this.resetOpen.set(false);
    this.toast.success('העיצוב אופס למצב ההתחלתי');
  }

  downloadSoon(): void {
    this.toast.info('הורדה ל‑PNG/PDF מתווספת בשלב הבא 🙂');
  }
}
