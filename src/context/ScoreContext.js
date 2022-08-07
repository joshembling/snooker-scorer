import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react';
import StartGame from '../components/StartGame';
import useLocalStorage from '../hooks/useLocalStorage';

import { GlobalContext } from './GlobalContext';
import { PlayerContext } from './PlayerContext';

export const ScoreContext = createContext();

export function ScoreProvider({
  finishGame,
  setFinishGame,
  respot,
  setRespot,
  children,
  concededFrame,
  setConcededFrame,
  startGame,
  setStartGame,
}) {
  const {
    score,
    setScore,
    setCurrentBreak,
    redsRemaining,
    setRedsRemaining,
    noOfReds,
    setNextBall,
    playerFrames,
    setPlayerFrames,
    bestOfFrames,
    setMatchWinner,
    finishMatch,
    setFinishMatch,
    matchHighestBreak,
    setMatchHighestBreak,
    currentBreak,

    // shot time
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
  } = useContext(GlobalContext);

  const {
    player,
    setLastColourAfterRed,
    setBreakHistory,
    setBreakCurrent,
    setHighestBreak,
    setFinalColours,
  } = useContext(PlayerContext);

  const [foulActive, setFoulActive] = useState(false);
  const [finalColourValue, setFinalColourValue] = useLocalStorage(
    'FINAL_COLOUR_VALUE',
    2
  );
  const [finalColourPointsRemaining, setFinalColourPointsRemaining] =
    useLocalStorage('FINAL_COLOUR_POINTS_REMAINING', 27);

  const [frameWinner, setFrameWinner] = useState({ p1: false, p2: false });
  const [concession, setConcession] = useState(false);
  const [ballsPotted, setBallsPotted] = useLocalStorage('BALLS_POTTED', {
    p1: 0,
    p2: 0,
  });

  const finishGameRef = useRef();
  const concededFrameRef = useRef();
  finishGameRef.current = finishGame;
  concededFrameRef.current = concededFrame;

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

  const handleBallsPotted = (e) => {
    if (player === 'Player 1') {
      setBallsPotted((prev) => ({
        ...prev,
        p1: prev.p1 + 1,
      }));
    } else {
      setBallsPotted((prev) => ({
        ...prev,
        p2: prev.p2 + 1,
      }));
    }
  };

  /**
   * HANDLING THE GAME FINISH
   */
  useEffect(() => {
    if (finishGame && concededFrame === false && finishMatch === false) {
      if (score.p1 > score.p2) {
        setFrameWinner((prev) => ({
          ...prev,
          p1: true,
        }));
        setPlayerFrames((prev) => ({
          ...prev,
          p1: prev.p1 + 1,
        }));
        setRespot(false);
      } else if (score.p2 > score.p1) {
        setFrameWinner((prev) => ({
          ...prev,
          p2: true,
        }));
        setPlayerFrames((prev) => ({
          ...prev,
          p2: prev.p2 + 1,
        }));
        setRespot(false);
      } else if (score.p1 === score.p2 && concession === false) {
        setFrameWinner((prev) => ({
          ...prev,
          p1: false,
          p2: false,
        }));
        setRespot(true);
      }
    }
  }, [finishGameRef.current]);

  // CONCESSION
  const handleConcedeFrame = (e) => {
    if (e.target.value === 'p1') {
      setFrameWinner((prev) => ({
        ...prev,
        p2: true,
      }));
      setPlayerFrames((prev) => ({
        ...prev,
        p2: prev.p2 + 1,
      }));
      setConcededFrame(true);
    } else if (e.target.value === 'p2') {
      setFrameWinner((prev) => ({
        ...prev,
        p1: true,
      }));
      setPlayerFrames((prev) => ({
        ...prev,
        p1: prev.p1 + 1,
      }));
      setConcededFrame(true);
    }

    setFinishGame(true);
  };

  // BEGIN NEXT FRAME
  const startNextFrame = () => {
    setFinalColours(false);
    setFinishGame(false);
    setRespot(false);
    setScore({ p1: 0, p2: 0 });
    setRedsRemaining(noOfReds);
    setLastColourAfterRed(false);
    setFinalColourValue(2);
    // setHighestBreak({ p1: 0, p2: 0 });
    setBreakHistory({ p1: [], p2: [] });
    setBreakCurrent({ p1: [], p2: [] });
    setCurrentBreak({ p1: 0, p2: 0 });
    setConcededFrame(false);
    setConcession(false);
    setFrameWinner({ p1: false, p2: false });
    setFinalColourPointsRemaining(27);
  };

  const returnToHome = () => {
    setFinalColours(false);
    setFinishGame(false);
    setRespot(false);
    setScore({ p1: 0, p2: 0 });
    setRedsRemaining(noOfReds);
    setLastColourAfterRed(false);
    setFinalColourValue(2);
    setHighestBreak({ p1: 0, p2: 0 });
    setBreakHistory({ p1: [], p2: [] });
    setBreakCurrent({ p1: [], p2: [] });
    setCurrentBreak({ p1: 0, p2: 0 });
    setConcededFrame(false);
    setFrameWinner({ p1: false, p2: false });
    setConcession(false);
    setFinalColourPointsRemaining(27);
    setPlayerFrames({ p1: 0, p2: 0 });
    setStartGame(false);
    setFinishMatch(false);
    setFinalColourValue(2);
    setBreakHistory({ p1: [], p2: [] });
    setBreakCurrent({ p1: [], p2: [] });
    setCurrentBreak({ p1: 0, p2: 0 });
    setConcededFrame(false);
    setFrameWinner({ p1: false, p2: false });
    setFinalColourPointsRemaining(27);
    setMatchHighestBreak({ p1: 0, p2: 0 });
    setBallsPotted({ p1: 0, p2: 0 });
    setAverageShotTime({ p1: 0, p2: 0 });
  };

  const handleStartGame = () => {
    setStartGame(true);
    setFinalColours(false);
    setFinishGame(false);
    setRespot(false);
    setScore({ p1: 0, p2: 0 });
    setRedsRemaining(noOfReds);
    setLastColourAfterRed(false);
    setFinalColourValue(2);
    setHighestBreak({ p1: 0, p2: 0 });
    setBreakHistory({ p1: [], p2: [] });
    setBreakCurrent({ p1: [], p2: [] });
    setCurrentBreak({ p1: 0, p2: 0 });
    setConcededFrame(false);
    setFrameWinner({ p1: false, p2: false });
    setConcession(false);
    setFinalColourPointsRemaining(27);
    setPlayerFrames({ p1: 0, p2: 0 });
    setFinishMatch(false);
    setFinalColourValue(2);
    setBreakHistory({ p1: [], p2: [] });
    setBreakCurrent({ p1: [], p2: [] });
    setCurrentBreak({ p1: 0, p2: 0 });
    setConcededFrame(false);
    setFrameWinner({ p1: false, p2: false });
    setFinalColourPointsRemaining(27);
    setMatchHighestBreak({ p1: 0, p2: 0 });
    setAverageShotTime({ p1: 0, p2: 0 });
  };

  // check to see if max frames have been played
  useEffect(() => {
    if (parseInt(playerFrames.p1) * 2 - 1 === parseInt(bestOfFrames)) {
      setMatchWinner((prev) => ({
        ...prev,
        p1: true,
        p2: false,
      }));
      setFinishMatch(true);
    } else if (parseInt(playerFrames.p2) * 2 - 1 === parseInt(bestOfFrames)) {
      setMatchWinner((prev) => ({
        ...prev,
        p1: false,
        p2: true,
      }));
      setFinishMatch(true);
    }
  }, [playerFrames]);

  // check to see if highest break is highest of match for player

  useEffect(() => {
    if (currentBreak.p1 > matchHighestBreak.p1) {
      setMatchHighestBreak((prev) => ({
        ...prev,
        p1: currentBreak.p1,
      }));
    }

    if (currentBreak.p2 > matchHighestBreak.p2) {
      setMatchHighestBreak((prev) => ({
        ...prev,
        p2: currentBreak.p2,
      }));
    }
  }, [currentBreak]);

  // SHOT TIME HANDLING
  useEffect(() => {
    let counterID;
    if (finishGame === false && startGame === true) {
      if (player === 'Player 1') {
        counterID = setTimeout(
          () =>
            setShotTime((prev) => ({
              ...prev,
              p1: parseInt(shotTime.p1) + 1,
            })),
          1000
        );
      } else {
        counterID = setTimeout(
          () =>
            setShotTime((prev) => ({
              ...prev,
              p2: parseInt(shotTime.p2) + 1,
            })),
          1000
        );
      }
    }

    return () => {
      clearTimeout(counterID);
    };
  }, [shotTime, finishGame]);

  const handleShotTime = () => {
    if (player === 'Player 1') {
      setLatestShotTime((prev) => ({
        ...prev,
        p1: parseInt(shotTime.p1),
      }));

      setShotTime((prev) => ({
        ...prev,
        p1: parseInt(0),
      }));

      setShotsTaken((prev) => ({
        ...prev,
        p1: parseInt(prev.p1) + 1,
      }));

      setAllShotTimes((prev) => ({
        ...prev,
        p1: [...prev.p1, parseInt(shotTime.p1)],
      }));

      const calculatedShotTimeP1 = allShotTimes.p1.reduce(
        (sum, a) => sum + a,
        0
      );

      console.log(calculatedShotTimeP1);

      setAverageShotTime((prev) => ({
        ...prev,
        p1: (calculatedShotTimeP1 / shotsTaken.p1).toFixed(2),
      }));
    } else {
      setLatestShotTime((prev) => ({
        ...prev,
        p2: shotTime.p2,
      }));

      setShotTime((prev) => ({
        ...prev,
        p2: 0,
      }));

      setShotsTaken((prev) => ({
        ...prev,
        p2: parseInt(prev.p2) + 1,
      }));

      setAllShotTimes((prev) => ({
        ...prev,
        p2: [...prev.p2, parseInt(shotTime.p2)],
      }));

      const calculatedShotTimeP2 = allShotTimes.p2.reduce(
        (sum, a) => sum + a,
        0
      );

      setAverageShotTime((prev) => ({
        ...prev,
        p2: (calculatedShotTimeP2 / shotsTaken.p2).toFixed(2),
      }));

      console.log(calculatedShotTimeP2);
    }
  };

  return (
    <ScoreContext.Provider
      value={{
        handleStartGame,
        addScore,
        ballsPotted,
        setBallsPotted,
        handleBallsPotted,
        foulActive,
        setFoulActive,
        finalColourValue,
        setFinalColourValue,
        finishGame,
        setFinishGame,
        respot,
        setRespot,
        frameWinner,
        startNextFrame,
        handleConcedeFrame,
        setConcession,
        setFrameWinner,
        returnToHome,
        finalColourPointsRemaining,
        setFinalColourPointsRemaining,
        handleShotTime,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}
