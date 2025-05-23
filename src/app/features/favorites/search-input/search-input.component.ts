import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { SavedFact } from '../../../core/models/fact.model';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-search-input',
  standalone: false,
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  filteredFacts$!: Observable<SavedFact[]>;
  private destroy$ = new Subject<void>();

  @Output() factSelected = new EventEmitter<SavedFact>();

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.filteredFacts$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.favoritesService.favorites$
    ]).pipe(
      takeUntil(this.destroy$),
      map(([searchValue, favorites]) => {
        const filterValue = (searchValue || '').toLowerCase();
        return favorites.filter(fact => fact.text.toLowerCase().includes(filterValue));
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onOptionSelected(event: any): void {
    const selectedFact: SavedFact = event.option.value;
    this.factSelected.emit(selectedFact);
    this.searchControl.setValue('');
  }

  displayFact(fact: SavedFact): string {
    return fact ? fact.text : '';
  }
}
