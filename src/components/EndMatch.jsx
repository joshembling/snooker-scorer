import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { ScoreContext } from '../context/ScoreContext';

const EndMatch = () => {
  const { playerName, matchWinner, matchHighestBreak, averageShotTime } =
    useContext(GlobalContext);

  const { ballsPotted } = useContext(ScoreContext);

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
        <ul>
          <li>
            <span>
              <strong>Highest Break:</strong> {matchHighestBreak.p1}
            </span>
            <span>
              <strong>Balls potted:</strong> {ballsPotted.p1}
            </span>
            <span>
              <strong>Average Shot Time: </strong> {averageShotTime.p1} secs
            </span>
          </li>
          <li>
            <span>
              <strong>Highest Break:</strong> {matchHighestBreak.p2}
            </span>
            <span>
              <strong>Balls potted:</strong> {ballsPotted.p2}
            </span>
            <span>
              <strong>Average Shot Time: </strong> {averageShotTime.p2} secs
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default EndMatch;
