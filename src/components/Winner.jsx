import React, { useContext } from 'react';

import { GlobalContext } from '../context/GlobalContext';
import { ScoreContext } from '../context/ScoreContext';

const Winner = () => {
  const { playerName } = useContext(GlobalContext);
  const { frameWinner } = useContext(ScoreContext);

  console.log(frameWinner);
  console.log(playerName);
  return (
    <section className='winner'>
      <h2>
        Frame win goes to:{' '}
        {frameWinner.p1 === true ? playerName.p1 : playerName.p2}
      </h2>
    </section>
  );
};

export default Winner;
