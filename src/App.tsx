import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Game from './components/Game';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
