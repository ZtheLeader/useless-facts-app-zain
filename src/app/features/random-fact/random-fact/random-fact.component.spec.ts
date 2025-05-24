import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RandomFactComponent } from './random-fact.component';
import { FactService } from '../../../core/services/fact.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Fact, SavedFact } from '../../../core/models/fact.model';

describe('RandomFactComponent', () => {
  let component: RandomFactComponent;
  let fixture: ComponentFixture<RandomFactComponent>;
  let factServiceSpy: jasmine.SpyObj<FactService>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  let isLoadingSubject: BehaviorSubject<boolean>;
  let errorSubject: BehaviorSubject<string | null>;
  let favoritesSubject: BehaviorSubject<SavedFact[]>;

  const mockFact: Fact = {
    id: 'fact-123',
    text: 'Bananas are berries, but strawberries are not',
    source: 'Test Source',
    source_url: 'http://test-source.com',
    language: 'en',
    permalink: 'http://permalink.com'
  };

  beforeEach(async () => {
    isLoadingSubject = new BehaviorSubject<boolean>(false);
    errorSubject = new BehaviorSubject<string | null>(null);
    favoritesSubject = new BehaviorSubject<SavedFact[]>([]);

    factServiceSpy = jasmine.createSpyObj('FactService', ['getRandomFact']);
    factServiceSpy.getRandomFact.and.returnValue(of(mockFact));
    Object.defineProperty(factServiceSpy, 'isLoading$', { get: () => isLoadingSubject.asObservable() });
    Object.defineProperty(factServiceSpy, 'error$', { get: () => errorSubject.asObservable() });

    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'addFavorite',
      'removeFavorite',
      'isFavorite'
    ], ['generateUniqueId']);
    favoritesServiceSpy.isFavorite.and.returnValue(false);
    // Use bracket notation for the private method
    (favoritesServiceSpy as any)['generateUniqueId'] = jasmine.createSpy().and.returnValue('generated-id');
    Object.defineProperty(favoritesServiceSpy, 'favorites$', { get: () => favoritesSubject.asObservable() });

    await TestBed.configureTestingModule({
      declarations: [RandomFactComponent],
      imports: [
        NoopAnimationsModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        { provide: FactService, useValue: factServiceSpy },
        { provide: FavoritesService, useValue: favoritesServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RandomFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a random fact on initialization', () => {
    expect(factServiceSpy.getRandomFact).toHaveBeenCalled();
    expect(component.currentFact).toEqual(mockFact);
  });

  it('should display loading spinner when isLoading is true', () => {
    isLoadingSubject.next(true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();

    const factCard = fixture.debugElement.query(By.css('mat-card'));
    expect(factCard).toBeFalsy();
  });

  it('should display error message when error occurs', () => {
    errorSubject.next('Failed to load fact');
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.text-red-700'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('Failed to load fact');

    const factCard = fixture.debugElement.query(By.css('mat-card'));
    expect(factCard).toBeFalsy();
  });

  it('should display fact text in the UI', () => {
    isLoadingSubject.next(false);
    errorSubject.next(null);
    fixture.detectChanges();

    const factTextElement = fixture.debugElement.query(By.css('mat-card-content p'));
    expect(factTextElement).toBeTruthy();
    expect(factTextElement.nativeElement.textContent).toContain('Bananas are berries');
  });

  it('should fetch a new fact when Get New Fact button is clicked', () => {
    const newMockFact: Fact = {
      id: 'fact-456',
      text: 'Honey never spoils',
      source: 'Test Source',
      source_url: 'http://test-source.com',
      language: 'en',
      permalink: 'http://permalink.com'
    };

    factServiceSpy.getRandomFact.and.returnValue(of(newMockFact));

    const getNewFactButton = fixture.debugElement.query(By.css('button[color="primary"]'));
    getNewFactButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(factServiceSpy.getRandomFact).toHaveBeenCalledTimes(2);
    expect(component.currentFact).toEqual(newMockFact);
  });

  it('should show "Add to Favorites" button when fact is not in favorites', () => {
    favoritesServiceSpy.isFavorite.and.returnValue(false);
    component.isCurrentFactFavorite = false;
    fixture.detectChanges();

    const favButton = fixture.debugElement.query(By.css('button[mat-stroked-button]'));
    expect(favButton.nativeElement.textContent).toContain('Add to Favorites');
  });

  it('should show "Remove from Favorites" button when fact is in favorites', () => {
    component.isCurrentFactFavorite = true;
    fixture.detectChanges();

    const favButton = fixture.debugElement.query(By.css('button[mat-stroked-button]'));
    expect(favButton.nativeElement.textContent).toContain('Remove from Favorites');
  });

  it('should add fact to favorites when toggleFavorite is called and fact is not a favorite', () => {
    favoritesServiceSpy.isFavorite.and.returnValue(false);
    component.isCurrentFactFavorite = false;

    expect(component.currentFact).not.toBeNull();

    component.toggleFavorite();

    expect(favoritesServiceSpy.addFavorite).toHaveBeenCalledWith(component.currentFact!);
  });

  it('should remove fact from favorites when toggleFavorite is called and fact is a favorite', () => {
    favoritesServiceSpy.isFavorite.and.returnValue(true);
    component.isCurrentFactFavorite = true;

    expect(component.currentFact).not.toBeNull();
    const factId = component.currentFact!.id;

    component.toggleFavorite();

    expect(favoritesServiceSpy.removeFavorite).toHaveBeenCalledWith(factId);
  });

  it('should not attempt to toggle favorite if there is no current fact', () => {
    component.currentFact = null;
    const consoleSpy = spyOn(console, 'warn');

    component.toggleFavorite();

    expect(consoleSpy).toHaveBeenCalledWith(jasmine.stringMatching(/Cannot toggle favorite/));
    expect(favoritesServiceSpy.addFavorite).not.toHaveBeenCalled();
    expect(favoritesServiceSpy.removeFavorite).not.toHaveBeenCalled();
  });

  it('should update favorite status when favorites change', () => {
    expect(component.isCurrentFactFavorite).toBeFalse();

    const savedFact: SavedFact = {
      ...mockFact,
      savedDate: new Date()
    };

    favoritesSubject.next([savedFact]);
    fixture.detectChanges();

    expect(component.isCurrentFactFavorite).toBeTrue();
  });


  it('should clean up properly on destroy', () => {
    const nextSpy = spyOn(component['destroy$'], 'next');
    const completeSpy = spyOn(component['destroy$'], 'complete');
    const consoleSpy = spyOn(console, 'log');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Random Fact Component Destroyed');
  });
});
