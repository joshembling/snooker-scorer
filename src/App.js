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
import Respot from './components/Respot';
import Winner from './components/Winner';
import EndMatch from './components/EndMatch';

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
  const [bestOfFrames, setBestOfFrames] = useState(3);
  const [finalColours, setFinalColours] = useState(false);
  const [finishGame, setFinishGame] = useState(false);
  const [respot, setRespot] = useState(false);

  console.log(finishGame);
  return (
    <>
      <div className='rotate'>
        <h2>
          Please rotate your device <FaMobile />
        </h2>
      </div>
      <GlobalProvider
        bestOfFrames={bestOfFrames}
        setBestOfFrames={setBestOfFrames}
      >
        <div className='snookerApp'>
          {startGame === false ? (
            <StartGame setStartGame={setStartGame} />
          ) : (
            <PlayerProvider
              finalColours={finalColours}
              setFinalColours={setFinalColours}
            >
              <ScoreProvider
                finishGame={finishGame}
                setFinishGame={setFinishGame}
                respot={respot}
                setRespot={setRespot}
                setFinalColours={setFinalColours}
              >
                <Nav finishGame={finishGame} respot={respot} />
                {/* Render respot */}
                {finishGame === true && respot === true ? <Respot /> : ''}

                {/* If finished game and there's a winner show victory, otherwise show the balls */}
                {finishGame === true && respot === false ? <Winner /> : ''}

                {finishGame === false && finalColours === false ? (
                  <>
                    <RedBalls />
                    <ColourBalls setFinalColours={setFinalColours} />
                  </>
                ) : (
                  ''
                )}

                {finishGame === false && finalColours === true ? (
                  <FinalBalls finalColours={finalColours} />
                ) : (
                  ''
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
