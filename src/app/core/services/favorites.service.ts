import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fact, SavedFact } from '../models/fact.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'uselessFactsFavorites';

  private _favorites = new BehaviorSubject<SavedFact[]>([]);
  public readonly favorites$: Observable<SavedFact[]> = this._favorites.asObservable();

  constructor() {
    this.loadFavorites();
  }

  /**
   * Adds a fact to the favorites list.
   * Generates a unique ID and adds a timestamp if not already a favorite.
   * @param fact The fact to add.
   */
  addFavorite(fact: Fact): void {
    const currentFavorites = this._favorites.getValue();

    const factId = fact.id || this.generateUniqueId();

    if (currentFavorites.some(f => f.id === factId)) {
      console.warn(`Fact with ID ${factId} is already in favorites.`);
      return;
    }

    const savedFact: SavedFact = {
      ...fact,
      id: factId,
      savedDate: new Date()
    };

    const updatedFavorites = [...currentFavorites, savedFact];
    this._favorites.next(updatedFavorites);
    this.saveFavorites(updatedFavorites);
  }

  /**
   * Removes a fact from the favorites list by its ID.
   * @param factId The ID of the fact to remove.
   */
  removeFavorite(factId: string): void {
    const currentFavorites = this._favorites.getValue();
    const updatedFavorites = currentFavorites.filter(f => f.id !== factId);
    this._favorites.next(updatedFavorites);
    this.saveFavorites(updatedFavorites);
  }

  /**
   * Checks if a fact (by its ID) is already in the favorites list.
   * @param factId The ID of the fact to check.
   * @returns True if the fact is a favorite, false otherwise.
   */
  isFavorite(factId: string): boolean {
    return this._favorites.getValue().some(f => f.id === factId);
  }

  // --- Private Methods: ---

  /**
   * Loads favorites from localStorage.
   * Handles JSON parsing and date string to Date object conversion.
   */
  private loadFavorites(): void {
    try {
      const storedFavorites = localStorage.getItem(this.STORAGE_KEY);
      if (storedFavorites) {
        const parsedFavorites: SavedFact[] = JSON.parse(storedFavorites).map((f: any) => ({
          ...f,
          savedDate: new Date(f.savedDate)
        }));
        this._favorites.next(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      localStorage.removeItem(this.STORAGE_KEY);
      this._favorites.next([]);
    }
  }

  /**
   * Saves the current favorites list to localStorage.
   * Converts Date objects to ISO strings for proper storage.
   * @param favorites The list of facts to save.
   */
  private saveFavorites(favorites: SavedFact[]): void {
    try {
      const serializableFavorites = favorites.map(f => ({
        ...f,
        savedDate: f.savedDate.toISOString()
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(serializableFavorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }

  private generateUniqueId(): string {
    return 'fact-' + Math.random().toString(36).substr(2, 9);
  }
}
