import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    redirectTo: 'random',
    pathMatch: 'full',
    path: '',
  }, {
    path: 'random',
    loadChildren: () => import('./features/random-fact/random-fact.module').then(m => m.RandomFactModule)
  },
  {
    path: '**',
    redirectTo: 'random',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
