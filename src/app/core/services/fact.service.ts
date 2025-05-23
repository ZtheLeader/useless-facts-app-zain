import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Fact } from '../models/fact.model';

@Injectable({
  providedIn: 'root' // Makes FactService a singleton available throughout the app
})
export class FactService {
  private readonly API_URL = 'https://uselessfacts.jsph.pl/random.json';

  // RxJS Subject to manage loading state
  private _isLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._isLoading.asObservable();

  // RxJS Subject to manage error state
  private _error = new BehaviorSubject<string | null>(null);
  public readonly error$: Observable<string | null> = this._error.asObservable();

  constructor(private http: HttpClient) { }


}
