import { IPC_EVENTS, type MovieSearchResult } from 'shared';
import { search } from './use-case';

export const registerIpc = (ipcMain: Electron.IpcMain): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ipcMain.on(IPC_EVENTS.findMovie, async (event, ...args: any[]) => {
    const rawQuery = (args[0] as string) || '';
    const query = rawQuery.trim().replaceAll(' ', '%20');
    const searchIt = search(query);
    console.log(IPC_EVENTS.findMovie, query);

    try {
      const step = await searchIt.next();
      const results: MovieSearchResult[] = (!step.done ? step.value : []).map((m) => ({
        tmdbId: m.id,
        title: m.title || m.original_title || query,
        overview: m.overview || '',
        releaseDate: m.release_date || '',
      }));

      console.log(IPC_EVENTS.findMovieResp, results);
      event.reply(IPC_EVENTS.findMovieResp, JSON.stringify(results));
    } catch {
      console.log(IPC_EVENTS.findMovieError);
      event.reply(IPC_EVENTS.findMovieError);
    }
  });
};
