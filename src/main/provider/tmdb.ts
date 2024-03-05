import { z } from 'zod';
import {
  type MovieSearchResult, //
  movieSearchResultSchema,
} from 'shared';

const findMovieResponse = z.object({
  results: z.array(movieSearchResultSchema),
});

export const TMDB = {
  findMovie: async (query: string): Promise<Array<MovieSearchResult>> => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.MAIN_VITE_TMDB_API_READ_TOKEN}`,
        },
      });

      const raw: unknown = await response.json();
      return findMovieResponse.parse(raw).results;
    } catch (error) {
      throw new Error('@tmdb/findMovie/error');
    }
  },
};
