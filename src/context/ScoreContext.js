import React, { useState, createContext, useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import { PlayerContext } from './PlayerContext';

export const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const { setScore, setCurrentBreak, redsRemaining, setNextBall } =
    useContext(GlobalContext);

  const { player } = useContext(PlayerContext);

  const [foulActive, setFoulActive] = useState(false);

  const [finalColourValue, setFinalColourValue] = useState(2);

  const addScore = (e) => {
    if (player === 'Player 1') {
      setScore((prev) => ({
        ...prev,
        p1: prev.p1 + parseInt(e.target.value),
      }));
      setCurrentBreak((prev) => ({
        ...prev,
        p1: prev.p1 + parseInt(e.target.value),
      }));
    } else {
      setScore((prev) => ({
        ...prev,
        p2: prev.p2 + parseInt(e.target.value),
      }));
      setCurrentBreak((prev) => ({
        ...prev,
        p2: prev.p2 + parseInt(e.target.value),
      }));
    }

    if (redsRemaining > 0) {
      e.target.value === '1' ? setNextBall('Colour') : setNextBall('Red');
    }
  };

  return (
    <ScoreContext.Provider
      value={{
        addScore,
        foulActive,
        setFoulActive,
        finalColourValue,
        setFinalColourValue,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}
