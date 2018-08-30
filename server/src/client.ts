import io from 'socket.io-client';

const socket: SocketIOClient.Socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Socket client connected with id: ', socket.id);
});
socket.on('message', (data: any) => {
  console.log('Client: message received', data);
  socket.emit('luffy-message', {
    action: 'getAllData'
  });
  // socket.emit('luffy-message', {
  //   action: 'getAllDataBySymbols',
  //   symbols: ['FB', 'GOOG']
  // });
  // socket.emit('luffy-message', {
  //   action: 'getAllDataBySectors',
  //   sectors: ['Technology']
  // });
});
socket.on('luffy-message', (data: any) => {
  console.log('Client: results received', data);
});
socket.on('disconnect', () => {
  console.log('Client disconnected');
});
