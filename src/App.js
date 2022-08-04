import './scss/App.scss';

import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

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

function App() {
  const [startGame, setStartGame] = useState(false);
  const [bestOfFrames, setBestOfFrames] = useState(3);
  const [finalColours, setFinalColours] = useState(false);
  const [finishGame, setFinishGame] = useState(false);
  const [finishMatch, setFinishMatch] = useState(false);
  const [concededFrame, setConcededFrame] = useState(false);
  const [respot, setRespot] = useState(false);

  // console.log('Finish Match: ' + finishMatch);
  // console.log('Respot: ' + respot);

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
        finishMatch={finishMatch}
        setFinishMatch={setFinishMatch}
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
                concededFrame={concededFrame}
                setConcededFrame={setConcededFrame}
                finishMatch={finishMatch}
                setFinishMatch={setFinishMatch}
                setStartGame={setStartGame}
              >
                <Nav
                  finishGame={finishGame}
                  respot={respot}
                  concededFrame={concededFrame}
                />
                {/* Render respot */}
                {finishGame === true && respot === true ? <Respot /> : ''}

                {/* If finished game and there's a winner show victory, otherwise show the balls */}
                {(finishGame === true && respot === false) ||
                (concededFrame === true && respot === false) ? (
                  <Winner />
                ) : (
                  ''
                )}

                {finishGame === false &&
                finalColours === false &&
                concededFrame === false ? (
                  <>
                    <RedBalls />
                    <ColourBalls setFinalColours={setFinalColours} />
                  </>
                ) : (
                  ''
                )}

                {finishGame === false &&
                concededFrame === false &&
                finalColours === true ? (
                  <FinalBalls finalColours={finalColours} />
                ) : (
                  ''
                )}

                {finishMatch && <EndMatch />}

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
