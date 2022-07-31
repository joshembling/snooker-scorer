import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

import { PlayerContext } from '../context/PlayerContext';
import { ScoreContext } from '../context/ScoreContext';

const ColourBalls = () => {
  const { freeBall, setFreeBall, setNextBall } = useContext(GlobalContext);
  const { addBreakHistory } = useContext(PlayerContext);
  const { addScore } = useContext(ScoreContext);

  const handleFreeBall = (e) => {
    setFreeBall(false);
    setNextBall('Colour');
  };

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
              // lastColourAfterRed && handleLastColourAfterRed(e);
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
