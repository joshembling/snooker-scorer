import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react';
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
  } = useContext(GlobalContext);

  const {
    player,
    setLastColourAfterRed,
    setBreakHistory,
    setBreakCurrent,
    setHighestBreak,
  } = useContext(PlayerContext);

  const [foulActive, setFoulActive] = useState(false);
  const [finalColourValue, setFinalColourValue] = useState(2);
  const [frameWinner, setFrameWinner] = useState({ p1: false, p2: false });
  const [concession, setConcession] = useState(false);

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

  const finishGameRef = useRef();
  finishGameRef.current = finishGame;
  /**
   * HANDLING THE GAME FINISH
   */
  useEffect(() => {
    if (finishGame) {
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
        console.log(score);
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
    console.log(e.target.value);

    if (e.target.value === 'p1') {
      setFrameWinner((prev) => ({
        ...prev,
        p2: true,
      }));
      setPlayerFrames((prev) => ({
        ...prev,
        p2: prev.p2 + 1,
      }));
      setFinishGame(true);
    } else if (e.target.value === 'p2') {
      setFrameWinner((prev) => ({
        ...prev,
        p1: true,
      }));
      setPlayerFrames((prev) => ({
        ...prev,
        p1: prev.p1 + 1,
      }));
      setFinishGame(true);
    }

    setTimeout(() => {
      startNextFrame();
    }, 3000);
  };

  // BEGIN NEXT FRAME
  const startNextFrame = () => {
    console.log('start frame');
    setFinalColours(false);
    setFinishGame(false);
    setRespot(false);
    setScore({ p1: 0, p2: 0 });
    setRedsRemaining(noOfReds);
    setLastColourAfterRed(false);
    setHighestBreak({ p1: [], p2: [] });
    setBreakHistory({ p1: [], p2: [] });
    setBreakCurrent({ p1: [], p2: [] });
    setCurrentBreak({ p1: 0, p2: 0 });
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
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
}
