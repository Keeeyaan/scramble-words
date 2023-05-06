import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../../connections/socket';

import GameChatBar from './GameSideBar';
import GameBody from './GameBody';

interface GameProps {
  playerName: string;
}

const Game = ({ playerName }: GameProps) => {
  const [messages, setMessages] = useState<
    { message: string; name: string; id: string }[]
  >([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [host, setHost] = useState(false);

  const connectedRef = useRef(true);
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.open();

    if (connectedRef.current) {
      connectedRef.current = false;
      socket.emit('join-game', { gameId, playerName });
    }

    return () => {
      socket.off('recieve-message');
      socket.close();
    };
  }, [gameId, playerName]);

  useEffect(() => {
    const handleMessageReceived = (message: any) => {
      setMessages((prevMessage) => [...prevMessage, message]);
    };

    const handlePlayerJoined = (data: { players: string[] }) => {
      setPlayers(data.players);
    };

    const handleRoomNotFound = (status: string) => {
      console.log(status);
      navigate('/');
    };

    const handleHost = () => {
      setHost(true);
    };

    socket.on('recieve-message', handleMessageReceived);
    socket.on('player-joined', handlePlayerJoined);
    socket.on('room-not-found', handleRoomNotFound);
    socket.on('host', handleHost);

    return () => {
      socket.off('recieve-message', handleMessageReceived);
      socket.off('player-joined', handlePlayerJoined);
      socket.off('room-not-found', handleRoomNotFound);
      socket.off('host', handleHost);
    };
  }, [socket]);

  return (
    <>
      <div className="h-screen w-full flex justify-between">
        <div className="w-full h-screen relative">
          <GameBody players={players} host={host} />
        </div>
        <GameChatBar
          playerName={playerName}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </>
  );
};

export default Game;
