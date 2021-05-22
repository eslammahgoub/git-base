import { RepoItem } from "./repo-item.model";

// Interface of repositories response
export interface RepoSearchResponse {
  items: RepoItem[];
  total_count: number;
}
