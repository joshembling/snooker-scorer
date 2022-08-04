import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

import { GlobalContext } from './GlobalContext';
import { PlayerContext } from './PlayerContext';

export const ScoreContext = createContext();

export function ScoreProvider({
  finishGame,
  setFinishGame,
  respot,
  setRespot,
  setFinalColours,
  children,
  concededFrame,
  setConcededFrame,
  finishMatch,
  setFinishMatch,
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
  } = useContext(GlobalContext);

  const {
    player,
    setLastColourAfterRed,
    setBreakHistory,
    setBreakCurrent,
    setHighestBreak,
  } = useContext(PlayerContext);

  const [foulActive, setFoulActive] = useState(false);
  const [finalColourValue, setFinalColourValue] = useLocalStorage(
    'FINAL_COLOUR_VALUE',
    2
  );
  const [frameWinner, setFrameWinner] = useState({ p1: false, p2: false });
  const [concession, setConcession] = useState(false);

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

  /**
   * HANDLING THE GAME FINISH
   */
  useEffect(() => {
    if (finishGame & (concededFrame === false)) {
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

    // setTimeout(() => {
    //   startNextFrame();
    // }, 3000);
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
    setHighestBreak({ p1: [], p2: [] });
    setBreakHistory({ p1: [], p2: [] });
    setBreakCurrent({ p1: [], p2: [] });
    setCurrentBreak({ p1: 0, p2: 0 });
    setConcededFrame(false);
    setFrameWinner({ p1: false, p2: false });
  };

  useEffect(() => {
    if (parseInt(playerFrames.p1) + 1 === parseInt(bestOfFrames)) {
      setMatchWinner((prev) => ({
        ...prev,
        p1: true,
        p2: false,
      }));
      setFinishMatch(true);
    } else if (parseInt(playerFrames.p2) + 1 === parseInt(bestOfFrames)) {
      setMatchWinner((prev) => ({
        ...prev,
        p1: false,
        p2: true,
      }));
      setFinishMatch(true);
    }
  }, [playerFrames]);

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [finishMatch])

  const returnToHome = () => {
    setStartGame(false);
    setFinalColours(false);
    setFinishGame(false);
    setRespot(false);
    setScore({ p1: 0, p2: 0 });
    setRedsRemaining(noOfReds);
    setLastColourAfterRed(false);
    setFinalColourValue(2);
    setHighestBreak({ p1: [], p2: [] });
    setBreakHistory({ p1: [], p2: [] });
    setBreakCurrent({ p1: [], p2: [] });
    setCurrentBreak({ p1: 0, p2: 0 });
    setConcededFrame(false);
    setFrameWinner({ p1: false, p2: false });
  };

  return (
    <ScoreContext.Provider
      value={{
        addScore,
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
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}
