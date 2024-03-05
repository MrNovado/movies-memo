import { IPC_EVENTS } from 'shared';

export const registerIpc = (ipcMain: Electron.IpcMain): void => {
  ipcMain.on(IPC_EVENTS.ping, () => console.log('pong'));
  ipcMain.on(IPC_EVENTS.findMovie, async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/11', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.MAIN_VITE_TMDB_API_READ_TOKEN}`,
        },
      });
      console.log('@findMovie/response', response);
    } catch (error) {
      console.log('@findMovie/error', error);
    }
  });
};
