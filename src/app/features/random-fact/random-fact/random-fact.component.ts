import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Fact } from '../../../core/models/fact.model';
import { FactService } from '../../../core/services/fact.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-random-fact',
  standalone: false,
  templateUrl: './random-fact.component.html',
  styleUrl: './random-fact.component.scss'
})
export class RandomFactComponent implements OnInit, OnDestroy {
  title = 'Random Fact Component';
  currentFact: Fact | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  isCurrentFactFavorite: boolean = false;

  private destroy$ = new Subject<void>();
  private currentFactId: string | null = null;

  constructor(private factService: FactService,
    private favoritesService: FavoritesService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.factService.isLoading$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(isLoading => {
      this.isLoading = isLoading;
    }

    );
    this.factService.error$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(error => {
      this.error = error;
    });

    this.fetchNewFact();

    this.favoritesService.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favorites => {
        if (this.currentFact && this.currentFact.id) {
          this.isCurrentFactFavorite = favorites.some(f => f.id === this.currentFact!.id);
        } else {
          this.isCurrentFactFavorite = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('Random Fact Component Destroyed');
  }

  /**
 * Fetches a new random fact from the API.
 * Updates the component's current fact and checks its favorite status.
 */
  fetchNewFact(): void {
    this.currentFact = null;
    this.currentFactId = null;

    // Call the service to get a random fact.
    this.factService.getRandomFact()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (fact: Fact) => {
          const factWithId: Fact = { ...fact, id: fact.id || this.favoritesService['generateUniqueId']() };
          this.currentFact = factWithId;
          this.currentFactId = factWithId.id;

          this.isCurrentFactFavorite = this.favoritesService.isFavorite(this.currentFactId);
        },
      });
  }

  toggleFavorite(): void {
    if (!this.currentFact || !this.currentFact.id) {
      console.warn('Cannot toggle favorite: No current fact or fact has no ID.');
      return;
    }

    if (this.isCurrentFactFavorite) {
      this.favoritesService.removeFavorite(this.currentFact.id);
      this.notificationService.showMessage('Fact removed from favorites.');
    } else {
      this.favoritesService.addFavorite(this.currentFact);
      this.notificationService.showMessage('Fact added to favorites.');
    }
  }

}
