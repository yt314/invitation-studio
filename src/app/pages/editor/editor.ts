import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { createBlankDesign, designFromTemplate } from '../../core/services/design-factory';
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
 * instance (provided here, so every editor session starts fresh). Loads a
 * template (via ?template=) or a blank design.
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
  private readonly toast = inject(ToastService);
  readonly state = inject(EditorStateService);

  readonly tab = signal<EditorTab>('templates');
  readonly resetOpen = signal(false);

  constructor() {
    const templateId = this.route.snapshot.queryParamMap.get('template');
    const design = (templateId && designFromTemplate(templateId)) || createBlankDesign();
    this.state.load(design);
    if (templateId) this.toast.info('התבנית נטענה — אפשר להתחיל לערוך ✨');
  }

  setTab(tab: EditorTab): void {
    this.tab.set(tab);
  }

  confirmReset(): void {
    this.state.reset();
    this.resetOpen.set(false);
    this.toast.success('העיצוב אופס למצב ההתחלתי');
  }

  comingSoon(): void {
    this.toast.info('שמירה והורדה מתווספות בשלבים הבאים 🙂');
  }
}
