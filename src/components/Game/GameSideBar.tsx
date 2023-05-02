import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../connections/socket';

interface Message {
  message: string;
  name: string;
  id: string;
  gameId: string;
}

const GameSideBar = ({ playerName, messages, setMessages }: any) => {
  const [message, setMessage] = useState('');
  const { gameId } = useParams();

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputMessage = e.currentTarget.value.trim();

    if (e.key === 'Enter' && inputMessage) {
      const data = {
        message,
        name: playerName,
        id: `${socket.id}${Math.random()}`,
        gameId,
      };

      socket.emit('send-message', data);
      setMessages((prevMessage: Message[]) => [...prevMessage, data]);
      return setMessage('');
    }
  };

  return (
    <>
      <div className="h-screen min-w-[400px]">
        <div className="h-[94%] bg-slate-900 p-4 items-center">
          <div className="flex flex-col gap-1">
            {messages.map((message: any) => {
              return (
                <p
                  className={`${
                    message.name === 'BOT'
                      ? 'text-yellow-200'
                      : 'text-slate-200'
                  }`}
                  key={message.id}
                >{`${message.name}: ${message.message}`}</p>
              );
            })}
          </div>
        </div>
        <input
          onKeyDown={handleSendMessage}
          onChange={(e: any) => setMessage(e.currentTarget.value)}
          value={message}
          placeholder="Type here to chat"
          className="p-4 bg-slate-950 text-white h-[6%] outline-none w-full"
        />
      </div>
    </>
  );
};

export default GameSideBar;
