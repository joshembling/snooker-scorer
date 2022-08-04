import React, { useState, useEffect, useContext } from 'react';

import { GlobalContext } from '../context/GlobalContext';
import { PlayerContext } from '../context/PlayerContext';
import { ScoreContext } from '../context/ScoreContext';

const Respot = () => {
  const { setScore, setPlayerFrames } = useContext(GlobalContext);
  const { addBreakHistory, player } = useContext(PlayerContext);
  const { addScore, setRespot, setFrameWinner } = useContext(ScoreContext);

  const handleFrameWinner = (e) => {
    if (e.target.getAttribute('winner') === 'Player 1') {
      setFrameWinner((prev) => ({
        ...prev,
        p1: true,
      }));
      setPlayerFrames((prev) => ({
        ...prev,
        p1: prev.p1 + 1,
      }));
    } else if (e.target.getAttribute('winner') === 'Player 2') {
      setFrameWinner((prev) => ({
        ...prev,
        p2: true,
      }));
      setPlayerFrames((prev) => ({
        ...prev,
        p2: prev.p2 + 1,
      }));
    }
    setRespot(false);
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>RESPOT</h2>
      <div className='colour-balls'>
        <button
          className='black'
          value='7'
          colour='black'
          winner={player}
          onClick={(e) => {
            addScore(e);
            addBreakHistory(e);
            handleFrameWinner(e);
          }}
        ></button>
      </div>
    </>
  );
};

export default Respot;
