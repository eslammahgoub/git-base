import { Component, OnInit } from '@angular/core';
import { SharedService } from '@core/services';
import { RepoItem, Utils } from '@shared/models';
import { favorite, unfavorite } from '@shared/actions';
import { Store as NgxStore } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'gitbase-repo-item',
  templateUrl: './repo-item.component.html',
})
export class RepoItemComponent implements OnInit {
  // current repo
  repo: RepoItem = {} as RepoItem;

  // obs for current favorite value
  repoFavorite: Observable<boolean> = new Observable();

  constructor(
    private sharedServ: SharedService,
    private store: NgxStore<{ favorite: boolean }>
    ) {
      this.repoFavorite = this.store.select('favorite');
    }

  // on init component
  ngOnInit(): void {
    // get current the selected Item
    this.repo = this.sharedServ.selectedItem;
    if (this.repo.favorite) {
      this.favorite();
    } else {
      this.unfavorite();
    }
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
   * toggleFavorite
   * @function
   * @description toggle the current favorite
   * void
   */
  toggleFavorite(): void {
    // dispatch the change
    if (this.repo.favorite) {
      this.unfavorite();
    } else {
      this.favorite();
    }
    // save to local
    this.setFavoriteAndEmitChanges(!this.repo.favorite);
  }


  /**
   * favorite
   * @function
   * @description dispatch the favorite
   */
  favorite() {
    this.store.dispatch(favorite());
  }

  /**
   * unfavorite
   * @function
   * @description dispatch the unfavorite
   * void
   */
  unfavorite(): void {
    this.store.dispatch(unfavorite());
  }

  /**
   * setFavoriteAndEmitChanges
   * @function
   * @description set favorite and emit the changes of items to shared service
   * @param favorite {boolean}
   * void
   */
  setFavoriteAndEmitChanges(favorite: boolean): void {
    // set favorite item
    this.repo.favorite = favorite;

    // set shared Item
    this.sharedServ.selectedItem = this.repo;

    // find index of element in the repos
    const index = this.sharedServ.items.findIndex(element => element.id === this.repo.id);

    // replace the item with the new values
    this.sharedServ.items[index] = this.repo;
    this.sharedServ.changeItems.next(this.sharedServ.items);
  }

  /**
   * goBack
   * @function
   * @description Navigate to List
   * void
   */
  goBack(): void {
    this.sharedServ.goBack.next();
  }
}
