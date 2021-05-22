import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RepoParam } from '@shared/models';

@Component({
  selector: 'gitbase-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // to enable filter
  @Input() enableFilter: boolean = false;

  // emit the search changes
  @Output() searchChanged: EventEmitter<RepoParam> = new EventEmitter<RepoParam>();
}
