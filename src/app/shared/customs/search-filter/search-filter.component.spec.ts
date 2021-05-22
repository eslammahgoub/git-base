import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ SearchFilterComponent ],
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatTooltipModule,
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: {}
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render combobox component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-form-field[role="combobox"]')).toBeTruthy();
  });

  it('should render combobox component has autocomplete component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-form-field[role="combobox"] mat-autocomplete')).toBeTruthy();
  });

  it('should render combobox component has input component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-form-field[role="combobox"] input')).toBeTruthy();
  });

  it('should render combobox component has input suffix button', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button[matSuffix]')).toBeTruthy();
  });

  it('should render have a button with filter icon when searchOn equal false && filterOn equal true', () => {
    fixture.componentInstance.searchOn = false;
    fixture.componentInstance.filterOn = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.filter-btn').textContent).toBe('filter_list');
  });

  it('should render have a button with search icon when searchOn equal false', () => {
    fixture.componentInstance.searchOn = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.search-btn mat-icon').textContent).toBe('search');
  });

  it('should toggleSearch toggle the value of searchOn', () => {
    fixture.componentInstance.searchOn = false;
    fixture.detectChanges();
    fixture.componentInstance.toggleSearch();
    fixture.detectChanges();
    expect(fixture.componentInstance.searchOn).toBeTruthy();
  });

  it('should setSearchValue toggle the value of searchOn', () => {
    fixture.componentInstance.searchOn = false;
    fixture.detectChanges();
    fixture.componentInstance.setSearchValue({
        option: {
          value: 'value',
        }
    } as MatAutocompleteSelectedEvent);
    fixture.detectChanges();
    expect(fixture.componentInstance.searchOn).toBeTruthy();
  });

  it('should setSearchValue set the search value to the options', () => {
    const value = 'q';
    fixture.componentInstance.searchOn = false;
    fixture.detectChanges();
    fixture.componentInstance.setSearchValue({
        option: {
          value,
        }
    } as MatAutocompleteSelectedEvent);
    fixture.detectChanges();
    expect(fixture.componentInstance.options.q).toBe(value);
  });
});
