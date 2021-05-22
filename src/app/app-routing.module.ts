import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RepoItemComponent } from './repo-item/repo-item.component';
import { RepoListComponent } from './repo-list/repo-list.component';

const routes: Routes = [
  { path: 'list', component: RepoListComponent },
  { path: 'item', component: RepoItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
