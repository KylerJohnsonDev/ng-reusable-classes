import { PokemonApiResult, PokemonSummary } from '../models/api.model';

export function formatPokemonResults(
  results: PokemonApiResult[]
): PokemonSummary[] {
  return results.map((result) => {
    const id = getPokemonIdFromResultUrl(result.url);
    const summary: PokemonSummary = {
      id,
      name: result.name,
      url: result.url,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
    return summary;
  });
}

export function getPokemonIdFromResultUrl(url: string): string {
  const segments = url.split('/');
  return segments[segments.length - 2];
}
