import { Injectable } from '@nestjs/common';
import * as Y from 'yjs';

@Injectable()
export class YjsPersistenceService {
  private storage: Map<string, Uint8Array> = new Map();

  async storeUpdate(docName: string, update: Uint8Array): Promise<void> {
    this.storage.set(docName, update);
  }

  async getUpdate(docName: string): Promise<Uint8Array | null> {
    return this.storage.get(docName) || null;
  }
} 