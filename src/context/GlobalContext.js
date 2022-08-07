import React, { useState, createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const GlobalContext = createContext();

export function GlobalProvider({
  bestOfFrames,
  setBestOfFrames,
  finishMatch,
  setFinishMatch,
  matchHighestBreak,
  setMatchHighestBreak,
  children,
}) {
  const [playerName, setPlayerName] = useLocalStorage('PLAYER_NAME', {
    p1: 'Player 1',
    p2: 'Player 2',
  });
  const [playerFrames, setPlayerFrames] = useLocalStorage('PLAYER_FRAMES', {
    p1: 0,
    p2: 0,
  });
  const [noOfReds, setNoOfReds] = useLocalStorage('NO_OF_REDS', 15);
  const [redsRemaining, setRedsRemaining] = useLocalStorage(
    'REDS_REMAINING',
    15
  );

  const [score, setScore] = useLocalStorage('SCORE', {
    p1: 0,
    p2: 0,
  });

  const [currentBreak, setCurrentBreak] = useLocalStorage('CURRENT_BREAK', {
    p1: 0,
    p2: 0,
  });

  const [nextBall, setNextBall] = useLocalStorage('NEXT_BALL', 'Red');

  const [freeBall, setFreeBall] = useState(false);
  const handleFreeBall = (e) => {
    setFreeBall(false);
    setNextBall('Colour');
  };

  const [mistake, setMistake] = useState(false);

  const [matchWinner, setMatchWinner] = useState({ p1: false, p2: false });

  // shot times
  const [shotTime, setShotTime] = useState({ p1: 0, p2: 0 });
  const [latestShotTime, setLatestShotTime] = useState({ p1: 0, p2: 0 });
  const [allShotTimes, setAllShotTimes] = useState({ p1: [], p2: [] });
  const [shotsTaken, setShotsTaken] = useState({ p1: 0, p2: 0 });
  const [averageShotTime, setAverageShotTime] = useLocalStorage(
    'AVERAGE_SHOT_TIME',
    { p1: 0, p2: 0 }
  );

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
        matchHighestBreak,
        setMatchHighestBreak,
        // shot times
        shotTime,
        setShotTime,
        latestShotTime,
        setLatestShotTime,
        allShotTimes,
        setAllShotTimes,
        shotsTaken,
        setShotsTaken,
        averageShotTime,
        setAverageShotTime,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
