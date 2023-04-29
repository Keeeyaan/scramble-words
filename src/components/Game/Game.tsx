import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../connections/socket';

import GameChatBar from './GameSideBar';
import ScrambleGame from './ScrambleGame';

interface GameProps {
  playerName: string;
}

const Game = ({ playerName }: GameProps) => {
  const [messages, setMessages] = useState<
    { message: string; name: string; id: string }[]
  >([]);
  const [players, setPlayers] = useState<string[]>([]);

  const connectedRef = useRef(true);
  const { gameId } = useParams();

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
    socket.on('recieve-message', handleMessageReceived);
    socket.on('player-joined', handlePlayerJoined);

    return () => {
      socket.off('recieve-message', handleMessageReceived);
      socket.off('player-joined', handlePlayerJoined);
    };
  }, [socket]);

  const totalPlayers = players.length;
  const radius = 120 + 10 * (totalPlayers - 1);
  const angle = 360 / totalPlayers; // Angle between each player

  return (
    <>
      <div className="h-screen w-full flex justify-between">
        <div className="w-full h-screen relative">
          {/* <ScrambleGame /> */}

          {players.map((player, index) => {
            const rotateAngle = angle * index;
            const translateX = Math.cos((rotateAngle * Math.PI) / 180) * radius;
            const translateY = Math.sin((rotateAngle * Math.PI) / 180) * radius;
            return (
              <div
                key={player}
                style={{
                  transform: `translate(${translateX}px, ${translateY}px)`,
                }}
                className="absolute top-[47%] left-[47%]"
              >
                <div
                  className={`w-20 h-20 rounded-full bg-gray-300 flex justify-center items-center text-center`}
                >
                  <h1 className="text-md font-bold text-gray-800">{player}</h1>
                </div>
              </div>
            );
          })}
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
