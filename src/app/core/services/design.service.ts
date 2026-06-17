import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { DesignDocument } from '../models/design.model';

/**
 * CRUD for invitation designs in the `designs` Firestore collection.
 * The whole design (canvas + background + elements) is stored as plain JSON,
 * so loading it back into the editor restores the exact state.
 */
@Injectable({ providedIn: 'root' })
export class DesignService {
  private readonly col = collection(db, 'designs');

  /** Save a new design for a user; returns the new document id. */
  async create(design: DesignDocument, userId: string): Promise<string> {
    const now = Date.now();
    const ref = await addDoc(this.col, this.serialize(design, userId, now, now));
    return ref.id;
  }

  /** Update an existing design (keeps createdAt, refreshes updatedAt). */
  async update(id: string, design: DesignDocument, userId: string): Promise<void> {
    const createdAt = design.createdAt ?? Date.now();
    await updateDoc(doc(db, 'designs', id), this.serialize(design, userId, createdAt, Date.now()));
  }

  /** Load a single design by id, or null if not found. */
  async getById(id: string): Promise<DesignDocument | null> {
    const snap = await getDoc(doc(db, 'designs', id));
    return snap.exists() ? { id: snap.id, ...(snap.data() as DesignDocument) } : null;
  }

  /** All designs owned by a user, newest first. Sorted client-side so no
   *  composite Firestore index is required. */
  async listByUser(userId: string): Promise<DesignDocument[]> {
    const snap = await getDocs(query(this.col, where('userId', '==', userId)));
    return snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as DesignDocument) }))
      .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
  }

  /** Create an independent copy of a design for the same user. */
  async duplicate(design: DesignDocument, userId: string): Promise<string> {
    const copy: DesignDocument = { ...design, title: `${design.title} (עותק)` };
    delete copy.id;
    return this.create(copy, userId);
  }

  /** Permanently delete a design. */
  async remove(id: string): Promise<void> {
    await deleteDoc(doc(db, 'designs', id));
  }

  /** Build the Firestore payload (avoids storing `undefined`, which Firestore
   *  rejects). */
  private serialize(d: DesignDocument, userId: string, createdAt: number, updatedAt: number) {
    return {
      userId,
      title: d.title,
      canvas: d.canvas,
      background: d.background,
      elements: d.elements,
      templateId: d.templateId ?? null,
      preview: d.preview ?? null,
      createdAt,
      updatedAt,
    };
  }
}
