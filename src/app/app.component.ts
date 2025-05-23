import { Component, OnInit, OnDestroy } from '@angular/core';

import { FactService } from './core/services/fact.service';
import { Fact } from './core/models/fact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'useless-facts-app-zain';

  private subscriptions: Subscription = new Subscription();

  constructor(private factService: FactService) { }

  ngOnInit(): void {
    console.log('App Component Initialized');

    this.subscriptions.add(
      this.factService.isLoading$.subscribe(isLoading => {
        console.log('FactService Loading State:', isLoading);
      })
    );

    this.subscriptions.add(
      this.factService.error$.subscribe(error => {
        if (error) {
          console.error('FactService Error State:', error);
        } else {
          console.log('FactService Error State: (none)');
        }
      })
    );

    this.subscriptions.add(
      this.factService.getRandomFact().subscribe({
        next: (fact: Fact) => {
          console.log('Successfully fetched a random fact:', fact);
          console.log('Fact text:', fact.text);
        },
        error: (err) => {
          console.error('Error fetching fact in AppComponent:', err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
