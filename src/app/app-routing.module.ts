import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageWrapperComponent } from './pages/page-wrapper/page-wrapper.component';
import { PokedexPageComponent } from './pages/pokedex-component/pokedex.component';

const routes: Routes = [
  {
    path: '',
    component: PageWrapperComponent,
    children: [
      { path: 'pokemon', component: PokedexPageComponent },
      {
        path: 'pokemon/details',
        loadChildren: () =>
          import('./pages/pokemon-details/pokemon-details.component').then(
            (m) => m.PokemonDetailsModule
          ),
      },
      { path: '', redirectTo: '/pokemon', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/pokemon' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
