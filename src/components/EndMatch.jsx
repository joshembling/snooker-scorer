import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const EndMatch = () => {
  const { playerName, matchWinner, playerFrames } = useContext(GlobalContext);

  return (
    <section className='end-match'>
      <h2>
        Match winner: <br />
        {matchWinner.p1 === true
          ? playerName.p1.toUpperCase()
          : playerName.p2.toUpperCase()}{' '}
        🎉
      </h2>
      <h4>Quick stats:</h4>
      <ul>
        <li>
          Final score: <br />
          {`${playerName.p1.toUpperCase()} ${playerFrames.p1} - ${
            playerFrames.p2
          } ${playerName.p2.toUpperCase()}`}
        </li>
        <li>
          Highest break: <br />
          143 (player 1)
        </li>
      </ul>
    </section>
  );
};

export default EndMatch;
