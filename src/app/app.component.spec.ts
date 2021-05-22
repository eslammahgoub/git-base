import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { RepositoryService, SharedService, StorageService } from '@core/services';
import { repoItem, repoResponse } from '@shared/mocks';
import { RepoItem, RepoSearchResponse, Store } from '@shared/models';
import { STORAGE_KEY } from '@core/services/';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let mockRepositoryService;
  let fixture: ComponentFixture<AppComponent>;
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
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        SharedService,
        StorageService,
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    mockRepositoryService = TestBed.inject(RepositoryService);

    spyOn(mockRepositoryService, 'getAllRepositories').and.returnValue(of(repoResponse as RepoSearchResponse)); // mock output of function
    spyOn(mockRepositoryService, 'getRepository').and.returnValue(of(repoItem as RepoItem)); // mock output of function
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render top element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#top')).toBeTruthy();
  });

  it('should render wrapper element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.wrapper')).toBeTruthy();
  });

  it('should render gitbase-header element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('gitbase-header')).toBeTruthy();
  });

  it('should render gitbase-viewer element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('gitbase-viewer')).toBeTruthy();
  });

  it('should render bottom element', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#bottom')).toBeTruthy();
  });

  it('should getItems fun get Items from the repo api', () => {
    fixture.componentInstance.getItems(store.options);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasItems).toBeTruthy();
    expect(fixture.componentInstance.currentItems.length).toEqual(repoResponse.items.length);
  });

  it('should getItems fun get Items from the repo set total of all the items', () => {
    fixture.componentInstance.getItems(store.options);
    fixture.detectChanges();
    expect(fixture.componentInstance.total).toEqual(repoResponse.total_count);
  });

  it('should getRepoInfo set selectedItem', () => {
    fixture.componentInstance.getRepoInfo(repoItem.url);
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedItem.id).toEqual(repoItem.id);
  });

  it('should store Fun set local storage to current store schema', () => {
    fixture.componentInstance.currentItems = store.items;
    fixture.componentInstance.options = store.options;
    fixture.componentInstance.selectedItem = store.selectedItem;
    fixture.componentInstance.total = store.total;

    fixture.componentInstance.store();
    fixture.detectChanges();
    expect(localStorage.key(0)).toBeTruthy();
  });

  it('should setValues Fun get values from local storage', () => {
    fixture.componentInstance.currentItems = store.items;
    fixture.componentInstance.options = store.options;
    fixture.componentInstance.selectedItem = store.selectedItem;
    fixture.componentInstance.total = store.total;

    fixture.componentInstance.store();
    fixture.detectChanges();
    fixture.componentInstance.currentItems = [];
    fixture.componentInstance.setValues();

    expect(fixture.componentInstance.currentItems.length).toEqual(store.items.length);
    expect(fixture.componentInstance.options.q).toEqual(store.options.q);
    expect(fixture.componentInstance.total).toEqual(store.total);
    expect(fixture.componentInstance.selectedItem.id).toEqual(store.selectedItem.id);
  });

  it('should gotoList navigate to list', () => {
    fixture.componentInstance.currentItems = repoResponse.items;
    fixture.componentInstance.gotoList();

    fixture.detectChanges();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should gotoItem navigate to item', () => {
    fixture.componentInstance.currentItems = repoResponse.items;
    fixture.componentInstance.gotoItem();

    fixture.detectChanges();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/item']);
  });
});
