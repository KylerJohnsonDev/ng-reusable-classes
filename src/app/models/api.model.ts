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
  id: string;
  imageUrl: string;
}

export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

export interface GenerationOption {
  description: string;
  paginationOptions: PaginationOptions;
}

export enum PaginationActions {
  forward = 'forward',
  backward = 'backward',
}
