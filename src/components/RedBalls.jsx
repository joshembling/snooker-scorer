import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { PlayerContext } from '../context/PlayerContext';
import { ScoreContext } from '../context/ScoreContext';

const RedBalls = () => {
  const { redsRemaining, setRedsRemaining, freeBall, shotTime, setShotTime } =
    useContext(GlobalContext);
  const { addBreakHistory } = useContext(PlayerContext);
  const { addScore, handleBallsPotted, handleShotTime } =
    useContext(ScoreContext);

  const calculateRedsRemaining = (e) => {
    setRedsRemaining((prev) => prev - 1);
  };

  return (
    freeBall === false && (
      <div className='red-balls'>
        <button
          className='red-ball'
          value='1'
          colour='red'
          onClick={(e) => {
            addScore(e);
            addBreakHistory(e);
            calculateRedsRemaining(e);
            handleBallsPotted(e);
            handleShotTime(e);
          }}
          disabled={redsRemaining === 0}
        >
          {redsRemaining}
        </button>
      </div>
    )
  );
};

export default RedBalls;
