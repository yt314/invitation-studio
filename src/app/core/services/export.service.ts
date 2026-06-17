import { Injectable } from '@angular/core';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * Exports a DOM node (a rendered invitation) to a downloadable PNG or PDF,
 * entirely in the browser — no server, no paid service.
 *
 * Hebrew/RTL text exports perfectly because the design is first rasterized to
 * a PNG image (html-to-image), so the PDF embeds that image.
 */
@Injectable({ providedIn: 'root' })
export class ExportService {
  /** Render a node to a high-resolution PNG data URL. */
  private async toDataUrl(node: HTMLElement): Promise<string> {
    // Make sure web fonts are loaded so text isn't rasterized with a fallback.
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    return toPng(node, { pixelRatio: 2, cacheBust: true });
  }

  /** Download the node as a PNG file. */
  async downloadPng(node: HTMLElement, fileName: string): Promise<void> {
    const dataUrl = await this.toDataUrl(node);
    this.triggerDownload(dataUrl, `${fileName}.png`);
  }

  /** Download the node as a single-page A4 PDF, centered with a small margin. */
  async downloadPdf(
    node: HTMLElement,
    fileName: string,
    aspect: { width: number; height: number },
  ): Promise<void> {
    const dataUrl = await this.toDataUrl(node);

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = 210;
    const pageH = 297;
    const margin = 12;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;

    const imgAspect = aspect.width / aspect.height;
    let drawW = maxW;
    let drawH = drawW / imgAspect;
    if (drawH > maxH) {
      drawH = maxH;
      drawW = drawH * imgAspect;
    }
    const x = (pageW - drawW) / 2;
    const y = (pageH - drawH) / 2;

    pdf.addImage(dataUrl, 'PNG', x, y, drawW, drawH, undefined, 'FAST');
    pdf.save(`${fileName}.pdf`);
  }

  private triggerDownload(dataUrl: string, fileName: string): void {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    link.click();
  }
}
