import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

import { PlayerContext } from '../context/PlayerContext';
import { ScoreContext } from '../context/ScoreContext';

const ColourBalls = ({ setFinalColours }) => {
  const { freeBall, redsRemaining, handleFreeBall } = useContext(GlobalContext);
  const { addBreakHistory, lastColourAfterRed, setLastColourAfterRed } =
    useContext(PlayerContext);
  const { addScore } = useContext(ScoreContext);

  /**
   * FINAL COLOURS INIT
   */
  useEffect(() => {
    if (redsRemaining === 0) {
      setLastColourAfterRed(true);
    }
  }, [redsRemaining]);

  const handleLastColourAfterRed = (e) => {
    console.log('No more normal balls');
    setFinalColours(true);
  };

  console.log(lastColourAfterRed);

  return (
    <div className='colour-balls'>
      {colours.map((colour, idx) => {
        return (
          <button
            key={idx}
            className={colour.name}
            value={freeBall ? 1 : colour.value}
            colour={colour.name}
            onClick={(e) => {
              addScore(e);
              addBreakHistory(e);
              freeBall && handleFreeBall(e);
              lastColourAfterRed && handleLastColourAfterRed(e);
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

export default ColourBalls;
