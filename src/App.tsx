import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { uniqueNamesGenerator, names } from 'unique-names-generator';

import Menu from './components/Menu';
import Game from './components/Game/Game';

const App = () => {
  const [playerName, setPlayerName] = useState<string>(
    uniqueNamesGenerator({
      dictionaries: [names],
      length: 1,
      style: 'lowerCase',
    })
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Menu playerName={playerName} setPlayerName={setPlayerName} />
            }
          />
          <Route path="/:gameId" element={<Game playerName={playerName} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
