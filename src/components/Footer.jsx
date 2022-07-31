import React, { useState, useContext } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

// CONTEXT
import { GlobalContext } from '../context/GlobalContext';
import { PlayerContext } from '../context/PlayerContext';

const Footer = () => {
  const [playerData, setPlayerData] = useState({ p1: false, p2: false });
  const [pointsRemainingActive, setPointsRemainingActive] = useState(false);
  // const [concedeFrame, setConcedeFrame] = useState({ p1: false, p2: false });

  const {
    score,
    currentBreak,
    redsRemaining,
    playerName,
    bestOfFrames,
    playerFrames,
  } = useContext(GlobalContext);

  const { player, highestBreak, breakHistory } = useContext(PlayerContext);

  const calculatePointsRemaining = (e) => {
    return redsRemaining * 8 + 27;
  };

  return (
    <footer>
      <div className='footer-top'>
        <span
          onClick={() => setPlayerData((prev) => ({ ...prev, p1: !prev.p1 }))}
          className={`footer-box--left playerName 
	${player === 'Player 1' && 'isTurn'}`}
        >
          <span>{playerName.p1}</span>
          {player === 'Player 1' && <FaCaretLeft />}
        </span>
        <span className='footer-box playerPoints'>
          {score.p1} <span>({currentBreak.p1})</span>
        </span>
        <div
          onClick={() => setPointsRemainingActive((prev) => !prev)}
          className='footer-box frames'
        >
          <span className='frame'>{playerFrames.p1}</span>
          <span className='frame'>({bestOfFrames})</span>
          <span className='frame'>{playerFrames.p2}</span>
        </div>
        <span className='footer-box playerPoints'>
          {score.p2} <span>({currentBreak.p2})</span>
        </span>
        <span
          onClick={() => setPlayerData((prev) => ({ ...prev, p2: !prev.p2 }))}
          className={`footer-box--right playerName 
		${player === 'Player 2' && 'isTurn'}`}
        >
          {player === 'Player 2' && <FaCaretRight />}{' '}
          <span>{playerName.p2}</span>
        </span>
      </div>

      <div className='footer-bottom'>
        <div
          className={`footer-box highest-break ${
            playerData.p1 ? 'active' : ''
          }`}
        >
          <span>Highest break: {highestBreak.p1}</span>
          <div className='break-history'>
            {breakHistory.p1.map((ball, idx) => {
              return (
                <span
                  key={idx}
                  className={`break-history-ball ${ball.colour}`}
                ></span>
              );
            })}
          </div>
        </div>

        {playerData.p1 ? (
          <button className='concede'>Concede Frame</button>
        ) : (
          <div></div>
        )}

        <div
          className={`footer-box points-remaining ${
            pointsRemainingActive ? 'active' : ''
          }`}
        >
          <span>Remaining: {calculatePointsRemaining()}</span>
        </div>

        {playerData.p2 ? (
          <button className='concede'>Concede Frame</button>
        ) : (
          <div></div>
        )}

        <div
          className={`footer-box highest-break ${
            playerData.p2 ? 'active' : ''
          }`}
          style={{ alignItems: 'flex-end' }}
        >
          <span>Highest break: {highestBreak.p2}</span>
          <div className='break-history' style={{ justifyContent: 'flex-end' }}>
            {breakHistory.p2.map((ball, idx) => {
              return (
                <span
                  key={idx}
                  className={`break-history-ball ${ball.colour}`}
                ></span>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
