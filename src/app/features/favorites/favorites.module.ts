import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';
import { SearchInputComponent } from './search-input/search-input.component';


@NgModule({
  declarations: [
    FavoritesListComponent,
    FavoriteItemComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
