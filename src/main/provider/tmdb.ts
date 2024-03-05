import { z } from 'zod';
import {
  type TMDBMovieSearchResult, //
  tmdbMovieSearchResultSchema,
} from './tmbd.schema';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.MAIN_VITE_TMDB_API_READ_TOKEN}`,
  },
};

const findMovieResponse = z.object({
  results: z.array(tmdbMovieSearchResultSchema),
});

export const TMDB = {
  findMovie: async (query: string): Promise<Array<TMDBMovieSearchResult>> => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        options,
      );

      const raw: unknown = await response.json();
      return findMovieResponse.parse(raw).results;
    } catch {
      throw new Error('@/TMDB/findMovie');
    }
  },

  findTV: async (query: string): Promise<Array<TMDBMovieSearchResult>> => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${query}`,
        options,
      );

      const raw: unknown = await response.json();
      return findMovieResponse.parse(raw).results;
    } catch {
      throw new Error('@/TMDB/findTV');
    }
  },
};
