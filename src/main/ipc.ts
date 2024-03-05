import { IPC_EVENTS } from 'shared';
import { TMDB } from './provider/tmdb';

export const registerIpc = (ipcMain: Electron.IpcMain): void => {
  ipcMain.on(IPC_EVENTS.ping, () => console.log('pong'));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ipcMain.on(IPC_EVENTS.findMovie, async (event, ...args: any[]) => {
    const rawQuery = (args[0] as string) || '';
    const query = rawQuery.trim().replaceAll(' ', '%20');
    try {
      event.reply('pong', JSON.stringify(await TMDB.findMovie(query)));
    } catch {
      console.log(`Error ${IPC_EVENTS.findMovie}`);
      event.reply('pong', '[]');
    }
  });
};
