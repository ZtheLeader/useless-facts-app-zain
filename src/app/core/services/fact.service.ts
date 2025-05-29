import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Fact } from '../models/fact.model';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class FactService {
  private readonly API_URL = environment.apiUrl;

  // RxJS Subject to manage loading state
  private _isLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._isLoading.asObservable();

  // RxJS Subject to manage error state
  private _error = new BehaviorSubject<string | null>(null);
  public readonly error$: Observable<string | null> = this._error.asObservable();

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  /**
   * Fetches a random useless fact from the API.
   * Manages loading and error states.
   * @returns An Observable of type Fact.
   */
  getRandomFact(): Observable<Fact> {
    this._isLoading.next(true);
    this._error.next(null);

    return this.http.get<Fact>(this.API_URL).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError),
      finalize(() => {
        this._isLoading.next(false);
      })
    );
  }

  /**
   * Handles HTTP errors from API calls.
   * @param error The HttpErrorResponse object.
   * @returns An RxJS Observable that emits an error.
   */
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred.
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server error ${error.status}: ${error.message}`;
    }
    this.notificationService.showMessage(`Error: ${errorMessage}`);
    this._error.next(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
