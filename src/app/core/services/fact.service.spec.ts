import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FactService } from './fact.service';
import { Fact } from '../models/fact.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('FactService', () => {
  let service: FactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FactService]
    });
    service = TestBed.inject(FactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRandomFact', () => {
    const mockApiUrl = 'https://uselessfacts.jsph.pl/random.json';
    const mockFact: Fact = {
      id: 'test-id-123',
      text: 'This is a test fact',
      source: 'Test Source',
      source_url: 'http://test-source.com',
      language: 'en',
      permalink: 'http://permalink.com'
    };

    it('should return a random fact and set loading states correctly', () => {
      // Keep track of loading state changes
      const loadingStates: boolean[] = [];
      service.isLoading$.subscribe(isLoading => {
        loadingStates.push(isLoading);
      });

      // Make the call
      let result: Fact | undefined;
      service.getRandomFact().subscribe(fact => {
        result = fact;
      });

      expect(loadingStates[0]).toBeFalse();
      expect(loadingStates[1]).toBeTrue();

      const req = httpMock.expectOne(mockApiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockFact);

      expect(result).toEqual(mockFact);
      expect(loadingStates[2]).toBeFalse();
    });

    it('should handle HTTP errors and set error state', () => {
      let errorMessage: string | null = null;
      service.error$.subscribe(error => {
        errorMessage = error;
      });

      let catchedError: any;
      service.getRandomFact().subscribe({
        next: () => fail('Should have failed with a 404 error'),
        error: (error) => {
          catchedError = error;
        }
      });

      const req = httpMock.expectOne(mockApiUrl);
      const errorResponse = new HttpErrorResponse({
        error: 'Not Found',
        status: 404,
        statusText: 'Not Found'
      });
      req.flush('Not Found', {
        status: 404,
        statusText: 'Not Found'
      });

      expect(catchedError).toBeTruthy();
      expect(errorMessage).toContain('Server error 404');
    });

    it('should handle client-side errors correctly', () => {
      let errorMessage: string | null = null;
      service.error$.subscribe(error => {
        errorMessage = error;
      });

      service.getRandomFact().subscribe({
        next: () => fail('Should have failed with a network error'),
        error: () => { }
      });

      const errorEvent = new ErrorEvent('error', { message: 'Network Error' });
      const req = httpMock.expectOne(mockApiUrl);

      req.error(errorEvent);

      expect(errorMessage).toContain('A client-side error occurred');
    });
  });
});
