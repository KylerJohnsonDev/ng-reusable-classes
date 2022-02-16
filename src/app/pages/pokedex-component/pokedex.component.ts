import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { PokemonCardModule } from 'src/app/components/pokemon-card.component';
import { PokemonState, PokemonStore } from 'src/app/global-state/pokemon.store';
import { PaginationActions } from 'src/app/models/api.model';
import { GenerationSelectionModule } from '../../components/generation-selection.component';
import { PaginatorModule } from '../../components/paginator.component';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
})
export class PokedexPageComponent implements OnInit {
  pokemonState$: Observable<PokemonState | null> = this.pokemonStore.state$;

  constructor(private pokemonStore: PokemonStore) {}

  ngOnInit(): void {
    this.pokemonStore.loadPokemon();
  }

  onPaginationChange(newPageIndex: PaginationActions) {
    this.pokemonStore.loadPokemon(newPageIndex);
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
