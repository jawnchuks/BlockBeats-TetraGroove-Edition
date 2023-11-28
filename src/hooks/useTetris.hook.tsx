"use client";

import React, {
  useEffect,
  useReducer,
  useContext,
  useCallback,
  createContext,
} from "react";
import { checkTetrominoLocked, getInitialGameState, hardDropTetromino, moveTetromino, moveTetrominoDown, placeLockedTetromino, registerCallback, rotateTetromino, startGame } from "../helpers/logic";
import { getTickTime } from "../helpers";
import { GameState, TetrisCallbackName } from "../types/tetris.types";



type TetrisActionsContext = {
  rotate: (side: "left" | "right") => void;
  move: (side: "left" | "right") => void;
  start: () => void;
  fastDrop: (active: boolean) => void;
  hardDrop: () => void;
  setScoreId: (id: string) => void;
  registerCallback: (name: TetrisCallbackName, callback: () => void) => void;
  pause: () => void;
  resume: () => void;
  exit: () => void;
};

const TetrisGameStateContext = createContext<GameState>(null!);
const TetrisActionsContext = createContext<TetrisActionsContext>(null!);

type GameStateReducerAction = {
  type:
    | "START"
    | "ROTATE"
    | "MOVE"
    | "TICK"
    | "FAST_DROP"
    | "HARD_DROP"
    | "SET_SCORE_ID"
    | "REGISTER_CALLBACK"
    | "PAUSE"  
    | "RESUME"  
    | "EXIT";  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

const gameStateReducer = (
  state: GameState,
  action: GameStateReducerAction
): GameState => {
  switch (action.type) {
    case "START":
      if (state.started) return state;
      return startGame(state);

    case "FAST_DROP":
      if (!state.started) return state;
      return {
        ...state,
        fastDrop: action.payload,
      };

    case "HARD_DROP":
      if (!state.started) return state;
      return hardDropTetromino(state);

    case "MOVE":
      if (!state.started) return state;
      return moveTetromino(state, action.payload);

    case "ROTATE":
      if (!state.started) return state;
      return rotateTetromino(state, action.payload);

    case "REGISTER_CALLBACK":
      return registerCallback(
        state,
        action.payload.name,
        action.payload.callback
      );

    case "SET_SCORE_ID":
      return {
        ...state,
        scoreId: action.payload,
      };

    case "TICK":
      if (!state.started) return state;
      return checkTetrominoLocked(
        placeLockedTetromino(moveTetrominoDown(state))
      );

      case "PAUSE":
  return {
    ...state,
    paused: true,  
  };

  case "RESUME":
  return {
    ...state,
    paused: false,
  };

case "EXIT":
  return {
    ...state,
    started: false,
    gameOver: true,
  };
    default:
      return state;
  }
};

let tickInterval: NodeJS.Timeout;

export const TetrisProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [gameState, dispatchGameStateAction] = useReducer(
    gameStateReducer,
    getInitialGameState()
  );

  useEffect(() => {
    if (gameState.paused) {
    // Handle pausing the game (e.g., show modal)
    // You might want to dispatch an action to open a modal here
    return;
    }
    if (tickInterval) clearInterval(tickInterval);
    if (gameState.lockDelay) {
      setTimeout(() => {
        dispatchGameStateAction({ type: "TICK" });
      }, 500);
    } else {
      dispatchGameStateAction({ type: "TICK" });
      tickInterval = setInterval(() => {
        dispatchGameStateAction({ type: "TICK" });
      }, getTickTime(gameState.level, gameState.fastDrop));
    }
    return () => {
      clearInterval(tickInterval);
    };
  }, [
    gameState.paused,
    gameState.level,
    gameState.fastDrop,
    gameState.lockDelay,
    dispatchGameStateAction,
  ]);

  const rotate = useCallback(
    (side: "left" | "right") => {
      dispatchGameStateAction({
        type: "ROTATE",
        payload: side,
      });
    },
    [dispatchGameStateAction]
  );

  const move = useCallback(
    (side: "left" | "right") => {
      dispatchGameStateAction({
        type: "MOVE",
        payload: side,
      });
    },
    [dispatchGameStateAction]
  );

  const start = useCallback(() => {
    dispatchGameStateAction({ type: "START" });
  }, [dispatchGameStateAction]);

  const fastDrop = useCallback(
    (active: boolean) => {
      dispatchGameStateAction({ type: "FAST_DROP", payload: active });
    },
    [dispatchGameStateAction]
  );

  const hardDrop = useCallback(() => {
    dispatchGameStateAction({ type: "HARD_DROP" });
  }, [dispatchGameStateAction]);

  const registerCallback = useCallback(
    (name: TetrisCallbackName, callback: () => void) => {
      dispatchGameStateAction({
        type: "REGISTER_CALLBACK",
        payload: { name, callback },
      });
    },
    [dispatchGameStateAction]
  );

  const setScoreId = useCallback(
    (id: string) => {
      dispatchGameStateAction({
        type: "SET_SCORE_ID",
        payload: id,
      });
    },
    [dispatchGameStateAction]
  );

  const pause = useCallback(() => {
  dispatchGameStateAction({ type: "PAUSE" });
}, [dispatchGameStateAction]);

const resume = useCallback(() => {
  dispatchGameStateAction({ type: "RESUME" });
}, [dispatchGameStateAction]);

const exit = useCallback(() => {
  dispatchGameStateAction({ type: "EXIT" });
}, [dispatchGameStateAction]);

  return (
    <TetrisGameStateContext.Provider value={gameState}>
      <TetrisActionsContext.Provider value={{ exit, pause, resume, rotate, move, start, fastDrop, hardDrop, registerCallback, setScoreId }}>
        {children}
      </TetrisActionsContext.Provider>
    </TetrisGameStateContext.Provider>
  );
};

export const useTetris = (): GameState => {
  const gameState = useContext(TetrisGameStateContext);
  return gameState;
};

export const useTetrisActions = () => {
  const { rotate, move, start, fastDrop, hardDrop, registerCallback, setScoreId, pause, exit, resume } =
    useContext(TetrisActionsContext);
  return { rotate, move, start, fastDrop, hardDrop, registerCallback, setScoreId, pause, exit, resume };
};
