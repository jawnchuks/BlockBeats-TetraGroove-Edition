export type BoardPoint = {
  row: number;
  col: number;
};

export type Tetromino = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
export type TetrominoRotationTestName =
  | "0>>1"
  | "1>>2"
  | "2>>3"
  | "3>>0"
  | "0>>3"
  | "3>>2"
  | "2>>1"
  | "1>>0";
export type TetrominoRotationTestsBattery = {
  [key in TetrominoRotationTestName]: Array<[number, number]>;
};
export type TetrominoRotationTests = {
  [key in Tetromino]: TetrominoRotationTestsBattery;
};
export type TetrominoPosition = [BoardPoint, BoardPoint, BoardPoint, BoardPoint];

export type BoardCell = {
  tetromino: Tetromino | null;
};

export type BoardRow = [
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell,
  BoardCell
];

export type Board = [
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow,
  BoardRow
];

export type TetrominoRotation = 0 | 1 | 2 | 3;

export type ActiveTetromino = {
  type: Tetromino;
  rotation: TetrominoRotation;
  position: TetrominoPosition;
  projectedPlacePosition: TetrominoPosition;
};

export type TetrisCallbackName =
  | "onMove"
  | "onRotate"
  | "onHardDrop"
  | "onSRSTrick"
  | "onGameOver"
  | "onPlace"
  | "onClear"
  | "onTetris";

export type TetrisCallbacks = { [key in TetrisCallbackName]: () => void | null };

export type GameState = {
  started: boolean;
  paused: boolean;
  gameOver: boolean;
  scoreId: string | null;
  level: number;
  levelProgress: number;
  callbacks: TetrisCallbacks;
  score: number;
  lockDelay: boolean;
  fastDrop: boolean;
  activeTetromino: ActiveTetromino;
  placedTetrominos: Board;
  nextTetrominos: Tetromino[];
};
