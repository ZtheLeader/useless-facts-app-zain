import { Component, OnInit, OnDestroy, Output, } from '@angular/core';

import { FormControl } from '@angular/forms';

import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-search-input',
  standalone: false,
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent implements OnInit, OnDestroy {
  constructor(private favoritesService: FavoritesService) { }
}
