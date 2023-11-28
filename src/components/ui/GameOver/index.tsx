
import { useTetris, useTetrisActions } from "../../../hooks/useTetris.hook";
import { useState } from "react";
import Controls from "../Controls";

function GameOver() {
  const [showControls, setShowControls] = useState(false);
  const gameState = useTetris();
 const { start } =
    useTetrisActions();

  const  handleShowControls = () => {
      setShowControls(true)
    }


  return showControls ? <div className="h-full flex items-center justify-center p-12 bg-black/20">
    <button onClick={() => setShowControls(false)} className="absolute top-5 right-5 text-lg uppercase">close</button>
    <Controls /></div> : (
       <div className='relative w-full h-full bg-black/30 p-6 flex flex-col items-center justify-center'>
        <div className="absolute inset-0 z-3 backdrop-blur" />
      
        <div className="w-full relative z-10 text-center flex flex-col gap-10">
            <h1 className='text-4xl uppercase font-bold text-white'>Game Over</h1>
            <div className="">
              Your score is: <br />
              <span className="text-xl">{gameState.score}</span>
            </div>
            <div className="flex flex-col gap-5">
                <button onClick={start} className='w-2/3 md:w-1/2 mx-auto px-6 py-2 border-white bg-white/70 text-black font-light text-base rounded-md'>Play again</button>
                <button onClick={handleShowControls} className='w-2/3 md:w-1/2 mx-auto px-6 py-2 border-white bg-white/70 text-black font-light text-base rounded-md'>Controls</button>
            </div>
            <p>close the game to quit</p>
        </div>
         <footer className='absolute bottom-2 text-xs text-white/70 text-center w-full'>shoutout to <a className='underline' href="https://www.linkedin.com/in/jawnchuks/">jawnchuks</a></footer>
    </div>
  )
}

export default GameOver