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

@Injectable({
  providedIn: 'root',
})
export class PokemonStateService extends StateServiceBase<PokemonState> {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {
    super();
    this.setState(defaultState);
  }

  private fetchPokemon(
    paginationOptions?: PaginationOptions,
    paginationUrl?: string
  ): Observable<FetchPokemonApiResponse> {
    let url = `${this.baseUrl}/pokemon`;

    if (paginationUrl) {
      return this.http.get<FetchPokemonApiResponse>(paginationUrl);
    }

    if (paginationOptions) {
      return this.http.get<FetchPokemonApiResponse>(url, {
        params: { ...paginationOptions },
      });
    }

    return this.http.get<FetchPokemonApiResponse>(url);
  }

  loadPokemon(
    paginationOptions?: PaginationOptions,
    paginationUrl?: string
  ): void {
    this.setState({ isLoading: true });
    this.fetchPokemon(paginationOptions, paginationUrl).subscribe(
      (res: FetchPokemonApiResponse) => {
        const state: PokemonState = {
          isLoading: false,
          pokemon: this.formatPokemonResults(res.results),
          count: res.count,
          nextPageUrl: res.next,
          previousPageUrl: res.previous,
          errorMessage: null,
        };
        this.setState(state);
      }
    );
  }

  private formatPokemonResults(results: PokemonApiResult[]): PokemonSummary[] {
    return results.map((result, index) => {
      const id = this.getPokemonIdFromResultUrl(result.url);
      const summary: PokemonSummary = {
        id,
        name: result.name,
        url: result.url,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
      return summary;
    });
  }

  private getPokemonIdFromResultUrl(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }
}
