import { debounceTime, takeUntil } from 'rxjs/operators';
import { RepoItem, RepoSearchResponse, RepoParam, Store } from '@shared/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RepositoryService, SharedService, StorageService } from '@core/services';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'gitbase-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  unSub: Subject<any> = new Subject<any>();

  hasItems: boolean = false;

  currentItems: RepoItem[] = [];
  total: number = 0;
  selectedItem: RepoItem = {} as RepoItem;

  options: RepoParam = {} as RepoParam;

  constructor(
    private repoServ: RepositoryService,
    private sharedServ: SharedService,
    private storageServ: StorageService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  // on init the component
  ngOnInit(): void {
    this.setValues();
    this.itemUrlOBS();
    this.changePageOBS();
    this.itemsOBS();
    this.goBackOBS();
  }

  /**
   * itemOBS
   * @function
   * @description observe the items changes from the shared service
   * void
   */
   itemsOBS(): void {
    // get items changes
    this.sharedServ.changeItems.pipe(
      takeUntil(this.unSub)
    ).subscribe((res: RepoItem[]) => {
      this.currentItems = res;
      this.store();
    });
  }


  /**
   * getItems
   * @function
   * @description get items form reop services
   * @param options {RepoParam} param options
   * void
   */
  getItems(options: RepoParam): void {
    this.options = Object.assign(this.options, options);
    this.repoServ.getAllRepositories(this.options).pipe(
      takeUntil(this.unSub),
    ).subscribe((res: RepoSearchResponse) => {
      if (res) {
        this.hasItems = res.items.length > 0;
        this.currentItems = res.items;
        this.total = res.total_count;
        this.store();
        this.gotoList();
      }
    }, (error) => {
      // @TODO: create an error handle
      if (error && error.error && error.error.message)
        this.snackBar.open(error.error.message, 'close', {
          duration: 2000,
        });
    });
  }

  /**
   * itemUrlOBS
   * @function
   * @description observe the item url changes from the shared service
   * void
   */
  itemUrlOBS(): void {
    this.sharedServ.changeUrl.pipe(
      takeUntil(this.unSub)
    ).subscribe((res: string) => {
      this.getRepoInfo(res);
    });
  }


  /**
   * goBackOBS
   * @function
   * @description observe the go back changes from the shared service
   * void
   */
   goBackOBS(): void {
    this.sharedServ.goBack.pipe(
      takeUntil(this.unSub)
    ).subscribe(() => {
      this.gotoList();
    });
  }

  /**
   * changePageOBS
   * @function
   * @description observe the page index changes from the shared service
   * void
   */
  changePageOBS(): void {
    this.sharedServ.changePage.pipe(
      takeUntil(this.unSub),
      // debounce time for prevent multiple clicks
      debounceTime(500)
    ).subscribe((res: number) => {
        this.options.page = res;
      this.getItems(this.options as RepoParam);
    });
  }

  /**
   * getRepoInfo
   * @function
   * @description
   * @param url {string}
   */
  getRepoInfo(url: string) {
    this.repoServ.getRepository(url).pipe(
      takeUntil(this.unSub)
    ).subscribe((res: RepoItem) => {
      this.selectedItem = res;
      // get favorite value from the local storage
      const item: RepoItem | undefined = this.sharedServ.items.find(element => element.id === this.selectedItem.id);
      this.selectedItem.favorite = item ? item.favorite : this.selectedItem.favorite;
      // change storage
      this.store();
      // go to the item
      this.gotoItem();
    });
  }

  /**
   * @TODO: add to navigation service
   * gotoList
   * @function
   * @description Navigate to List
   * void
   */
  gotoList(): void {
    this.hasItems = true;
    this.sharedServ.items = this.currentItems;
    this.sharedServ.reposCount = this.total;
    this.sharedServ.changeItems.next(this.currentItems);
    this.router.navigate(['/list']);
  }

  store(): void {
    this.storageServ.setStore({
      items: this.currentItems,
      options: this.options,
      selectedItem: this.selectedItem,
      total: this.total,
    });
  }

  /**
   * @TODO: add to navigation service
   * gotoItem
   * @function
   * @description Navigate to item
   * void
   */
   gotoItem(): void {
    this.sharedServ.selectedItem = this.selectedItem;
    this.router.navigate(['/item']);
  }

  /**
   * setValues
   * @function
   * @description set values from storage
   * void
   */
  setValues(): void {
    const storage: Store | null = this.storageServ.getStore();
    if (storage) {
      this.currentItems = storage.items;
      this.options = storage.options;
      this.total = storage.total;
      this.selectedItem = storage.selectedItem;
      this.hasItems = storage.items.length > 0;
      this.sharedServ.options = this.options;
      if (this.hasItems) {
        this.gotoList();
      }
    }
  }

  //on component destroy
  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.next(null);
      this.unSub.complete();
    }
  }
}
