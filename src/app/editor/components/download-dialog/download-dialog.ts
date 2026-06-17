import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DesignDocument } from '../../../core/models/design.model';
import { ExportService } from '../../../core/services/export.service';
import { ToastService } from '../../../core/services/toast.service';
import { DesignPreview } from '../../../shared/components/design-preview/design-preview';
import { Modal } from '../../../shared/components/modal/modal';
import { Button } from '../../../shared/components/button/button';

type Format = 'png' | 'pdf';

/**
 * Download dialog: shows a preview of the invitation and lets the user pick
 * PNG or PDF. Exports from a hidden full-resolution render (no selection
 * outline/handles), so downloads look exactly like a finished invitation.
 */
@Component({
  selector: 'app-download-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DesignPreview, Modal, Button],
  template: `
    <app-modal [open]="open()" heading="הורדת ההזמנה" [showFooter]="false" (closed)="closed.emit()">
      <div class="dl">
        <div class="dl__frame">
          <app-design-preview [design]="design()" />
        </div>

        <p class="dl__hint">בחרו פורמט — הקובץ יישמר אוטומטית במכשיר שלכם.</p>

        <div class="dl__btns">
          <app-button variant="primary" [block]="true" [loading]="busy() === 'png'"
            [disabled]="busy() !== null" (pressed)="download('png')">
            תמונה (PNG)
          </app-button>
          <app-button variant="secondary" [block]="true" [loading]="busy() === 'pdf'"
            [disabled]="busy() !== null" (pressed)="download('pdf')">
            מסמך (PDF)
          </app-button>
        </div>
      </div>

      <!-- Hidden, full-resolution export source (rendered off-screen). -->
      <div class="dl__export" aria-hidden="true">
        <div #exportNode class="dl__export-node"
          [style.width.px]="design().canvas.width"
          [style.height.px]="design().canvas.height">
          <app-design-preview [design]="design()" />
        </div>
      </div>
    </app-modal>
  `,
  styles: [
    `
      .dl {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18px;
      }
      .dl__frame {
        width: 220px;
        aspect-ratio: 5 / 7;
        border-radius: var(--r-md);
        overflow: hidden;
        box-shadow: var(--sh-lg);
        border: 5px solid #fff;
      }
      .dl__hint {
        font-size: 14px;
        color: var(--ink-soft);
        text-align: center;
      }
      .dl__btns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        width: 100%;
      }
      /* Off-screen export node at the design's native pixel size. */
      .dl__export {
        position: fixed;
        inset-inline-start: -100000px;
        top: 0;
        pointer-events: none;
        opacity: 0;
      }
      .dl__export-node {
        background: #fff;
      }
      @media (max-width: 480px) {
        .dl__btns {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class DownloadDialog {
  private readonly exportService = inject(ExportService);
  private readonly toast = inject(ToastService);

  readonly design = input.required<DesignDocument>();
  readonly open = input(false);
  readonly closed = output<void>();

  private readonly exportNode = viewChild<ElementRef<HTMLElement>>('exportNode');

  /** Which format is currently exporting (for per-button spinner). */
  readonly busy = signal<Format | null>(null);

  readonly fileName = computed(() => {
    const raw = this.design().title?.trim() || 'invitation';
    // Keep Hebrew letters, latin, digits, spaces and dashes; drop the rest.
    const clean = raw.replace(/[^\w֐-׿ \-]/g, '').replace(/\s+/g, '-');
    return clean || 'invitation';
  });

  async download(format: Format): Promise<void> {
    const node = this.exportNode()?.nativeElement;
    if (!node) return;

    this.busy.set(format);
    try {
      if (format === 'png') {
        await this.exportService.downloadPng(node, this.fileName());
        this.toast.success('התמונה הורדה בהצלחה ✓');
      } else {
        await this.exportService.downloadPdf(node, this.fileName(), this.design().canvas);
        this.toast.success('ה‑PDF הורד בהצלחה ✓');
      }
    } catch {
      this.toast.error('ההורדה נכשלה. נסו שוב.');
    } finally {
      this.busy.set(null);
    }
  }
}
