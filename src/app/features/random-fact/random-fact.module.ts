import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomFactRoutingModule } from './random-fact-routing.module';
import { RandomFactComponent } from './random-fact/random-fact.component';

import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    RandomFactComponent
  ],
  imports: [
    CommonModule,
    RandomFactRoutingModule,
    MatCardModule
  ]
})
export class RandomFactModule { }
