import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const EndMatch = () => {
  const { playerName, matchWinner, playerFrames, matchHighestBreak } =
    useContext(GlobalContext);

  return (
    <section className='end-match'>
      <h2>
        Match winner: <br />
        {matchWinner.p1 === true
          ? playerName.p1.toUpperCase()
          : playerName.p2.toUpperCase()}{' '}
        🎉
      </h2>
      <div className='end-match__stats'>
        <h3>Overview:</h3>
        <ul>
          <li>
            <strong>Final score:</strong>
            {`${playerName.p1.toUpperCase()} ${playerFrames.p1} - ${
              playerFrames.p2
            } ${playerName.p2.toUpperCase()}`}
          </li>
          <li>
            <strong>Highest Break:</strong>
            {`${playerName.p1.toUpperCase()} - ${matchHighestBreak.p1}`} <br />
            {`${playerName.p2.toUpperCase()} - ${matchHighestBreak.p2}`}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default EndMatch;
