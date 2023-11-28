import{ FC, MouseEvent } from 'react';

interface OPadProps {
  onClick?: () => void; // Define an optional callback prop
}

export const OPad: FC<OPadProps> = ({ onClick }) => {
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
      className="bg-white/80 w-3/4 aspect-square rounded-full shadow-2xl drop-shadow-lg select-none cursor-pointer"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick} // Attach onClick handler
      draggable={false}
    >
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="32" cy="32" r="24"></circle></g></svg>
    </span>
  );
};

