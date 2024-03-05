import { z } from 'zod';

export const movieSearchResultSchema = z.object({
  tmdbId: z.number(),
  title: z.string(),
  overview: z.string(),
  releaseDate: z.string(),
});

export type MovieSearchResult = z.infer<typeof movieSearchResultSchema>;
