import {
  createResource, //
  type Component,
  createSignal,
  For,
} from 'solid-js';
import { z } from 'zod';
import {
  IPC_EVENTS, //
  type MovieSearchResult,
  movieSearchResultSchema,
} from 'shared';

const moviesSchema = z.array(movieSearchResultSchema);

const findMovie = async (query: string): Promise<Array<MovieSearchResult>> =>
  new Promise((res) => {
    window.electron.ipcRenderer.send(IPC_EVENTS.findMovie, query);
    window.electron.ipcRenderer.once(IPC_EVENTS.findMovieResp, (_, ...args) => {
      const raw: unknown = JSON.parse(args[0]);
      try {
        res(moviesSchema.parse(raw));
      } catch {
        res(raw as Array<MovieSearchResult>);
      }
    });
  });

const App: Component = () => {
  const [queryInp, setQueryInp] = createSignal<string>('');
  const [query, setQuery] = createSignal<string | false>(false);
  const [res] = createResource(() => query(), findMovie, {});

  return (
    <div>
      <input onChange={(e) => setQueryInp(e.target.value)} value={queryInp()} />
      <button onClick={() => setQuery(queryInp())}>Find movie</button>
      <ul>
        <For each={res()}>
          {(movie) => (
            <li>
              #{movie.tmdbId} {movie.title}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default App;
