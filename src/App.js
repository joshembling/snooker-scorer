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
  const [startGame, setStartGame] = useLocalStorage('START_GAME', false);
  const [bestOfFrames, setBestOfFrames] = useLocalStorage('BEST_OF_FRAMES', 3);
  const [finalColours, setFinalColours] = useLocalStorage(
    'FINAL_COLOURS',
    false
  );
  const [finishGame, setFinishGame] = useLocalStorage('FINISH_GAME', false);
  const [finishMatch, setFinishMatch] = useLocalStorage('FINISH_MATCH', false);
  const [matchHighestBreak, setMatchHighestBreak] = useLocalStorage(
    'MATCH_HIGHEST_BREAK',
    { p1: 0, p2: 0 }
  );
  const [concededFrame, setConcededFrame] = useState(false);
  const [respot, setRespot] = useLocalStorage('RESPOT', false);

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
        matchHighestBreak={matchHighestBreak}
        setMatchHighestBreak={setMatchHighestBreak}
      >
        <div className='snookerApp'>
          <PlayerProvider
            finalColours={finalColours}
            setFinalColours={setFinalColours}
          >
            <ScoreProvider
              finishGame={finishGame}
              setFinishGame={setFinishGame}
              respot={respot}
              setRespot={setRespot}
              concededFrame={concededFrame}
              setConcededFrame={setConcededFrame}
              startGame={startGame}
              setStartGame={setStartGame}
            >
              {startGame === false ? (
                <StartGame />
              ) : (
                <>
                  <Nav
                    finishGame={finishGame}
                    respot={respot}
                    concededFrame={concededFrame}
                  />
                  {/* Render respot */}
                  {finishGame === true && respot === true ? <Respot /> : ''}

                  {/* If finished game and there's a winner show victory, otherwise show the balls */}
                  {(() => {
                    if (finishMatch === false) {
                      if (
                        (finishGame === true && respot === false) ||
                        (concededFrame === true && respot === false)
                      ) {
                        return <Winner />;
                      }
                    }
                  })()}

                  {(() => {
                    if (finishMatch === false) {
                      if (
                        finishGame === false &&
                        finalColours === false &&
                        concededFrame === false
                      ) {
                        return (
                          <>
                            <RedBalls />
                            <ColourBalls />
                          </>
                        );
                      }
                    }
                  })()}

                  {finishGame === false &&
                  concededFrame === false &&
                  finalColours === true ? (
                    <FinalBalls finalColours={finalColours} />
                  ) : (
                    ''
                  )}

                  {finishMatch && <EndMatch />}

                  <Footer />
                </>
              )}
            </ScoreProvider>
          </PlayerProvider>
        </div>
      </GlobalProvider>
    </>
  );
}

export default App;
