import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RepositoryService, SharedService, StorageService } from '@core/services';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    RepositoryService,
    SharedService,
    StorageService,
  ]
})
export class CoreModule { }
