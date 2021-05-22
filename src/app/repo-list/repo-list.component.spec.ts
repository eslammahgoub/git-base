import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedService } from '@core/services';
import { repoResponse } from '@shared/mocks';

import { RepoListComponent } from './repo-list.component';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let mockSharedService: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        MatTooltipModule,
      ],
      declarations: [ RepoListComponent ]
    })
    .compileComponents();
    mockSharedService = TestBed.inject(SharedService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render sub header with repoCount if reposCount exist', () => {
    component.reposCount = repoResponse.total_count;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div[mat-subheader]')).toBeTruthy();
    expect(compiled.querySelector('div[mat-subheader]').textContent).toBe(`${component.reposCount} repository results`);
  });

  it('should render avatar icon if repos exist', () => {
    component.reposCount = repoResponse.total_count;
    component.repos = repoResponse.items;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-icon[matListAvatar]')).toBeTruthy();
    expect(compiled.querySelector('mat-icon[matListAvatar]').textContent).toBe(`summarize`);
  });

  it('should render list of repos items if repos exist', () => {
    component.reposCount = repoResponse.total_count;
    component.repos = repoResponse.items;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-list')).toBeTruthy();
  });

  it('should render mat-paginator', () => {
    component.reposCount = repoResponse.total_count;
    component.repos = repoResponse.items;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-paginator')).toBeTruthy();
  });

  it('should setSelectedRepoURL fun to emit the current selected url', () => {
    spyOn(mockSharedService.changeUrl, 'next');

    component.reposCount = repoResponse.total_count;
    component.repos = repoResponse.items;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    component.setSelectedRepoURL(repoResponse.items[0].issues_url);
    expect(mockSharedService.changeUrl.next).toHaveBeenCalled();
  });

  it('should pageChanged fun to emit the current page changes', () => {
    spyOn(mockSharedService.changePage, 'next');

    component.reposCount = repoResponse.total_count;
    component.repos = repoResponse.items;
    fixture.detectChanges();
    const page = new PageEvent();
    page.pageIndex = 1;
    component.pageChanged(page);
    expect(mockSharedService.changePage.next).toHaveBeenCalled();
  });

});
