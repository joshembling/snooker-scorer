import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { GlobalContext } from '../context/GlobalContext';
import { ScoreContext } from '../context/ScoreContext';

import Mistake from './Mistake';

const Nav = ({ finishGame, respot, concededFrame }) => {
  const {
    score,
    setScore,
    redsRemaining,
    setRedsRemaining,
    setNextBall,
    mistake,
    setMistake,
    freeBall,
    setFreeBall,
    finishMatch,
    currentBreak,
  } = useContext(GlobalContext);

  const { changePlayer, player, setPlayer } = useContext(PlayerContext);

  const {
    foulActive,
    setFoulActive,
    startNextFrame,
    returnToHome,
    handleShotTime,
  } = useContext(ScoreContext);

  const handleRedOffTable = (e) => {
    if (redsRemaining > 0) {
      setRedsRemaining((prev) => prev - 1);
    }
    if (redsRemaining === 1) {
      setNextBall('Colour');
    }
  };

  const showFoul = () => {
    setFoulActive((prev) => !prev);
  };

  const addFoulToScore = (e) => {
    if (player === 'Player 1') {
      setScore((prev) => ({
        ...prev,
        p2: prev.p2 + parseInt(e.target.value),
      }));
      setPlayer('Player 2');
      setFoulActive(false);
    } else {
      setScore((prev) => ({
        ...prev,
        p1: prev.p1 + parseInt(e.target.value),
      }));
      setPlayer('Player 1');
      setFoulActive(false);
    }
  };

  const showFreeBall = () => {
    setFreeBall((prev) => !prev);
    setNextBall('Free Ball');

    if (redsRemaining > 0) {
    }
  };

  return (
    <nav>
      <div className='buttons'>
        {/* {((finishGame === false && concededFrame === false) || respot) && (
          <button onClick={changePlayer}>Change Player</button>
        )} */}
        {finishGame === false &&
          concededFrame === false &&
          finishMatch === false && (
            <button
              onClick={(e) => {
                changePlayer();
                handleShotTime(e);
              }}
            >
              Change Player
            </button>
          )}
        {respot && (
          <button
            onClick={(e) => {
              changePlayer();
              handleShotTime(e);
            }}
          >
            Change Player
          </button>
        )}

        {(() => {
          if (finishMatch === false) {
            if (
              finishGame === false &&
              respot === false &&
              concededFrame === false
            ) {
              return (
                <>
                  <button
                    onClick={handleRedOffTable}
                    disabled={redsRemaining === 0}
                  >
                    Red off table
                  </button>
                  <button onClick={showFoul}>Add Foul</button>
                  <button
                    onClick={() => setMistake((prev) => !prev)}
                    disabled={
                      (score.p1 === 0 && score.p2 === 0) ||
                      player === 'Player 1'
                        ? currentBreak.p1 === 0
                        : player === 'Player 2'
                        ? currentBreak.p2 === 0
                        : ''
                    }
                  >
                    {mistake === false
                      ? "I've made a mistake!"
                      : 'Go back to the game!'}
                  </button>
                  <button onClick={showFreeBall}>Free ball</button>
                </>
              );
            }
          }
        })()}

        {(() => {
          if (finishMatch === false) {
            if (
              (finishGame === true && respot === false) ||
              (concededFrame === true && respot === false)
            ) {
              return <button onClick={startNextFrame}>Start Next Frame</button>;
            }
          }
        })()}

        {finishMatch && (
          <button onClick={returnToHome}>Return to Homescreen</button>
        )}
      </div>

      <div className='confirm'>
        <button>Confirm red off table</button>
        <button>Cancel</button>
      </div>

      <div className={`fouls ${foulActive ? 'active' : ''}`}>
        {fouls.map((foul, idx) => {
          return (
            <button key={idx} value={foul} onClick={addFoulToScore}>
              {foul}
            </button>
          );
        })}
      </div>

      {freeBall && (
        <h2 style={{ textAlign: 'center' }}>Free Ball in operation</h2>
      )}

      {mistake && <Mistake />}
    </nav>
  );
};

const fouls = [4, 5, 6, 7];

export default Nav;
