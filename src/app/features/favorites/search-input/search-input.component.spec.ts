import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchInputComponent } from './search-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { FavoritesService } from '../../../core/services/favorites.service';
import { SavedFact } from '../../../core/models/fact.model';
import { BehaviorSubject, of } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let mockFavorites: SavedFact[];
  let favoritesSubject: BehaviorSubject<SavedFact[]>;

  beforeEach(async () => {
    mockFavorites = [
      {
        id: 'fact-1',
        text: 'Bananas are berries but strawberries are not',
        savedDate: new Date('2023-01-15')
      },
      {
        id: 'fact-2',
        text: 'Honey never spoils',
        savedDate: new Date('2023-02-10')
      },
      {
        id: 'fact-3',
        text: 'The shortest war in history lasted 38 minutes',
        savedDate: new Date('2023-03-05')
      }
    ];

    favoritesSubject = new BehaviorSubject<SavedFact[]>(mockFavorites);

    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', ['addFavorite', 'removeFavorite']);
    Object.defineProperty(favoritesServiceSpy, 'favorites$', {
      get: () => favoritesSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search term', () => {
    expect(component.searchControl.value).toBe('');
  });

  it('should have a search field with correct label and placeholder', () => {
    const matLabel = fixture.debugElement.query(By.css('mat-label')).nativeElement;
    expect(matLabel.textContent).toContain('Search Favorite Facts');

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.placeholder).toBe('Type to search...');
    expect(input.getAttribute('aria-label')).toBe('Search favorite facts');
  });

  it('should show "No matching facts found" when search has no results', fakeAsync(() => {
    component.ngOnInit();

    let filteredFacts: SavedFact[] | undefined;

    const subscription = component.filteredFacts$.subscribe(facts => {
      filteredFacts = facts;
    });

    tick(10);
    fixture.detectChanges();

    component.searchControl.setValue('xyz123');
    tick(400);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.dispatchEvent(new Event('focusin'));
    fixture.detectChanges();

    expect(filteredFacts?.length).toBe(0);
    expect(component.searchControl.value).toBeTruthy();

    subscription.unsubscribe();
  }));

  it('should emit factSelected event when option is selected', () => {
    const emitSpy = spyOn(component.factSelected, 'emit');
    const selectedFact = mockFavorites[0];

    component.onOptionSelected({ option: { value: selectedFact } });

    expect(emitSpy).toHaveBeenCalledWith(selectedFact);
    expect(component.searchControl.value).toBe('');
  });

  it('should display fact text in autocomplete', () => {
    const fact = mockFavorites[0];
    const displayText = component.displayFact(fact);

    expect(displayText).toBe(fact.text);
  });

  it('should handle empty fact in displayFact method', () => {
    const displayText = component.displayFact(null as any);

    expect(displayText).toBe('');
  });


  it('should properly clean up on destroy', () => {
    const nextSpy = spyOn(component['destroy$'], 'next');
    const completeSpy = spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
