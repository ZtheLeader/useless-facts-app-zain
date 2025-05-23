import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Fact } from '../../../core/models/fact.model';
import { FactService } from '../../../core/services/fact.service';

@Component({
  selector: 'app-random-fact',
  standalone: false,
  templateUrl: './random-fact.component.html',
  styleUrl: './random-fact.component.scss'
})
export class RandomFactComponent implements OnInit, OnDestroy {
  title = 'Random Fact Component';
  currentFact: Fact | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private factService: FactService) {}

  ngOnInit(): void {
    this.factService.isLoading$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(isLoading => {
      this.isLoading = isLoading;
    }

    );
    this.factService.error$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(error => {
      this.error = error;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('Random Fact Component Destroyed');
  }

}
