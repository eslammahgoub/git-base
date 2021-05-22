import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitbaseViewerComponent } from './gitbase-viewer.component';

describe('GitbaseViewerComponent', () => {
  let component: GitbaseViewerComponent;
  let fixture: ComponentFixture<GitbaseViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitbaseViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitbaseViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
