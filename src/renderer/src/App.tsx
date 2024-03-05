import { type Component } from 'solid-js';
import { IPC_EVENTS } from 'shared';

const App: Component = () => {
  const findMovie = (): void => window.electron.ipcRenderer.send(IPC_EVENTS.findMovie);

  return (
    <div>
      <button onClick={findMovie}>Find movie</button>
    </div>
  );
};

export default App;
