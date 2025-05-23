import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Fact } from '../../../core/models/fact.model';
import { FactService } from '../../../core/services/fact.service';
import { FavoritesService } from '../../../core/services/favorites.service';

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
    private favoritesService: FavoritesService
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
          this.currentFactId = factWithId.id; // Store the ID for easy favorite checking

          this.isCurrentFactFavorite = this.favoritesService.isFavorite(this.currentFactId);
        },
      });
  }

}
