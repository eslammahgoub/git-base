import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SharedService } from '@core/services';
import { RepoItem, Utils } from '@shared/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'gitbase-repo-list',
  templateUrl: './repo-list.component.html',
})
export class RepoListComponent implements OnInit, OnDestroy {
  // unSub subject to remove the subscription from the memory when destroy
  unSub: Subject<any> = new Subject<any>();

  // the repositories items of current page
  repos: RepoItem[] = [];

  // count of the all repositories
  reposCount: number = 0;

  // page size
  pageSize: number = 30;

  // page index
  currentPageIndex: number = 1;

  constructor(
    private sharedServ: SharedService,
    private changeDetection: ChangeDetectorRef
  ) {}

  // when Init the component
  ngOnInit(): void {
    this.repos = this.sharedServ.items;
    this.reposCount = this.sharedServ.reposCount;
    this.currentPageIndex = this.sharedServ.options.page;
    this.itemsOBS();
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
      this.repos = res;
      this.changeDetection.detectChanges();
    });
  }

  /**
   * getUrlIssue
   * @function
   * @description modify the current url from api url to github issues page
   * @param {string} url
   * @returns {string} url of github issue page for the repo
   */
  getUrlIssue(url: string): string {
    return Utils.getUrlIssue(url);
  }

  /**
   * setSelectedRepoURL
   * @function
   * @description set selected repo url
   * @param url {string} string link of the current selected repo
   * void
   */
  setSelectedRepoURL(url: string): void {
    this.sharedServ.selectedUrl = url;
    this.sharedServ.changeUrl.next(url);
  }

  /**
   * pageChanged
   * @function
   * @description change current page index
   * @param event {pageEvent}
   * void
   */
  pageChanged(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex + 1;
    this.sharedServ.changePage.next(this.currentPageIndex);
  }

  /**
   * toggleRepoFavorite
   * @function
   * @description toggle favorite repository
   * @param repo {RepoItem}
   * void
   */
  toggleRepoFavorite(repo: RepoItem): void {
    // toggle favorite
    repo.favorite = !repo.favorite;

   // find index of element in the repos
   const index = this.repos.findIndex(element => element.id === repo.id);

   // replace the item with the new values
   this.repos[index] = repo;

   // emit the changes items to shared
   this.sharedServ.items = this.repos;
   this.sharedServ.changeItems.next(this.repos);
  }

  trackItem (index: number, item: RepoItem): number {
    return item.id;
  }

  // On Destroy the component
  ngOnDestroy() {
    this.unSub.next(null);
    this.unSub.complete();
  }
}
