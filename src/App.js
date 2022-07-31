import './scss/App.scss';

import { useState } from 'react';

import { FaMobile } from 'react-icons/fa';

/**
 * COMPONENTS
 */
import StartGame from './components/StartGame';
import Nav from './components/Nav';
import Footer from './components/Footer';
import RedBalls from './components/RedBalls';
import ColourBalls from './components/ColourBalls';

/**
 * CONTEXT
 */
import { GlobalProvider } from './context/GlobalContext';
import { PlayerProvider } from './context/PlayerContext';
import { ScoreProvider } from './context/ScoreContext';

function App() {
  const [startGame, setStartGame] = useState(false);
  return (
    <>
      <div className='rotate'>
        <h2>
          Please rotate your device <FaMobile />
        </h2>
      </div>
      <GlobalProvider>
        <div className='snookerApp'>
          {startGame === false ? (
            <StartGame setStartGame={setStartGame} />
          ) : (
            <PlayerProvider>
              <ScoreProvider>
                <Nav />
                <RedBalls />
                <ColourBalls />
                <Footer />
              </ScoreProvider>
            </PlayerProvider>
          )}
        </div>
      </GlobalProvider>
    </>
  );
}

export default App;
