import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService as ngxWebStorageService } from 'ngx-webstorage-service';
import { RepoItem, Store } from '@shared/models';

// key that is used to access the data in local storage
export const STORAGE_KEY = 'local_storage_key';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // current List
  currentItems: RepoItem[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: ngxWebStorageService) { }

  /**
   * store
   * @description store schema into the storage
   * void
   */
   public setStore(currentSchema: Store): void {
     // set the items
     this.currentItems = currentSchema.items;
     // set current item into the storage
     this.storage.set(STORAGE_KEY, JSON.stringify(currentSchema));
  }

  /**
   * getStore
   * @description get current schema from the storage
   * void
   */
   public getStore(): Store | null {
    return this.storage.has(STORAGE_KEY) ? JSON.parse(this.storage.get(STORAGE_KEY)) : null;
 }


  /**
   * deleteLocalStorage
   * @description to clear the storage in the local stroage
   * void
   */
  public deleteLocalStorage(): void {
    this.storage.clear();
  }
}
