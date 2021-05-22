import { TestBed } from '@angular/core/testing';
import { repoItem, repoResponse } from '@shared/mocks';
import { Store } from '@shared/models';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let store: Store = {
    items: repoResponse.items,
    options: {
      q: '',
      page: 1,
      per_page: 30,
    },
    selectedItem: repoItem,
    total: repoResponse.total_count,
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should currentItems to be empty list on created', () => {
    expect(service.currentItems.length).toBe(0);
  });

  it('should setStore set store to local Storage', () => {
    service.currentItems = [];
    service.setStore(store);

    expect(localStorage.length).toBe(1);
    expect(service.currentItems.length).toBe(store.items.length);
  });

  it('should getSTore get store from local Storage', () => {
    service.setStore(store);
    const value = service.getStore();

    expect(value?.items.length).toBe(store.items.length);
  });

  it('should deleteLocalStorage fn clear all items from local Storage', () => {
    service.currentItems = [];
    service.deleteLocalStorage();

    expect(localStorage.length).toBe(0);
  });
});
