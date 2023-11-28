import { HIDDEN_ROWS } from "../../../constants/tetris.constants";
import { isTetriminoInPosition } from "../../../helpers";
import { useTetris } from "../../../hooks/useTetris.hook";
import { BoardPoint } from "../../../types/tetris.types";
import Cell from "./Cell";


const TetrisBoard = (): JSX.Element => {
  const gameState = useTetris();

  // show paused ui conditionally
  return (
    <div className="h-full flex flex-col relative ">
      {gameState.paused && <div className="z-[200] absolute w-full h-full bg-black/30 backdrop-blur-sm flex justify-center items-center"><p className="text-4xl font-bold uppercase">paused</p></div>}
      {gameState.placedTetrominos.map((row, rowIndex) => {
        if (rowIndex < HIDDEN_ROWS) return null;
        return (
          <div key={`row-${rowIndex}`} className="flex flex-1">
            {row.map((cell, colIndex) => {
              const point = { row: rowIndex, col: colIndex } as BoardPoint;
              if (
                isTetriminoInPosition(gameState.activeTetromino.position, point)
              ) {
                return (
                  <div key={`active-tetromino-${rowIndex}-${colIndex}`} className="flex-1 ">
                    <Cell tetromino={gameState.activeTetromino.type} />
                  </div>
                );
              } else {
                if (
                  isTetriminoInPosition(
                    gameState.activeTetromino.projectedPlacePosition,
                    point
                  )
                ) {
                  return (
                    <div key={`projected-place-position-${rowIndex}-${colIndex}`} className="flex-1 text-center">
                      <Cell
                        tetromino={gameState.activeTetromino.type}
                        isProjection
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={`cell-${rowIndex}-${colIndex}`} className="flex-1 text-center">
                      <Cell tetromino={cell.tetromino} />
                    </div>
                  );
                }
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TetrisBoard;
