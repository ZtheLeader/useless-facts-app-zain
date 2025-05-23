import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    redirectTo: 'random-fact',
    pathMatch: 'full'
  }, {
    path: 'random-fact',
    loadChildren: () => import('./features/random-fact/random-fact.module').then(m => m.RandomFactModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
