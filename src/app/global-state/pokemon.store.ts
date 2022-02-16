import { Injectable } from '@angular/core';
import { PokemonService } from '../http/pokemon.service';
import {
  FetchPokemonApiResponse,
  PaginationOptions,
  PokemonSummary,
} from '../models/api.model';
import { formatPokemonResults } from '../utils/pokemon';
import { StateStoreBase, StateStoreConfiguration } from './state-base';

export interface PokemonState {
  isLoading: boolean;
  pokemon: PokemonSummary[] | null;
  count: number | null;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  errorMessage: string | null;
}

export const defaultState: PokemonState = {
  isLoading: false,
  pokemon: null,
  count: null,
  nextPageUrl: null,
  previousPageUrl: null,
  errorMessage: null,
};

const storeConfiguration: StateStoreConfiguration<PokemonState> = {
  initialState: defaultState,
  debug: true,
  verbose: true,
};

@Injectable({
  providedIn: 'root',
})
export class PokemonStore extends StateStoreBase<PokemonState> {
  constructor(private pokemonService: PokemonService) {
    super(storeConfiguration);
  }

  loadPokemon(
    paginationOptions?: PaginationOptions,
    paginationUrl?: string
  ): void {
    this.setState({ isLoading: true });
    this.pokemonService
      .fetchPokemon(paginationOptions, paginationUrl)
      .subscribe((res: FetchPokemonApiResponse) => {
        const state: PokemonState = {
          isLoading: false,
          pokemon: formatPokemonResults(res.results),
          count: res.count,
          nextPageUrl: res.next,
          previousPageUrl: res.previous,
          errorMessage: null,
        };
        this.setState(state);
      });
  }
}
