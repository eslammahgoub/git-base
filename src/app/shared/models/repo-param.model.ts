// Sort Enum
export enum Sort { stars = 'stars', forks = 'forks', issues = 'help-wanted-issues', 'last commit' = 'updated' };

// Order Enum
export enum Order {asc = 'asc', desc = 'desc' };

// this Repository params interface
export interface RepoParam {
  // query to search by
  q: string;

  // sort param
  sort?: Sort;

  // current page
  page: number;

  // page size default 30
  per_page: number;

  // order will be ignored if not provide sort based on the documentation check @Doc: https://docs.github.com/en/rest/reference/search#search-repositories
  order?: Order;
}
