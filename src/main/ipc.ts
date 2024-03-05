import { IPC_EVENTS } from 'shared';

export const registerIpc = (ipcMain: Electron.IpcMain): void => {
  ipcMain.on(IPC_EVENTS.ping, () => console.log('pong'));
  ipcMain.on(IPC_EVENTS.findMovie, async () => {
    console.log('@findMovie', {
      API_KEY: import.meta.env.MAIN_VITE_TMDB_API_KEY,
      API_READ_TOKEN: import.meta.env.MAIN_VITE_TMDB_API_READ_TOKEN,
    });

    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/11', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.MAIN_VITE_TMDB_API_READ_TOKEN}`,
        },
      });
      console.log('@findMovie/response', await response.json());
    } catch (error) {
      console.log('@findMovie/error', error);
    }
  });
};
