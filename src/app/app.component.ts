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
}
