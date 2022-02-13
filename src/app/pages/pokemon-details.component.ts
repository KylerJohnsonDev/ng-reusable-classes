import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  RouterModule,
  Routes,
} from '@angular/router';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { PokemonStateService } from '../global-state/pokemon-state.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  template: ` <pre><code>{{ pokemon$ | async | json }}</code></pre> `,
})
export class PokemonDetailsComponent implements OnInit {
  errorMessage!: string | null;
  pokemon$: Observable<Pokemon> = this.route.paramMap.pipe(
    switchMap((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      return this.pokemonState.fetchPokemonById(id as string);
    }),
    catchError((error) => {
      this.errorMessage = error.errorMessage;
      console.error(error);
      return of(error);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private pokemonState: PokemonStateService
  ) {}

  ngOnInit(): void {}
}

const routes: Routes = [{ path: ':id', component: PokemonDetailsComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [PokemonDetailsComponent],
  exports: [PokemonDetailsComponent],
})
export class PokemonDetailsModule {}
