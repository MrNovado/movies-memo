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
    window.electron.ipcRenderer.once('pong', (_, ...args) => {
      const raw: unknown = JSON.parse(args[0]);
      try {
        res(moviesSchema.parse(raw));
      } catch {
        res(raw as Array<MovieSearchResult>);
      }
    });
  });

const App: Component = () => {
  const [query, setQuery] = createSignal<string | false>(false);
  const [res] = createResource(() => query(), findMovie, {});

  return (
    <div>
      <button onClick={() => setQuery('matrix')}>Find movie</button>
      <ul>
        <For each={res()}>
          {(movie) => (
            <li>
              #{movie.id} {movie.title}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default App;
