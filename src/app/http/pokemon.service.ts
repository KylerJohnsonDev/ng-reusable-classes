import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FetchPokemonApiResponse,
  PaginationOptions,
} from '../models/api.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  fetchPokemon(
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

  fetchPokemonById(id: string): Observable<Pokemon> {
    const url = `${this.baseUrl}/pokemon/${id}`;
    return this.http.get<Pokemon>(url);
  }
}
