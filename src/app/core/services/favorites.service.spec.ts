import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Fact, SavedFact } from '../models/fact.model';

describe('FavoritesService', () => {
  let service: FavoritesService;
  const STORAGE_KEY = 'uselessFactsFavorites';

  const mockFact: Fact = {
    id: 'test-id-123',
    text: 'This is a test fact',
    source: 'Test Source',
    source_url: 'http://test-source.com',
    language: 'en',
    permalink: 'http://permalink.com'
  };

  function createSavedFact(fact: Fact): SavedFact {
    return {
      ...fact,
      savedDate: new Date()
    };
  }

  let localStorageGetItemSpy: jasmine.Spy;
  let localStorageSetItemSpy: jasmine.Spy;
  let localStorageRemoveItemSpy: jasmine.Spy;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);

    localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.callThrough();
    localStorageSetItemSpy = spyOn(localStorage, 'setItem').and.callThrough();
    localStorageRemoveItemSpy = spyOn(localStorage, 'removeItem').and.callThrough();

    TestBed.configureTestingModule({
      providers: [FavoritesService]
    });

    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize by loading favorites from localStorage', () => {
    expect(localStorageGetItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
  });

  describe('addFavorite', () => {
    it('should add a fact to favorites', () => {
      let favorites: SavedFact[] = [];
      service.favorites$.subscribe(favs => {
        favorites = favs;
      });
      expect(favorites.length).toBe(0);

      service.addFavorite(mockFact);

      expect(favorites.length).toBe(1);
      expect(favorites[0].id).toBe(mockFact.id);
      expect(favorites[0].text).toBe(mockFact.text);
      expect(favorites[0].savedDate).toBeDefined();

      expect(localStorageSetItemSpy).toHaveBeenCalled();
    });

    it('should not add the same fact twice', () => {
      service.addFavorite(mockFact);

      const consoleWarnSpy = spyOn(console, 'warn');

      service.addFavorite(mockFact);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        jasmine.stringContaining('already in favorites')
      );

      let favorites: SavedFact[] = [];
      service.favorites$.subscribe(favs => {
        favorites = favs;
      });
      expect(favorites.length).toBe(1);
    });

    it('should generate a unique ID if fact ID is not provided', () => {
      const factWithoutId: Fact = {
        id: '',
        text: 'No ID fact'
      };

      service.addFavorite(factWithoutId);

      let favorites: SavedFact[] = [];
      service.favorites$.subscribe(favs => {
        favorites = favs;
      });
      expect(favorites.length).toBe(1);
      expect(favorites[0].id).toBeTruthy();
      expect(favorites[0].id.startsWith('fact-')).toBeTrue();
    });
  });

  describe('removeFavorite', () => {
    it('should remove a fact from favorites by ID', () => {
      service.addFavorite(mockFact);

      let favorites: SavedFact[] = [];
      service.favorites$.subscribe(favs => {
        favorites = favs;
      });
      expect(favorites.length).toBe(1);

      service.removeFavorite(mockFact.id);

      expect(favorites.length).toBe(0);

      expect(localStorageSetItemSpy).toHaveBeenCalledTimes(2);
    });

    it('should do nothing if ID is not found', () => {
      service.addFavorite(mockFact);

      service.removeFavorite('non-existent-id');

      let favorites: SavedFact[] = [];
      service.favorites$.subscribe(favs => {
        favorites = favs;
      });
      expect(favorites.length).toBe(1);
    });
  });

  describe('isFavorite', () => {
    it('should return true for favorited fact IDs', () => {
      service.addFavorite(mockFact);

      const result = service.isFavorite(mockFact.id);
      expect(result).toBeTrue();
    });

    it('should return false for non-favorited fact IDs', () => {
      const result = service.isFavorite('non-existent-id');
      expect(result).toBeFalse();
    });
  }); describe('localStorage handling', () => {
    beforeEach(() => {
      localStorageGetItemSpy.and.callThrough();
      localStorageSetItemSpy.and.callThrough();
      localStorageRemoveItemSpy.and.callThrough();
    });

    it('should handle JSON parsing errors when loading from localStorage', () => {
      localStorageGetItemSpy.and.returnValue('{"invalidJson":');

      const consoleErrorSpy = spyOn(console, 'error').and.callThrough();

      const newService = new FavoritesService();

      expect(consoleErrorSpy).toHaveBeenCalled();

      expect(localStorageRemoveItemSpy).toHaveBeenCalledWith(STORAGE_KEY);

      let favorites: SavedFact[] = [];
      newService.favorites$.subscribe(favs => {
        favorites = favs;
      });
      expect(favorites.length).toBe(0);
    });

    it('should handle errors when saving to localStorage', () => {
      localStorageSetItemSpy.and.throwError('Storage quota exceeded');

      const consoleErrorSpy = spyOn(console, 'error');

      service.addFavorite(mockFact);

      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should correctly save and restore Date objects', () => {
      const savedFact: SavedFact = createSavedFact(mockFact);

      const serializedFact = JSON.stringify([{
        ...savedFact,
        savedDate: savedFact.savedDate.toISOString()
      }]);

      localStorageGetItemSpy.and.returnValue(serializedFact);

      const newService = new FavoritesService();

      let favorites: SavedFact[] = [];
      newService.favorites$.subscribe(favs => {
        favorites = favs;
      });

      expect(favorites.length).toBe(1);
      expect(favorites[0].savedDate instanceof Date).toBeTrue();
    });
  });
});
