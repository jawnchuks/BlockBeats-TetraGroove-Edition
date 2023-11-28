import {useState, useEffect} from "react";
import Controls from "../../ui/Controls";


type GameContainerProps = {
  children: JSX.Element;
};

const GameContainer = ({ children }: GameContainerProps) => {
  
const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen size is mobile
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };

    // Initial check on mount
    checkIsMobile();

    // Attach the event listener to respond to changes in screen size
    window.addEventListener("resize", checkIsMobile);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  

  return (
    <div className="w-screen h-screen p-0 md:p-2 relative bg-[url('/public/images/tetris.jpg')] bg-fixed bg-cover bg-no-repeat bg-center">
      <div className="relative z-5 max-w-[430px] min-w-[320px] h-full mx-auto flex flex-col items-center justify-center shadow-2xl rounded-md bg-gradient-to-b  from-black/70 to bg-transparent  backdrop-blur border-4 border-purple-700">
        {children}
      </div>

      {/* DESKTOP SCREENS ONLY */}
      {/* if screen size is above mobile devices, show desktop controls div conditional rendering */}
      <div
        className={`desktop-controls  ${
          isMobile
            ? "hidden"
            : "z-2 absolute left-[5%] top-0 w-[400px]  my-2 flex flex-col items-center justify-center border-0 rounded-lg bg-black/70 p-4"
        }`}
      >
        <span className="text-xs flex flex-col space-y-4">
          <p className="uppercase text-sm">🕹️ BlockBeats: Tetragroove Edition 🕹️</p>
          <p>🛠️ Built With: <br />
            - React: Front-end library for building user interfaces. <br />
            - TypeScript: Adds static typing to JavaScript for improved development experience. <br />
            - Hooks and Context API: Utilized for state management in React components. <br />
            - Rainbow Tetromino Colors: A vibrant twist with a rainbow color scheme for each tetromino.
          </p>
          <p>🔗 Connect with me: <br />
            <a className="text-green-500 underline" href="">Linkedin Profile</a>
          </p>
          <p>👨‍💻 Source Code: <br />
            <a className="text-green-500 underline" href="">Github link</a>
          </p>
          <p>Have fun playing! 🎉 </p>
        </span>
      </div>
      <div
        className={`desktop-controls  ${
          isMobile
            ? "hidden"
            : "z-2 absolute left-[5%] bottom-0 w-[400px] h-fit my-2 flex flex-col items-center justify-center border-0 rounded-lg bg-black/70 p-4"
        }`}
      >
        <Controls />
      </div>
    </div>
  );
};

export default GameContainer;
