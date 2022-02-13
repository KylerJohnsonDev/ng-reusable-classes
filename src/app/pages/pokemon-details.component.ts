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
  template: `
    <main
      class="max-w-lg m-auto flex flex-col"
      *ngIf="pokemon$ | async as pokemon"
    >
      <h1 class="text-4xl text-center my-8 uppercase">
        {{ pokemon.order }}. {{ pokemon.name }}
      </h1>
      <img
        class="max-w-sm mx-auto"
        [src]="pokemon.sprites.other.dream_world.front_default"
        [alt]="pokemon.name"
      />
      <article class="flex md:flex-col lg:inline-flex mt-2">
        <aside>
          <h1 class="text-2xl mb-2 font-bold">General Info</h1>
          <p class="mb-2">
            Height: <strong>{{ pokemon.height }}</strong> | Weight:
            <strong>{{ pokemon.weight }}</strong>
          </p>
          <p class="mb-2">
            Type:
            <strong
              class="bg-blue-600 text-white px-2 py-1 ml-1 rounded"
              *ngFor="let type of pokemon.types"
              >{{ type.type.name }}</strong
            >
          </p>
          <p>
            Abilities:
            <strong
              class="bg-green-600 text-white px-2 py-1 ml-1 rounded"
              *ngFor="let ability of pokemon.abilities"
            >
              {{ ability.ability.name }}
            </strong>
          </p>
        </aside>
        <aside class="md:mt-2">
          <h1 class="text-2xl mb-2 font-bold">Stats</h1>
          <div *ngFor="let stat of pokemon.stats">
            <p class="mb-2">
              {{ stat.stat.name }}: <strong>{{ stat.base_stat }}</strong>
            </p>
          </div>
        </aside>
      </article>
    </main>
    <pre><code>{{ pokemon$ | async | json }}</code></pre>
  `,
})
export class PokemonDetailsComponent implements OnInit {
  errorMessage!: string | null;
  pokemon$: Observable<Pokemon | null> = this.route.paramMap.pipe(
    switchMap((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      return this.pokemonState.fetchPokemonById(id as string);
    }),
    catchError((error) => {
      this.errorMessage = error.errorMessage;
      console.error(error);
      return of(null);
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
