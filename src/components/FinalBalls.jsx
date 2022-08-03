import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { PlayerContext } from '../context/PlayerContext';
import { ScoreContext } from '../context/ScoreContext';

const FinalBalls = () => {
  const { freeBall, handleFreeBall } = useContext(GlobalContext);

  const { addBreakHistory } = useContext(PlayerContext);

  const { addScore, finalColourValue, setFinalColourValue, setFinishGame } =
    useContext(ScoreContext);

  const handleColourValue = (e) => {
    if (e.target.value == finalColourValue) {
      setFinalColourValue((prev) => prev + 1);
    }

    if (e.target.value === '7') {
      setFinishGame(true);
    }
  };

  return (
    <div className='colour-balls'>
      <h1>FINAL</h1>
      {colours
        .filter((colour) => colour.value === finalColourValue)
        .map((colour, idx) => {
          return (
            <button
              key={idx}
              className={colour.name}
              value={colour.value}
              colour={colour.name}
              onClick={(e) => {
                addScore(e);
                addBreakHistory(e);
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
