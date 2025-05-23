import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-random-fact',
  standalone: false,
  templateUrl: './random-fact.component.html',
  styleUrl: './random-fact.component.scss'
})
export class RandomFactComponent implements OnInit, OnDestroy {
  title = 'Random Fact Component';

  constructor() { }

  ngOnInit(): void {
    console.log('Random Fact Component Initialized');
  }

  ngOnDestroy(): void {
    console.log('Random Fact Component Destroyed');
  }

}
