import io from 'socket.io-client';

const URL = 'http://localhost:4000';

const socket = io(URL, { autoConnect: false });

socket.on('createdNewGame', () => {
  console.log('A new game has been created!');
});

export { socket };
