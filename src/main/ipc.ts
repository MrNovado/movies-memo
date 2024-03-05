import { IPC_EVENTS, IPC, type MovieSearchResult } from 'shared';
import { search } from './use-case';

export const registerIpc = (ipcMain: Electron.IpcMain): void => {
  const findMovieIPC = IPC.findMovie.server(ipcMain);
  findMovieIPC.receive(async (rawQuery, event) => {
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
      event.replySuccess(IPC_EVENTS.findMovieResp, results);
    } catch {
      console.log(IPC_EVENTS.findMovieError);
      event.replyError(IPC_EVENTS.findMovieError);
    }
  });
};
