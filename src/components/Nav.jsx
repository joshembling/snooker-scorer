import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { GlobalContext } from '../context/GlobalContext';
import { ScoreContext } from '../context/ScoreContext';

import Mistake from './Mistake';

const Nav = () => {
  const {
    score,
    setScore,
    redsRemaining,
    setRedsRemaining,
    nextBall,
    setNextBall,
    mistake,
    setMistake,
    freeBall,
    setFreeBall,
    currentBreak,
    setCurrentBreak,
  } = useContext(GlobalContext);

  const {
    changePlayer,
    player,
    setPlayer,
    addBreakHistory,
    highestBreak,
    breakCurrent,
    setBreakCurrent,
    breakHistory,
  } = useContext(PlayerContext);

  const { addScore, foulActive, setFoulActive } = useContext(ScoreContext);

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
    setFreeBall(true);
    setNextBall('Free Ball');

    if (redsRemaining > 0) {
    }
  };

  return (
    <nav>
      {/* <h3>Object ball: {nextBall}</h3> */}
      <div className='buttons'>
        <button onClick={changePlayer}>Change Player</button>
        <button onClick={handleRedOffTable} disabled={redsRemaining === 0}>
          Red off table
        </button>
        <button onClick={showFoul}>Add Foul</button>
        <button
          onClick={() => setMistake((prev) => !prev)}
          disabled={score.p1 === 0 && score.p2 === 0}
        >
          {mistake === false ? "I've made a mistake!" : 'Go back to the game!'}
        </button>
        <button onClick={showFreeBall}>Free ball</button>
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
