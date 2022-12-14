import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { PlayerContext } from '../context/PlayerContext';
import { ScoreContext } from '../context/ScoreContext';

const FinalBalls = () => {
  const { freeBall, handleFreeBall } = useContext(GlobalContext);

  const { addBreakHistory } = useContext(PlayerContext);

  const {
    addScore,
    finalColourValue,
    setFinalColourValue,
    setFinishGame,
    setFinalColourPointsRemaining,
    handleBallsPotted,
    handleShotTime,
  } = useContext(ScoreContext);

  const handleColourValue = (e) => {
    if (e.target.value == finalColourValue) {
      setFinalColourValue((prev) => prev + 1);
      setFinalColourPointsRemaining((prev) => prev - e.target.value);
    }

    if (e.target.value === '7') {
      setFinishGame(true);
      setFinalColourPointsRemaining(0);
    }
  };

  return (
    <div className='colour-balls'>
      {colours
        .filter((colour) => colour.value === finalColourValue)
        .map((colour, idx) => {
          return (
            <button
              key={idx}
              className={colour.name + '-ball'}
              value={colour.value}
              colour={colour.name}
              onClick={(e) => {
                addScore(e);
                addBreakHistory(e);
                handleBallsPotted(e);
                handleShotTime(e);
                freeBall && handleFreeBall(e);
                !freeBall && handleColourValue(e);
              }}
            ></button>
          );
        })}
    </div>
  );
};

const colours = [
  {
    name: 'yellow',
    colour: '#FFCB00',
    value: 2,
  },
  {
    name: 'green',
    colour: '#00FF00',
    value: 3,
  },
  {
    name: 'brown',
    colour: '#8B4513',
    value: 4,
  },
  {
    name: 'blue',
    colour: '#00BFFF',
    value: 5,
  },
  {
    name: 'pink',
    colour: '#FF00FF',
    value: 6,
  },
  {
    name: 'black',
    colour: '#000000',
    value: 7,
  },
];
export default FinalBalls;
