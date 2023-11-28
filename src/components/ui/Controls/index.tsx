import TetrisBg from "./tetrisBg"

const controlItems = [
  {
    name: 'up',
    icon: <svg className="w-6 aspect-square" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="miter"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline points="17 14 12 9 7 14"></polyline></g></svg>,
    desc: 'rotate'
  },
  {
    name: 'down',
    icon: <svg className="w-6 aspect-square" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="miter"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline points="7 10 12 15 17 10"></polyline></g></svg>,
    desc: 'fast drop'
  },
  {
    name: 'left',
    icon: <svg className="w-6 aspect-square" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="miter"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline points="13 7 8 12 13 17"></polyline></g></svg>,
    desc: 'move left'
  },
  {
    name: 'right',
    icon: <svg className="w-6 aspect-square" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="miter"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><polyline points="11 17 16 12 11 7"></polyline></g></svg>,
    desc: 'move right'
  },
  {
    name: 'circle',
    icon: <svg className="w-6 aspect-square" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="32" cy="32" r="24"></circle></g></svg>,
    desc: 'hard drop'
  },
  {
    name: 'enter',
    icon: <p className=" text-lg pl-1">&#x23CE;</p>,
    desc: 'start game'
  },
]

const Controls = () => {

  return  (
    <div className='relative w-full h-full flex flex-col items-center justify-center text-xs'>
          <p className="relative text-left mr-20">🎮<span className="text-xl"> How to Play: </span><br />
            - Use arrow keys to move and rotate tetrominoes. <br />
            - Press the spacebar for a hard drop. <br />
            - Complete horizontal lines to clear and score points. <br />
            - Challenge yourself to achieve high scores and levels.
          </p>
          <br /><br /><br />
        <div className="w-full flex flex-col items-center justify-center space-y-1">
          {controlItems.map((items) => (
            <div key={items.name} className="w-full relative z-10 text-left grid grid-cols-8 items-center gap-5">
            <span className="col-span-1">{items.icon}</span>
            <span className="col-span-7">{items.desc}</span>
          </div>
          ))}
        </div>
          <TetrisBg />
    </div>
  )
}

export default Controls