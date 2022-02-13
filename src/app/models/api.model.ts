export interface FetchPokemonApiResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonApiResult[];
}

export interface PokemonApiResult {
  name: string;
  url: string;
}

export interface PokemonSummary extends PokemonApiResult {
  id: number;
  imageUrl: string;
}

export interface PaginationOptions {
  limit?: number;
  offset?: number;
}
