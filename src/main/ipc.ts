export const registerIpc = (ipcMain: Electron.IpcMain): void => {
  // IPC test
  ipcMain.on('ping', () => console.log('pong'));
};
