import { RepoItem } from "./repo-item.model";
import { RepoParam } from "./repo-param.model";

// this a store model to represent the storage schema
export interface Store {
  // total counts of the search result
  total: number;
  // current items
  items: RepoItem[];
  // current selected item
  selectedItem: RepoItem;
  // current options
  options: RepoParam
}
