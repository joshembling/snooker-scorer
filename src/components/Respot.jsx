import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

import { PlayerContext } from '../context/PlayerContext';
import { ScoreContext } from '../context/ScoreContext';

const Respot = () => {
  const { addBreakHistory } = useContext(PlayerContext);
  const { addScore, setRespot } = useContext(ScoreContext);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>RESPOT</h2>
      <div className='colour-balls'>
        <button
          className='black'
          value='7'
          colour='black'
          onClick={(e) => {
            addScore(e);
            addBreakHistory(e);
            setRespot(false);
          }}
        ></button>
      </div>
    </>
  );
};

export default Respot;
