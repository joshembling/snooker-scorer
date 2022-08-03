import React, { useState, createContext, useContext } from 'react';

import { GlobalContext } from './GlobalContext';

export const PlayerContext = createContext();

export function PlayerProvider({ finalColours, setFinalColours, children }) {
  const [player, setPlayer] = useState('Player 1');

  // BREAKS
  const [highestBreak, setHighestBreak] = useState({ p1: 0, p2: 0 });
  const [breakHistory, setBreakHistory] = useState({ p1: [], p2: [] });
  const [breakCurrent, setBreakCurrent] = useState({ p1: [], p2: [] });

  // LAST COLOURS
  const [lastColourAfterRed, setLastColourAfterRed] = useState(false);

  const {
    currentBreak,
    setCurrentBreak,
    redsRemaining,
    setNextBall,
    setMistake,
    freeBall,
    setFreeBall,
  } = useContext(GlobalContext);

  const changePlayer = () => {
    if (player === 'Player 1') {
      setPlayer('Player 2');
      setCurrentBreak((prev) => ({ ...prev, p1: 0 }));

      if (currentBreak.p1 > highestBreak.p1) {
        setHighestBreak((prev) => ({ ...prev, p1: currentBreak.p1 }));
        setBreakHistory((prev) => ({ ...prev, p1: breakCurrent.p1 }));
      }

      setBreakCurrent((prev) => ({ ...prev, p1: [] }));
    } else {
      setPlayer('Player 1');
      setCurrentBreak((prev) => ({ ...prev, p2: 0 }));

      if (currentBreak.p2 > highestBreak.p2) {
        setHighestBreak((prev) => ({ ...prev, p2: currentBreak.p2 }));
        setBreakHistory((prev) => ({ ...prev, p2: breakCurrent.p2 }));
      }

      setBreakCurrent((prev) => ({ ...prev, p2: [] }));

      if (redsRemaining > 0) {
        setNextBall('Red');
      }

      setMistake(false);
      freeBall && setFreeBall(false);
    }

    lastColourAfterRed && setFinalColours(true);
  };

  const addBreakHistory = (e) => {
    if (player === 'Player 1') {
      setBreakCurrent((prev) => ({
        ...prev,
        p1: [
          ...prev.p1,
          {
            colour: e.target.getAttribute('colour'),
            value: e.target.value,
          },
        ],
      }));
    } else {
      setBreakCurrent((prev) => ({
        ...prev,
        p2: [
          ...prev.p2,
          {
            colour: e.target.getAttribute('colour'),
            value: e.target.value,
          },
        ],
      }));
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        changePlayer,
        addBreakHistory,
        highestBreak,
        breakHistory,
        setBreakHistory,
        breakCurrent,
        setBreakCurrent,
        lastColourAfterRed,
        setLastColourAfterRed,
        finalColours,
        setFinalColours,
        setHighestBreak,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
