import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomFactRoutingModule } from './random-fact-routing.module';
import { RandomFactComponent } from './random-fact/random-fact.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    RandomFactComponent
  ],
  imports: [
    CommonModule,
    RandomFactRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class RandomFactModule { }
