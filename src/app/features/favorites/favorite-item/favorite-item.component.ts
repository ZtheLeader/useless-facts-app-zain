import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SavedFact } from '../../../core/models/fact.model';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  standalone: false,
  styleUrls: ['./favorite-item.component.scss']
})
export class FavoriteItemComponent {
  @Input() fact!: SavedFact;
  @Output() remove = new EventEmitter<string>();

  onRemove(): void {
    if (this.fact && this.fact.id) {
      this.remove.emit(this.fact.id);
    }
  }
}
