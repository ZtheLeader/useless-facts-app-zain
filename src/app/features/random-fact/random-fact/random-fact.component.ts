import { Component, OnInit, OnDestroy } from '@angular/core';

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

  constructor(private factService: FactService) {}

  ngOnInit(): void {
    this.factService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    }
    );
    this.factService.error$.subscribe(error => {
      this.error = error;
    }
    );
  }

  ngOnDestroy(): void {
    console.log('Random Fact Component Destroyed');
  }

}
