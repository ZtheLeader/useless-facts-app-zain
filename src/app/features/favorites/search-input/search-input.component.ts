import { Component } from '@angular/core';

import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-search-input',
  standalone: false,
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  constructor(private favoritesService: FavoritesService) { } // Constructor is empty, but can be used for dependency injection if needed
}
