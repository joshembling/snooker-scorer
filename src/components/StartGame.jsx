import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const StartGame = ({ setStartGame }) => {
  const { playerName, setPlayerName, bestOfFrames, setBestOfFrames } =
    useContext(GlobalContext);

  console.log(playerName);

  return (
    <>
      <header>
        <h2>Welcome to Snooker Scorer</h2>
        <p>
          Enter the player names and the amount of frames you want to play start
          scoring!
        </p>
      </header>
      <section className='startGame'>
        <div className='startGame__control'>
          <label htmlFor='player1'>Player 1 Name:</label>
          <input
            type='text'
            id='player1'
            onChange={(e) =>
              setPlayerName((prev) => ({
                ...prev,
                p1: e.target.value.toUpperCase(),
              }))
            }
            value={playerName.p1}
          />
        </div>
        <div className='startGame__control'>
          <label htmlFor='player2'>Player 2 Name:</label>
          <input
            type='text'
            id='player2'
            onChange={(e) =>
              setPlayerName((prev) => ({
                ...prev,
                p2: e.target.value.toUpperCase(),
              }))
            }
            value={playerName.p2}
          />
        </div>
        <div className='startGame__control'>
          <label htmlFor='bestOf'>Best of frames:</label>
          <input
            type='number'
            id='bestOf'
            onChange={(e) => setBestOfFrames(e.target.value)}
            value={bestOfFrames}
          />
        </div>
        <button id='ready' onClick={() => setStartGame(true)}>
          Start Game
        </button>
      </section>
    </>
  );
};

export default StartGame;
