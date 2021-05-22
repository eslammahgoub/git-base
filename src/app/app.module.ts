import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// ROUTING
import { AppRoutingModule } from './app-routing.module';

// APP COMPONENTS
import { AppComponent } from './app.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { RepoItemComponent } from './repo-item/repo-item.component';

// CUSTOM MODULES
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';

// State Management
import { StoreModule } from '@ngrx/store';
import { repoReducer } from '@shared/reducers';

@NgModule({
  declarations: [
    AppComponent,
    RepoListComponent,
    RepoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
    CoreModule,
    MatPaginatorModule,
    MatSnackBarModule,
    StoreModule.forRoot({favorite: repoReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
