import './scss/App.scss';

import { useState, useContext } from 'react';

import { FaMobile } from 'react-icons/fa';

/**
 * COMPONENTS
 */
import StartGame from './components/StartGame';
import Nav from './components/Nav';
import Footer from './components/Footer';
import RedBalls from './components/RedBalls';
import ColourBalls from './components/ColourBalls';
import FinalBalls from './components/FinalBalls';

/**
 * PROVIDERS
 */
import { GlobalProvider } from './context/GlobalContext';
import { PlayerProvider } from './context/PlayerContext';
import { ScoreProvider } from './context/ScoreContext';

/**
 * CONTEXT
 */
// import { GlobalContext } from './context/GlobalContext';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [finalColours, setFinalColours] = useState(false);

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
            <PlayerProvider
              finalColours={finalColours}
              setFinalColours={setFinalColours}
            >
              <ScoreProvider>
                <Nav />
                {finalColours === false ? (
                  <>
                    <RedBalls />
                    <ColourBalls setFinalColours={setFinalColours} />
                  </>
                ) : (
                  <FinalBalls finalColours={finalColours} />
                )}
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
