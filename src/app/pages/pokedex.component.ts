import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { PokemonCardModule } from 'src/app/components/pokemon-card.component';
import {
  PokemonState,
  PokemonStateService,
} from 'src/app/global-state/pokemon-state.service';
import { PaginatorModule } from '../components/paginator.component';

@Component({
  selector: 'app-pokedex',
  template: `
    <main
      class="p-4"
      *ngIf="pokemonState$ | async as pokemonState; else loading"
    >
      <article class="grid gap-4 md:grid-cols-2 grid-cols-1">
        <app-pokemon-card
          *ngFor="let summary of pokemonState.pokemon"
          [pokemonSummary]="summary"
        ></app-pokemon-card>
      </article>
      <app-paginator
        [displayCount]="pokemonState.pokemon?.length ?? 0"
        [previousPageUrl]="pokemonState.previousPageUrl"
        [nextPageUrl]="pokemonState.nextPageUrl"
        (paginationChange)="onPaginationChange($event)"
      ></app-paginator>
    </main>
    <ng-template #loading> Loading... </ng-template>
  `,
})
export class PokedexPageComponent implements OnInit {
  pokemonState$: Observable<PokemonState | null> =
    this.pokemonState.state$.pipe(
      filter((state) => !!state),
      tap((state) => console.log({ state }))
    );

  constructor(private pokemonState: PokemonStateService) {}

  ngOnInit(): void {
    this.pokemonState.loadPokemon();
  }

  onPaginationChange(url: string) {
    this.pokemonState.loadPokemon(undefined, url);
  }
}

@NgModule({
  imports: [CommonModule, PokemonCardModule, PaginatorModule],
  declarations: [PokedexPageComponent],
  exports: [PokedexPageComponent],
})
export class PokedexPageModule {}
