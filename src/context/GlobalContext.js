import React, { useState, createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const GlobalContext = createContext();

export function GlobalProvider({
  bestOfFrames,
  setBestOfFrames,
  finishMatch,
  setFinishMatch,
  children,
}) {
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

  // const [score, setScore] = useState({
  //   p1: 0,
  //   p2: 0,
  // });

  const [score, setScore] = useLocalStorage('SCORE', {
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

  const [mistake, setMistake] = useState(false);

  const [matchWinner, setMatchWinner] = useState({ p1: false, p2: false });

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
        finishMatch,
        setFinishMatch,
        matchWinner,
        setMatchWinner,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
