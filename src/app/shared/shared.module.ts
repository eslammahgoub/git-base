import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

// CUSTOM COMPONENTS
import { LogoComponent,SearchFilterComponent, SortFilterDialogComponent } from './customs';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    LogoComponent,
    SearchFilterComponent,
    SortFilterDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatChipsModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
  ],
  exports: [
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    LogoComponent,
    SearchFilterComponent,
    SortFilterDialogComponent,
  ]
})
export class SharedModule { }
