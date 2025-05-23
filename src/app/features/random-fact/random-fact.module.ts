import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomFactRoutingModule } from './random-fact-routing.module';
import { RandomFactComponent } from './random-fact/random-fact.component';


@NgModule({
  declarations: [
    RandomFactComponent
  ],
  imports: [
    CommonModule,
    RandomFactRoutingModule
  ]
})
export class RandomFactModule { }
