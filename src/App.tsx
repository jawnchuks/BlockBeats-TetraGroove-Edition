import { useEffect } from "react";
import GameContainer from "./components/layout/GameContainer";
import GameScreen from "./components/layout/GameScreen";
import Intro from "./components/ui/Intro";
import GameOver from "./components/ui/GameOver";
import { useTetris, useTetrisActions } from "./hooks/useTetris.hook";
import Controllers from "./components/layout/Controllers";
import { DPad } from "./components/layout/Controllers/DPad";
import { OPad } from "./components/layout/Controllers/OPad";


function App() {
  const pressedKeys: { [key in string]: boolean } = {};
  let moveCooldown = false;
  let moveCooldownTimeout: NodeJS.Timeout;
  let downTimeout: NodeJS.Timeout;
  const INPUT_INTERVAL = 50;
  const MOVE_COOLDOWN = 200;

  const gameState = useTetris();
  const { rotate, move, start, fastDrop, hardDrop, resume } = useTetrisActions();

  useEffect(() => {
    const interval = setInterval(() => {
      if (pressedKeys["ArrowLeft"] && !moveCooldown && !gameState.paused) move("left");
      if (pressedKeys["ArrowRight"] && !moveCooldown && !gameState.paused) move("right");
      // if (pressedKeys["ArrowUp"] && !moveCooldown && !gameState.paused) rotate("left");
      // if (pressedKeys["ArrowDown"] && !gameState.paused) fastDrop(true);
    }, INPUT_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [rotate, start, move, fastDrop, hardDrop, gameState.paused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter" && !e.repeat) {
        if (gameState.paused) {
          resume();
        } else {
          start();
        }
      }
      if (e.code === "ArrowLeft" && !e.repeat && !gameState.paused) {
        clearTimeout(moveCooldownTimeout);
        moveCooldown = true;
        moveCooldownTimeout = setTimeout(() => {
          moveCooldown = false;
        }, MOVE_COOLDOWN);
        move("left");
      }
      if (e.code === "ArrowRight" && !e.repeat && !gameState.paused) {
        clearTimeout(moveCooldownTimeout);
        moveCooldown = true;
        moveCooldownTimeout = setTimeout(() => {
          moveCooldown = false;
        }, MOVE_COOLDOWN);
        move("right");
      }
      if (e.code === "ArrowUp" && !e.repeat && !gameState.paused) rotate("left");
      if (e.code === "ArrowDown" && !gameState.paused) fastDrop(true);
      if (e.code === "Space" && !gameState.paused) hardDrop();
      pressedKeys[e.code] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys[e.code] = false;
      if (
        e.code === "ArrowLeft" ||
        e.code === "ArrowRight" ||
        e.code === "ArrowUp"
      ) {
        clearTimeout(moveCooldownTimeout);
        moveCooldown = false;
      }
      if (e.code === "ArrowDown" && !gameState.paused) fastDrop(false);
    };

    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("keyup", handleKeyUp, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
      document.removeEventListener("keyup", handleKeyUp, false);
    };
  }, [rotate, start, move, hardDrop, gameState.paused, resume]);

  const handleRotateClick = () => {
    if (!gameState.paused) {
      rotate("left");
    }
  };

  const handleMoveRightClick = () => {
    if (!gameState.paused) {
      move("right");
    }
  };

  const handleMoveLeftClick = () => {
    if (!gameState.paused) {
      move("left");
    }
  };

  const handleFastDropMouseDown = () => {
    if (!gameState.paused) {
      clearTimeout(downTimeout);
      downTimeout = setTimeout(() => {
        fastDrop(true);
      }, MOVE_COOLDOWN);
    }
  };

  const handleFastDropMouseUp = () => {
    if (!gameState.paused) {
      clearTimeout(downTimeout);
      fastDrop(false);
    }
  };

  const handleFastDropTouchStart = () => {
    if (!gameState.paused) {
      clearTimeout(downTimeout);
      downTimeout = setTimeout(() => {
        fastDrop(true);
      }, MOVE_COOLDOWN);
    }
  };

  const handleFastDropTouchEnd = () => {
    if (!gameState.paused) {
      clearTimeout(downTimeout);
      fastDrop(false);
    }
  };
  const handleHardDrop = () => {
    if (!gameState.paused) {
      hardDrop()
    }
  };

  return (
    <GameContainer>
      <div className="w-full h-full">
        {!gameState.started ? (
          <>
            {gameState.gameOver && <GameOver />}
            <Intro />
          </>
        ) : (
          <>
            <div className="flex flex-col w-full h-full p-1">
              <div className="w-full h-[60%] md:h-[85%] p-1">
                <GameScreen />
              </div>
              <div className="md:h-[25%] h-[40%] flex items-center justify-center">
                <Controllers>
                  <div className="w-full h-full grid grid-cols-2">
                    <nav className="col-span-1 w-2/4 mx-auto relative flex items-center justify-center aspect-square">
                      <OPad onClick={handleHardDrop} />
                    </nav>
                    <nav className="col-span-1 relative flex items-center justify-center w-2/4 mx-auto aspect-square border border-white/5 bg-white/20 rounded-full overflow-hidden">
                      <DPad
                        direction="up absolute top-0 rounded-b-full"
                        onClick={handleRotateClick}
                        icon={
                          <>
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="#000000"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="miter"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <polyline points="17 14 12 9 7 14"></polyline>
                              </g>
                            </svg>
                          </>
                        }
                      />
                      <DPad
                        direction="right absolute right-0 rounded-l-full"
                        onClick={handleMoveRightClick}
                        icon={
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="miter"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <polyline points="11 17 16 12 11 7"></polyline>
                            </g>
                          </svg>
                        }
                      />
                      <DPad
                        direction="left absolute left-0 rounded-r-full"
                        onClick={handleMoveLeftClick}
                        icon={
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="miter"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <polyline points="13 7 8 12 13 17"></polyline>
                            </g>
                          </svg>
                        }
                      />
                      <DPad
                        direction="down absolute bottom-0 rounded-t-full"
                        onMouseDown={handleFastDropMouseDown}
                        onMouseUp={handleFastDropMouseUp}
                        onTouchStart={handleFastDropTouchStart}
                        onTouchEnd={handleFastDropTouchEnd}
                        icon={
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="miter"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <polyline points="7 10 12 15 17 10"></polyline>
                            </g>
                          </svg>
                        }
                      />
                    </nav>
                  </div>
                </Controllers>
              </div>
            </div>
          </>
        )}

        {/* create a Music component to allow background play of music */}
        {/* <Music /> */}

        {/* create a sound effect for the game, when button is clicked,game over, gamepaused, hard drop, include all that is needed in a tetris game */}
        {/* <SoundEffects /> */}
      </div>
    </GameContainer>
  );
}

export default App;
