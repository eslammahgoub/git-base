// RepoItem interface for github repository

import { License } from "./license.model";
import { owner } from "./owner.model";

export interface RepoItem {
  id: number;
  name: string;
  full_name: string;
  description: string;
  url: string;
  size: number;
  stargazers_count: number;
  updated_at: string;
  archived: boolean;
  disabled: boolean;
  license?: License;
  open_issues_count: number;
  issues_url: string;
  language: string;
  favorite?: boolean;
  owner: owner;
  private: boolean;
  watchers_count: number;
  forks_count: number;
}
