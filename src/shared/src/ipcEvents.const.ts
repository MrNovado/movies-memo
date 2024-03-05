import { type IpcMain } from 'electron';
import { type ElectronAPI } from '@electron-toolkit/preload';
import { type MovieSearchResult } from './types';

export const IPC_EVENTS = {
  findMovie: '@ipc.FM',
  findMovieResp: '@ipc.FM.S',
  findMovieError: '@ipc.FM.E',
} as const;

type EventOnx = 'once' | 'on';

export const IPC = {
  findMovie: {
    client: (ipcRend: ElectronAPI['ipcRenderer']) => {
      return {
        send: (query: string) => {
          ipcRend.send(IPC_EVENTS.findMovie, query);
        },
        xSuccess: (type: EventOnx, cb: (r: MovieSearchResult[]) => void) => {
          ipcRend[type](IPC_EVENTS.findMovieResp, (_, ...args) => {
            const response = JSON.parse(args[0]) as MovieSearchResult[];
            cb(response);
          });
        },
        xError: (type: EventOnx, cb: () => void) => {
          ipcRend[type](IPC_EVENTS.findMovieError, () => {
            cb();
          });
        },
        disposeSubs: () => {
          ipcRend.removeAllListeners(IPC_EVENTS.findMovieError);
          ipcRend.removeAllListeners(IPC_EVENTS.findMovieResp);
        },
      };
    },

    server: (ipcMain: IpcMain) => {
      return {
        receive: (
          cb: (
            query: string,
            event: {
              replySuccess: (
                ipcEvent: typeof IPC_EVENTS.findMovieResp,
                res: MovieSearchResult[],
              ) => void;
              replyError: (ipcEvent: typeof IPC_EVENTS.findMovieError) => void;
            },
          ) => void,
        ): void => {
          ipcMain.on(IPC_EVENTS.findMovie, (event, ...args) => {
            cb(args[0] || '', {
              replySuccess(ipcEvent, res) {
                event.reply(ipcEvent, JSON.stringify(res));
              },
              replyError(ipcEvent) {
                event.reply(ipcEvent);
              },
            });
          });
        },
      };
    },
  },
};
