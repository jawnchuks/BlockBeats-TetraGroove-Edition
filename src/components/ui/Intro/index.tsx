import TetrisLogo from '../../../../public/icon512_maskable.png'
import {  useTetrisActions } from '../../../hooks/useTetris.hook';


const Intro = () => {
  // const gameState = useTetris();
   const {  start } =
    useTetrisActions();
  return  (
    <div className='relative w-full h-full p-6 flex flex-col items-center justify-center'>
        <div className="absolute inset-0 z-3 backdrop-blur" />
        <div className="w-full relative z-10 text-center flex flex-col gap-10">
            <h1 className='text-4xl uppercase font-bold text-white'>BlockBeats</h1>
            <img src={TetrisLogo} alt='logo' className='w-[10rem] aspect-square mx-auto rounded-md' />
            <h2 className='text-3xl uppercase font-bold text-transparent bg-gradient-to-b from-pink-800 to bg-purple-700 bg-clip-text'>TetraGroove <br /> Edition</h2>
            <div className="flex flex-col gap-5">
                <button onClick={start} className='w-2/3 md:w-1/2 mx-auto px-6 py-2 border-white bg-white/70 text-black font-light text-base rounded-md'>Play</button>
            </div>
        </div>
         <footer className='absolute bottom-2 text-xs text-white/70 text-center w-full'>shoutout to <a className='underline' href="/">jawnchuks</a></footer>
    </div>
  )
}

export default Intro