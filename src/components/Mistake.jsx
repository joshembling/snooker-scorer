import React, { useContext } from 'react';

import { PlayerContext } from '../context/PlayerContext';
import { GlobalContext } from '../context/GlobalContext';

const Mistake = () => {
  const { setScore, setRedsRemaining, mistake, freeBall, setCurrentBreak } =
    useContext(GlobalContext);

  const { player, breakCurrent, setBreakCurrent } = useContext(PlayerContext);

  const handleUndoBall = (e) => {
    if (player === 'Player 1') {
      setScore((prev) => ({
        ...prev,
        p1: prev.p1 - parseInt(e.target.value),
      }));
      setCurrentBreak((prev) => ({
        ...prev,
        p1: prev.p1 - parseInt(e.target.value),
      }));
      setBreakCurrent((prev) => ({
        ...prev,
        p1: prev.p1.slice(0, -1),
      }));
    } else {
      setScore((prev) => ({
        ...prev,
        p2: prev.p2 - parseInt(e.target.value),
      }));
      setCurrentBreak((prev) => ({
        ...prev,
        p2: prev.p2 - parseInt(e.target.value),
      }));
      setBreakCurrent((prev) => ({
        ...prev,
        p2: prev.p2.slice(0, -1),
      }));
    }

    if (e.target.classList.contains('red')) {
      setRedsRemaining((prev) => prev + 1);
    }
  };

  return (
    <div className='scores'>
      {breakCurrent.p1.map((ball, idx, arr) => {
        return (
          <button
            key={idx}
            value={ball.value}
            className={`break-history-ball ${
              freeBall === true ? 'free-ball' : ball.colour
            } ${idx + 1 === arr.length ? 'last-ball' : ''}`}
            disabled={mistake === true && idx + 1 === arr.length ? false : true}
            onClick={handleUndoBall}
          >
            {freeBall && 'FB'}
          </button>
        );
      })}

      {breakCurrent.p2.map((ball, idx, arr) => {
        return (
          <button
            key={idx}
            value={ball.value}
            className={`break-history-ball ${
              freeBall === true ? 'free-ball' : ball.colour
            } ${idx + 1 === arr.length ? 'last-ball' : ''}`}
            disabled={mistake === true && idx + 1 === arr.length ? false : true}
            onClick={handleUndoBall}
          ></button>
        );
      })}
    </div>
  );
};

export default Mistake;