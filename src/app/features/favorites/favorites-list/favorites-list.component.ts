import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { SavedFact } from '../../../core/models/fact.model';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  standalone: false,
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit, OnDestroy {
  public favorites$: Observable<SavedFact[]>;
  public hasFavorites$: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(private favoritesService: FavoritesService) {
    this.favorites$ = this.favoritesService.favorites$.pipe(takeUntil(this.destroy$));
    this.hasFavorites$ = this.favorites$.pipe(
      takeUntil(this.destroy$),
      map(favorites => favorites.length > 0)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRemoveFavorite(factId: string): void {
    this.favoritesService.removeFavorite(factId);
  }
}
