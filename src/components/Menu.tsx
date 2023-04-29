import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../connections/socket';

const Menu = ({ playerName, setPlayerName }: any) => {
  const navigate = useNavigate();
  const nameInputRef = useRef<any>();

  const handleCreateNewGame = () => {
    const newGameRoomId = uuidv4();
    const nameInput = nameInputRef.current.value;

    if (nameInput) {
      setPlayerName(nameInput);
    }

    socket.emit('createNewGame', newGameRoomId);
    navigate(`/${newGameRoomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Scrambled Words Game
      </h1>
      <div className="justify-center gap-4 p-4 rounded w-[350px] flex flex-col">
        <input
          ref={nameInputRef}
          className="p-2 rounded border font-medium"
          placeholder={playerName}
        />
        <button
          className="bg-green-600 text-white text-2xl font-bold py-2 px-8 rounded transition-all hover:bg-green-500"
          onClick={handleCreateNewGame}
        >
          Play!
        </button>
      </div>
    </div>
  );
};

export default Menu;
