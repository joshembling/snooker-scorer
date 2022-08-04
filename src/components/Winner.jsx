import React, { useContext } from 'react';

import { GlobalContext } from '../context/GlobalContext';
import { ScoreContext } from '../context/ScoreContext';

const Winner = () => {
  const { playerName } = useContext(GlobalContext);
  const { frameWinner } = useContext(ScoreContext);

  return (
    <section className='winner'>
      <h2>
        Frame winner: <br />
        {frameWinner.p1 === true
          ? playerName.p1.toUpperCase()
          : playerName.p2.toUpperCase()}{' '}
        🎉
      </h2>
    </section>
  );
};

export default Winner;
