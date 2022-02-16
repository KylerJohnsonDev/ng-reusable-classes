import { Injectable } from '@angular/core';
import { PokemonService } from '../http/pokemon.service';
import {
  FetchPokemonApiResponse,
  PaginationActions,
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
  totalNumPages: number;
  currentPage: number;
  limit: number;
  offset: number;
}

export const defaultState: PokemonState = {
  isLoading: false,
  pokemon: null,
  count: null,
  nextPageUrl: null,
  previousPageUrl: null,
  errorMessage: null,
  currentPage: 0,
  limit: 24,
  offset: 0,
  totalNumPages: 1,
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

  loadPokemon(paginationAction?: PaginationActions): void {
    this.setState({ isLoading: true });
    const currentState = this.getStateCopy() ?? defaultState;
    const paginationOptions: PaginationOptions = {
      limit: currentState?.limit,
      offset: this.calculatePaginationOffset(currentState, paginationAction),
    };
    this.pokemonService
      .fetchPokemon(paginationOptions)
      .subscribe((res: FetchPokemonApiResponse) => {
        const newState = {
          currentState,
          isLoading: false,
          pokemon: formatPokemonResults(res.results),
          count: res.count,
          offset: res.results.length,
          currentPage: this.calculateCurrentPageIndex(
            currentState.currentPage,
            paginationAction
          ),
          totalNumPages: currentState
            ? Math.ceil(res.count / currentState.limit)
            : 1,
          errorMessage: null,
        };
        this.setState(newState);
      });
  }

  private calculatePaginationOffset(
    currentState: PokemonState,
    paginationAction?: PaginationActions
  ): number {
    if (!paginationAction) {
      return currentState.currentPage * currentState.limit;
    }
    switch (paginationAction) {
      case PaginationActions.backward:
        return (currentState.currentPage - 1) * currentState.limit;
      case PaginationActions.forward:
        return (currentState.currentPage + 1) * currentState.limit;
    }
  }

  private calculateCurrentPageIndex(
    currentPageIndex: number,
    paginationAction?: PaginationActions
  ): number {
    if (!paginationAction) {
      return currentPageIndex;
    }

    switch (paginationAction) {
      case PaginationActions.backward:
        return currentPageIndex - 1;
      case PaginationActions.forward:
        return currentPageIndex + 1;
    }
  }
}
