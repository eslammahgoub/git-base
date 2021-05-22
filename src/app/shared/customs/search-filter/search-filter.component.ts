import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '@core/services';
import { RepoParam } from '@shared/models';
import { SortFilterDialogComponent } from '../sort-filter-dialog/sort-filter-dialog.component';

@Component({
  selector: 'gitbase-search-filter',
  templateUrl: './search-filter.component.html'
})
export class SearchFilterComponent {
  // current options
  options: Partial<RepoParam> = {};

  // searchOn for search input visibility
  @Input() searchOn: boolean = true;

  // searchCtrl form control for search input
  searchCtrl: FormControl = new FormControl();

  // filterOn for filter button visibility
  @Input() filterOn: boolean = false;

  // emit the selected search value
  @Output() searchValue: EventEmitter<RepoParam> = new EventEmitter<RepoParam>();

  constructor(public dialog: MatDialog, private sharedServ: SharedService) {
  }

  /**
   * toggleSearch
   * @function
   * @description toggle search input value
   * void
   */
  toggleSearch(): void {
    this.searchOn = !this.searchOn;
  }

  /**
   * setSearchValue
   * @function
   * @description emit search input value && toggle the search Input
   * @param str {string} selected value
   * void
   */
  setSearchValue(selected: MatAutocompleteSelectedEvent): void {
    this.options.q = selected.option.value;
    this.searchValue.emit(this.options as RepoParam);
    this.toggleSearch();
  }

  /**
   * openFilterDialog
   * @function
   * @description open filter dialog
   * void
   */
  openFilterDialog(): void {
    let data = this.options && this.options.q ? this.options : this.sharedServ.options;
    const dialogRef: MatDialogRef<SortFilterDialogComponent> = this.dialog.open(SortFilterDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result: Partial<RepoParam>) => {
      // check if result or not
      if (result) {
        // merge with the exist options
        let options: RepoParam;
        if (!result.order) {
          options = {'q': this.options.q, 'page': this.options.page || 1} as RepoParam;
        } else {
          options = Object.assign(this.options, result as RepoParam);
        }
        // emit the order && sort options
        this.options = options;
        this.searchValue.emit(options);
      }
    });
  }
}
