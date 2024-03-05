import { z } from 'zod';

export const movieSearchResultSchema = z.object({
  adult: z.boolean().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  genre_ids: z.array(z.number()).nullable().optional(),
  id: z.number(),
  original_language: z.string().nullable().optional(),
  original_title: z.string().nullable().optional(),
  overview: z.string().nullable().optional(),
  popularity: z.number().nullable().optional(),
  poster_path: z.string().nullable().optional(),
  release_date: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  video: z.boolean().nullable().optional(),
  vote_average: z.number().nullable().optional(),
  vote_count: z.number().nullable().optional(),
});

export type MovieSearchResult = z.infer<typeof movieSearchResultSchema>;
