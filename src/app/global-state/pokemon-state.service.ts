import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FetchPokemonApiResponse,
  PaginationOptions,
  PokemonApiResult,
  PokemonSummary,
} from '../models/api.model';
import { StateServiceBase } from './state-base';

export interface PokemonState {
  isLoading: boolean;
  pokemon: PokemonSummary[] | null;
  count: number | null;
  nextPageRequestUrl: string | null;
  previousPageRequestUrl: string | null;
  errorMessage: string | null;
}

export const defaultState: PokemonState = {
  isLoading: false,
  pokemon: null,
  count: null,
  nextPageRequestUrl: null,
  previousPageRequestUrl: null,
  errorMessage: null,
};

@Injectable({
  providedIn: 'root',
})
export class PokemonStateService extends StateServiceBase<any> {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {
    super();
    this.setState(defaultState);
  }

  private fetchPokemon(
    paginationOptions?: PaginationOptions
  ): Observable<FetchPokemonApiResponse> {
    let url = `${this.baseUrl}/pokemon`;

    if (paginationOptions) {
      return this.http.get<FetchPokemonApiResponse>(url, {
        params: { ...paginationOptions },
      });
    }

    return this.http.get<FetchPokemonApiResponse>(url);
  }

  loadPokemon(paginationOptions?: PaginationOptions): void {
    this.setState({ isLoading: true });
    this.fetchPokemon(paginationOptions).subscribe(
      (res: FetchPokemonApiResponse) => {
        const state: PokemonState = {
          isLoading: false,
          pokemon: this.formatPokemonResults(res.results),
          count: res.count,
          nextPageRequestUrl: res.next,
          previousPageRequestUrl: res.previous,
          errorMessage: null,
        };
        this.setState(state);
      }
    );
  }

  private formatPokemonResults(results: PokemonApiResult[]): PokemonSummary[] {
    return results.map((result, index) => {
      const summary: PokemonSummary = {
        id: index + 1,
        name: result.name,
        url: result.url,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      };
      return summary;
    });
  }
}
