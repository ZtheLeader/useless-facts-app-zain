import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomFactComponent } from './random-fact/random-fact.component';

const routes: Routes = [{
  path: 'random',
  component: RandomFactComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomFactRoutingModule { }
