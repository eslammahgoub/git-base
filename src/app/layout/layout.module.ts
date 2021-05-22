import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { GitbaseViewerComponent } from './gitbase-viewer/gitbase-viewer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    GitbaseViewerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    GitbaseViewerComponent,
  ]
})
export class LayoutModule { }
