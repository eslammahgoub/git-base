import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Order, Sort } from '@shared/models';

import { SortFilterDialogComponent } from './sort-filter-dialog.component';

describe('SortFilterDialogComponent', () => {
  let component: SortFilterDialogComponent;
  let fixture: ComponentFixture<SortFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        MatDialogModule,
        MatTooltipModule,
      ],
      declarations: [ SortFilterDialogComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render toolbar header element for dialog', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-toolbar.gitbase-header.dialog-header')).toBeTruthy();
  });

  it('should render a header title "Sort and Order"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p.title').textContent).toBe('Sort and Order');
  });

  it('should render a apply button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button[mat-flat-button]').textContent).toBe('Apply');
  });

  it('should render a sortBy header for list of sort by', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3[matSubheader].sort-by').textContent).toBe('Sort BY');
  });

  it('should render a orderBy header for list of order by', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3[matSubheader].order-by').textContent).toBe('Order BY');
  });

  it('should render a dialog action with button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-dialog-actions button')).toBeTruthy();
    expect(compiled.querySelector('mat-dialog-actions button').textContent).toBe("RESET ALL");
  });

  it('should selectSort fun set sort to options', () => {
    fixture.componentInstance.selectSort(Sort.forks);
    fixture.detectChanges();
    expect(fixture.componentInstance.options.sort).toBe(Sort.forks);
  });

  it('should selectSort fun set order asc to options if no order', () => {
    fixture.componentInstance.options = {
    };
    fixture.componentInstance.selectSort(Sort.forks);
    fixture.detectChanges();
    expect(fixture.componentInstance.options.order).toBe(Order.asc);
  });

  it('should selectOrder fun set order to options', () => {
    fixture.componentInstance.selectOrder(Order.desc);
    fixture.detectChanges();
    expect(fixture.componentInstance.options.order).toBe(Order.desc);
  });

  it('should isSelectedOrder fun check if current order is selected or not from the list', () => {
    fixture.componentInstance.options = {};
    fixture.componentInstance.selectOrder(Order.desc);
    fixture.detectChanges();
    const value = fixture.componentInstance.isSelectedOrder(Order.desc);
    fixture.detectChanges();
    expect(value).toBeTruthy();
  });

  it('should isSelectedSort fun check if current sort is selected or not from the list', () => {
    fixture.componentInstance.options = {};
    fixture.componentInstance.selectSort(Sort.forks);
    fixture.detectChanges();
    const value = fixture.componentInstance.isSelectedSort(Sort.forks);
    fixture.detectChanges();
    expect(value).toBeTruthy();
  });

  it('should resetAll fun to reset all the options', () => {
    fixture.componentInstance.resetAll();
    fixture.detectChanges();
    expect(fixture.componentInstance.options.q).toBe(undefined);
  });
});
