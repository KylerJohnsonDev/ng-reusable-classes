import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonCardModule } from 'src/app/components/pokemon-card.component';
import {
  PokemonState,
  PokemonStateService,
} from 'src/app/global-state/pokemon-state.service';

@Component({
  selector: 'app-pokedex',
  template: `
    <main
      class=" p-4 grid gap-4 md:grid-cols-2 grid-cols-1"
      *ngIf="pokemon$ | async as pokemon; else loading"
    >
      <app-pokemon-card
        *ngFor="let summary of pokemon.pokemon"
        [pokemonSummary]="summary"
      ></app-pokemon-card>
    </main>
    <ng-template #loading> Loading... </ng-template>
  `,
})
export class PokedexPageComponent implements OnInit {
  pokemon$: Observable<PokemonState> = this.pokemonState.state$;

  constructor(private pokemonState: PokemonStateService) {}

  ngOnInit(): void {
    this.pokemonState.loadPokemon();
  }
}

@NgModule({
  imports: [CommonModule, PokemonCardModule],
  declarations: [PokedexPageComponent],
  exports: [PokedexPageComponent],
})
export class PokedexPageModule {}
