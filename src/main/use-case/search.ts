import { TMDB } from '../provider/tmdb';
import { type TMDBMovieSearchResult } from '../provider/tmbd.schema';

const CACHE: Record<string, Array<TMDBMovieSearchResult>> = {};
const PREFIX = (q: string) => ({
  tmdbMovie: `@tmdbMovie/${q}`,
  tmdbTV: `@tmdbTV/${q}`,
});

export async function* search(query: string): AsyncGenerator<Array<TMDBMovieSearchResult>> {
  const P = PREFIX(query);
  yield (CACHE[P.tmdbMovie] = CACHE[P.tmdbMovie] || (await TMDB.findMovie(query)));
  yield (CACHE[P.tmdbTV] = CACHE[P.tmdbTV] || (await TMDB.findTV(query)));
}
