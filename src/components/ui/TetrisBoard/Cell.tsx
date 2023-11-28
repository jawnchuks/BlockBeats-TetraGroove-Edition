import { TETROMINO_COLORS } from "../../../constants/tetris.constants";
import { Tetromino } from "../../../types/tetris.types";

type CellProps = {
  tetromino: Tetromino | null;
  isProjection?: boolean;
};

const Cell = ({ tetromino, isProjection }: CellProps): JSX.Element => {
  const color = tetromino ? TETROMINO_COLORS[tetromino] : "";
  const isEmpty = !tetromino;

  const cellStyle = {
    border: `1px solid ${color}`,
    backgroundColor: isProjection ? "" : color,
  };

  return (
    <div className={`relative w-full h-full rounded p-0.5 ${isProjection ? "border aspect-square   border-black/5" : ""}`}>
      {!isEmpty && (
        <div style={cellStyle} className="w-full rounded-sm p-1 border aspect-square border-black/5" />
      )}
    </div>
  );
};

export default Cell;
