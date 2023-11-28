import { FC, MouseEvent } from 'react';

interface DPadProps {
  direction: string;
  onClick?: () => void; // Define an optional callback prop
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  icon?: React.ReactNode;
}

export const DPad: FC<DPadProps> = ({ direction, onClick, onMouseDown, onMouseUp, onTouchStart, onTouchEnd, icon }) => {
  const handleHover = (e: MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.style.background = 'hover:bg-gray-300';
  };

  const handleLeave = (e: MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.style.background = 'bg-white/80';
  };

  const handleClick = () => {
    // Call the onClick prop if it's provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <span
      className={`bg-white/80 ${direction} text-lg text-black w-[35%] aspect-square rounded shadow-2xl drop-shadow-lg select-none cursor-pointer`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick} // Attach onClick handler
      onMouseDown={onMouseDown} // Attach onMouseDown handler
      onMouseUp={onMouseUp} // Attach onMouseUp handler
      onTouchStart={onTouchStart} // Attach onTouchStart handler
      onTouchEnd={onTouchEnd} // Attach onTouchEnd handler
      draggable={false}
    >
      {icon}
    </span>
  );
};
