import { Injectable } from '@angular/core';
import { RepoItem, RepoParam } from '@shared/models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // current repositories items
  items: RepoItem[] = [];

  // current repos counts
  reposCount: number = 0;

  // current selected repo item
  selectedItem: RepoItem = {} as RepoItem;

  // current selected url of the repo item
  selectedUrl: string = '';

  // current options
  options: RepoParam = {} as RepoParam;

  // change current page index
  changePage: Subject<number> = new Subject<number>();

  // change current items
  changeItems: Subject<RepoItem[]> = new Subject<RepoItem[]>();

  // change current url
  changeUrl: Subject<string> = new Subject<string>();

  // go back route
  goBack: Subject<any> = new Subject<any>();

}
