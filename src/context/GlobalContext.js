import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [playerName, setPlayerName] = useState({
    p1: 'Player 1',
    p2: 'Player 2',
  });
  const [playerFrames, setPlayerFrames] = useState({
    p1: 0,
    p2: 0,
  });
  const [bestOfFrames, setBestOfFrames] = useState(3);
  const [noOfReds, setNoOfReds] = useState(15);

  const [score, setScore] = useState({
    p1: 0,
    p2: 0,
  });

  const [currentBreak, setCurrentBreak] = useState({
    p1: 0,
    p2: 0,
  });

  const [nextBall, setNextBall] = useState('Red');
  const [redsRemaining, setRedsRemaining] = useState(15);

  const [freeBall, setFreeBall] = useState(false);
  const handleFreeBall = (e) => {
    setFreeBall(false);
    setNextBall('Colour');
  };

  // mistake
  const [mistake, setMistake] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        score,
        setScore,
        currentBreak,
        setCurrentBreak,
        nextBall,
        setNextBall,
        redsRemaining,
        setRedsRemaining,
        mistake,
        setMistake,
        freeBall,
        setFreeBall,
        playerName,
        setPlayerName,
        bestOfFrames,
        setBestOfFrames,
        playerFrames,
        setPlayerFrames,
        noOfReds,
        setNoOfReds,
        handleFreeBall,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
