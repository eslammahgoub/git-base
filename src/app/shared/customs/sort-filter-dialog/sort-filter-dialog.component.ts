import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Order, RepoParam, Sort } from '@shared/models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'gitbase-sort-filter-dialog',
  templateUrl: './sort-filter-dialog.component.html',
})
export class SortFilterDialogComponent {
  constructor(
    private matDialogRef: MatDialogRef<SortFilterDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: RepoParam,
  ) {
    // Get the data from the search filter component and set it to the options
    if (data) {
      this.options = data;
    }
  }

  // Sort options
  availableSortOptions = Sort;

  // order options
  availableOrderOptions = Order;

  // Options to to select
  options: Partial<RepoParam> = {};

  /**
   * selectSort
   * @function
   * @description to select sort value
   * @param value {string}
   * void
   */
  selectSort(value: string): void {
    this.options.sort = Sort[value as keyof typeof Sort];
    if (!this.options.order) {
      this.options.order = Order.asc;
    }
  }

  /**
   * selectOrder
   * @function
   * @description to select order value
   * @param value {string}
   * void
   */
  selectOrder(value: string): void {
    this.options.order = Order[value as keyof typeof Order];
  }

  /**
   * isSelectedOrder
   * @description check if selected order or not
   * @param value {string}
   * @returns boolean
   */
  isSelectedOrder(value: string): boolean {
    return this.options.order === value;
  }

  /**
   * isSelectedSort
   * @function
   * @description check if selected sort or not
   * @param value {string}
   * @returns boolean
   */
  isSelectedSort(value: string): boolean {
    return this.options.sort === value;
  }

  /**
   * resetAll
   * @function
   * @description reset all the options
   * void
   */
  resetAll(): void {
    this.options = {};
  }

  /**
   * apply
   * @function
   * @description apply to emit options
   * void
   */
  apply(): void {
    this.matDialogRef.close(this.options);
  }
}

