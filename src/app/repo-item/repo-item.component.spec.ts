import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedService } from '@core/services';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { repoItem } from '@shared/mocks';


import { RepoItemComponent } from './repo-item.component';

describe('RepoItemComponent', () => {
  let component: RepoItemComponent;
  let fixture: ComponentFixture<RepoItemComponent>;
  const initialState = { favorite: false };
  let store: MockStore;
  let mockSharedService: SharedService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatToolbarModule,
        MatTooltipModule,
      ],
      declarations: [ RepoItemComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
    mockSharedService = TestBed.inject(SharedService);

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render back button component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.back-btn')).toBeTruthy();
  });

  it('should render repo avatar if repo exist', () => {
    fixture.componentInstance.repo = repoItem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img.avatar')).toBeTruthy();
  });

  it('should render repo name if repo exist', () => {
    fixture.componentInstance.repo = repoItem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p.mat-title').textContent.toLowerCase()).toBe(repoItem.name.toLowerCase());
  });

  it('should render repo public state icon if repo exist', () => {
    fixture.componentInstance.repo = repoItem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-icon.public-icon')).toBeTruthy();
  });

  it('should render repo button for favorite if repo exist', () => {
    fixture.componentInstance.repo = repoItem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.favorite-btn')).toBeTruthy();
  });

  it('should render repo description as text if repo exist', () => {
    fixture.componentInstance.repo = repoItem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div.description').textContent).toBe(repoItem.description);
  });

  it('should toggleFavorite set the current repo favorite to true if false', () => {
    fixture.componentInstance.repo = repoItem;
    fixture.componentInstance.repo.favorite = false;
    fixture.detectChanges();
    fixture.componentInstance.toggleFavorite();
    fixture.detectChanges();

    expect(fixture.componentInstance.repo.favorite).toBe(true);
  });

  it('should toggleFavorite set the current repo favorite to false if true', () => {
    fixture.componentInstance.repo = repoItem;
    fixture.componentInstance.repo.favorite = true;
    fixture.detectChanges();
    fixture.componentInstance.toggleFavorite();
    fixture.detectChanges();

    expect(fixture.componentInstance.repo.favorite).toBe(false);
  });

  it('should setFavoriteAndEmitChanges set the current repo favorite to value and emit the changes', () => {
    spyOn(mockSharedService.changeItems, 'next');

    fixture.componentInstance.repo = repoItem;
    fixture.componentInstance.repo.favorite = false;
    fixture.detectChanges();
    fixture.componentInstance.setFavoriteAndEmitChanges(true);
    fixture.detectChanges();

    expect(fixture.componentInstance.repo.favorite).toBe(true);
    expect(mockSharedService.changeItems.next).toHaveBeenCalled();
  });
});
