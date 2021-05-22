import { RepoItem } from "./repo-item.model";

// Repositories interface to represent the github repos
export interface Repositories {
  total_count: number;
  items: RepoItem[];
}
