import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';


@NgModule({
  declarations: [
    FavoritesListComponent,
    FavoriteItemComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
