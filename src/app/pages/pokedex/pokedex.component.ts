import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PokemonState,
  PokemonStateService,
} from 'src/app/global-state/pokemon-state.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  pokemon$: Observable<PokemonState> = this.pokemonState.state$;

  constructor(private pokemonState: PokemonStateService) {}

  ngOnInit(): void {
    this.pokemonState.loadPokemon();
  }
}
