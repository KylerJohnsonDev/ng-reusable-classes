import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { PokemonCardModule } from 'src/app/components/pokemon-card.component';
import {
  PokemonState,
  PokemonStateService,
} from 'src/app/global-state/pokemon-state.service';
import { GenerationSelectionModule } from '../../components/generation-selection.component';
import { PaginatorModule } from '../../components/paginator.component';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
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
  imports: [
    CommonModule,
    PokemonCardModule,
    PaginatorModule,
    GenerationSelectionModule,
  ],
  declarations: [PokedexPageComponent],
  exports: [PokedexPageComponent],
})
export class PokedexPageModule {}
