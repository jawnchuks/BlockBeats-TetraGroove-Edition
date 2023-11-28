import {useState, useEffect} from "react";
import TetrisBoard from "../../ui/TetrisBoard";

import {
  EMPTY_DISPLAY_CELLS_3x3,
  EMPTY_DISPLAY_CELLS_4x3,
  ROTATION_MATRIX,
} from "../../../constants/tetris.constants";
import { isTetriminoInPosition } from "../../../helpers";
import { useTetris, useTetrisActions } from "../../../hooks/useTetris.hook";
import Cell from "../../ui/TetrisBoard/Cell";

const GameScreen = () => {
  const gameState = useTetris();
  const {  pause, exit, resume } =
    useTetrisActions();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds() % 2 === 0 ? ":" : " ";
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${hours}${seconds}${minutes} ${ampm}`;
  };

  const EmptyDisplayCells =
    gameState.nextTetrominos[0] === "I" || gameState.nextTetrominos[0] === "O"
      ? EMPTY_DISPLAY_CELLS_4x3
      : EMPTY_DISPLAY_CELLS_3x3;

  return (
    <div className="w-full h-full relative grid grid-cols-6 gap-0 rounded-xl">
      <div className=" col-span-4  rounded-l-xl border-2 border-purple-700 overflow-hidden h-full">
        <TetrisBoard />
      </div>
      <div className="col-span-2 w-full h-full rounded-r-xl bg-gradient-to-b from-pink-800/50 to bg-purple-700/50  p-2 relative">
        <div className=" flex flex-col items-start justify-center gap-2 text-xs">
          <h3 className="text-xl uppercase font-bold">{formatTime(currentTime)}</h3>
          <div className="w-full">
            <p>Next:</p>
              <div className="flex items-center justify-center bg-black/20 border border-black/30 w-fit mx-auto transform rotate-90 h-[6.5rem] p-1 rounded-sm text-sm text-center">
                <div
                  className={`flex ${
                    gameState.nextTetrominos[0] !== "I" &&
                    gameState.nextTetrominos[0] !== "O"
                      ? "w-full"
                      : "w-full "
                  }`}
                >
                  {EmptyDisplayCells.map((row, rowIndex) => (
                    <div
                      key={`next-tetromino-row-${rowIndex}`}
                      className=" w-[1.2rem] aspect-square relative"
                    >
                      {row.map((_col, colIndex) => (
                        <div
                          key={`next-tetromino-cell-${rowIndex}-${colIndex}`}
                          className="flex aspect-square mx-auto"
                        >
                          {isTetriminoInPosition(
                            [
                              {
                                row: ROTATION_MATRIX[
                                  gameState.nextTetrominos[0]
                                ][0][0][0],
                                col: ROTATION_MATRIX[
                                  gameState.nextTetrominos[0]
                                ][0][0][1],
                              },
                              {
                                row: ROTATION_MATRIX[
                                  gameState.nextTetrominos[0]
                                ][1][0][0],
                                col: ROTATION_MATRIX[
                                  gameState.nextTetrominos[0]
                                ][1][0][1],
                              },
                              {
                                row: ROTATION_MATRIX[
                                  gameState.nextTetrominos[0]
                                ][2][0][0],
                                col: ROTATION_MATRIX[
                                  gameState.nextTetrominos[0]
                                ][2][0][1],
                              },
                              {
                                row: ROTATION_MATRIX[
                                  gameState.nextTetrominos[0]
                                ][3][0][0],
                                col: ROTATION_MATRIX[
                                  gameState.nextTetrominos[0]
                                ][3][0][1],
                              },
                            ],
                            {
                              row: rowIndex,
                              col: colIndex,
                            }
                          ) && <Cell tetromino={gameState.nextTetrominos[0]} />}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
          </div>
          <div className="w-full">
            <p>Level:</p>
            <span className="bg-black/20 border border-black/30 w-full h-[2rem] font-bold flex items-center p-1 rounded-sm text-sm">
              {gameState.level}
            </span>
          </div>
          <div className="w-full">
            <p>Score:</p>
            <span className="bg-black/20 border border-black/30 w-full h-[2rem] font-bold flex items-center p-1 rounded-sm text-sm">
              {gameState.score}
            </span>
          </div>
        </div>
        <div className="absolute bottom-4 inset-x-0 flex flex-col items-center justify-center gap-2">
          {gameState.paused ? (
            // 
            <button onClick={resume} className="w-2/3 px-6 py-1 text-xs text-black border bg-white/90 rounded-full">
            play
          </button>
          ) : (
            <button onClick={pause} className="w-2/3 px-6 py-1 text-xs text-black border bg-white/90 rounded-full">
            pause
          </button>
          )}
          <button onClick={exit} className="w-2/3 px-6 py-1 text-xs  text-black border bg-white/90 rounded-full">
            exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
