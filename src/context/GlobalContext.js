import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ bestOfFrames, setBestOfFrames, children }) {
  const [playerName, setPlayerName] = useState({
    p1: 'Player 1',
    p2: 'Player 2',
  });
  const [playerFrames, setPlayerFrames] = useState({
    p1: 0,
    p2: 0,
  });
  const [noOfReds, setNoOfReds] = useState(15);
  const [redsRemaining, setRedsRemaining] = useState(15);

  console.log(noOfReds);
  console.log(redsRemaining);

  const [score, setScore] = useState({
    p1: 0,
    p2: 0,
  });

  const [currentBreak, setCurrentBreak] = useState({
    p1: 0,
    p2: 0,
  });

  const [nextBall, setNextBall] = useState('Red');

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
        playerFrames,
        setPlayerFrames,
        noOfReds,
        setNoOfReds,
        handleFreeBall,
        bestOfFrames,
        setBestOfFrames,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
