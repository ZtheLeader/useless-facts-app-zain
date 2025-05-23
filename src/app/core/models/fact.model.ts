/**
 * Interface for a fact object as received from the Useless Facts API.
 */
export interface Fact {
  id: string;
  text: string;
  source?: string;
  source_url?: string;
  language?: string;
  permalink?: string;
}

/**
 * Interface for a fact object saved to favorites, extending the base Fact.
 * Includes a client-side generated ID and a timestamp.
 */
export interface SavedFact extends Fact {
  id: string;
  savedDate: Date;
}
