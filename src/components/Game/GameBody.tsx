import { useEffect, useState } from 'react';
import { socket } from '../../connections/socket';

import ScrambleGame from './ScrambleGame';
import { useTimer } from '../../hooks/useTimer';

const GameBody = ({
  players,
  isHost,
  host,
  gameId,
}: {
  players: { id: string; name: string; lives: number }[];
  isHost: boolean;
  host: string;
  gameId?: string;
}) => {
  const [startCountdown, setStartCountdown] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('');

  const totalPlayers = players.length;
  const radius = 120 + 10 * (totalPlayers - 1);
  const angle = 360 / totalPlayers; // Angle between each player

  const { seconds } = useTimer({
    startTime: 10,
    startCountdown: startCountdown,
  });

  useEffect(() => {
    if (startCountdown) {
      socket.emit('start-game-countdown', { duration: seconds, gameId });
    }
  }, [startCountdown, seconds]);

  useEffect(() => {
    const handleCountdownReceived = ({ duration, startCountdown }: any) => {
      console.log(duration);
      setStartCountdown(startCountdown);
      if (duration === 0) {
        socket.emit('game-start', gameId);
      }
    };

    const handleGameStartReceived = ({ gameStarted, initialPlayer }: any) => {
      setGameStarted(gameStarted);
      setCurrentPlayer(initialPlayer);
    };

    const handleTurnChange = ({ nextPlayer }: { nextPlayer: string }) => {
      console.log(nextPlayer);
      setCurrentPlayer(nextPlayer);
    };

    socket.on('recieve-start-game-countdown', handleCountdownReceived);
    socket.on('recieve-game-start', handleGameStartReceived);
    socket.on('recieve-next-turn', handleTurnChange);

    return () => {
      socket.off('recieve-start-game-countdown', handleCountdownReceived);
      socket.off('recieve-game-start', handleGameStartReceived);
      socket.off('recieve-next-turn', handleTurnChange);
    };
  }, []);

  const handleTurnComplete = () => {
    socket.emit('turn-complete', gameId);
  };

  return (
    <>
      {seconds > 0 && startCountdown && (
        <div className="w-full bg-green-500 h-18 flex items-center justify-center p-4">
          <p className="text-white text-xl font-bold">
            Game Starting: {seconds}
          </p>
        </div>
      )}
      {players.map((player, index) => {
        const rotateAngle = angle * index;
        const translateX = Math.cos((rotateAngle * Math.PI) / 180) * radius;
        const translateY = Math.sin((rotateAngle * Math.PI) / 180) * radius;
        return (
          <div
            key={player.name}
            style={{
              transform: `translate(${translateX}px, ${translateY}px)`,
            }}
            className="absolute top-[47%] left-[47%]"
          >
            <div
              className={`w-20 h-20 rounded-full bg-gray-300 flex justify-center items-center text-center`}
            >
              <h1 className="text-md font-bold text-gray-800">{player.name}</h1>
            </div>
          </div>
        );
      })}
      {gameStarted && currentPlayer === socket.id && (
        <ScrambleGame handleTurnComplete={handleTurnComplete} />
      )}
      {isHost &&
        socket.id === host &&
        players.length > 1 &&
        !startCountdown && (
          <div className="flex justify-center m-5">
            <button
              onClick={() => setStartCountdown(true)}
              className="py-2 px-4 bg-green-400 text-white  font-bold rounded"
            >
              Start
            </button>
          </div>
        )}
    </>
  );
};

export default GameBody;
