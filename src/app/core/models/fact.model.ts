/**
 * Interface for a fact object as received from the Useless Facts API.
 */
export interface Fact {
  id?: string;        // The API might provide an ID, but it's optional here as we might generate one.
  text: string;
  source?: string;    // e.g., 'uselessfacts'
  source_url?: string;
  language?: string;  // e.g., 'en'
  permalink?: string;
}

/**
 * Interface for a fact object saved to favorites, extending the base Fact.
 * Includes a client-side generated ID and a timestamp.
 */
export interface SavedFact extends Fact {
  id: string;        // Explicitly required for saved facts for unique identification.
  savedDate: Date;   // Timestamp when the fact was added to favorites.
}
