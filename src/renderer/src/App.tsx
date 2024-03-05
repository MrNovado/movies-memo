import {
  createResource, //
  type Component,
  createSignal,
  For,
} from 'solid-js';
import { IPC, type MovieSearchResult } from 'shared';

const findMovieIPC = IPC.findMovie.client(window.electron.ipcRenderer);
const findMovie = async (query: string): Promise<Array<MovieSearchResult>> => {
  findMovieIPC.disposeSubs();
  return new Promise((res) => {
    console.log('findMovie', query);
    findMovieIPC.send(query);
    findMovieIPC.xError('once', () => res([]));
    findMovieIPC.xSuccess('once', res);
  });
};

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
