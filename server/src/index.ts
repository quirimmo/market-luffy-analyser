import LuffyWebService from './entities/LuffyWebService';
import LuffyServerSocket from './entities/LuffyServerSocket';

const webServiceInstance: LuffyWebService = new LuffyWebService();
const webServiceSocket: LuffyServerSocket = new LuffyServerSocket(webServiceInstance);
webServiceSocket.start();
webServiceInstance.listen().subscribe();


// =======================================================

// OLD CODE OF WEB SERVICE

// the listen will be called on the server
// app.listen(port, onWebServiceStarted);

// createServer((socket: Socket) => {
//   console.log('connected');

//   socket.on('data', function(data) {
//     console.log(data.toString());
//   });
// }).listen(5000);

// function onWebServiceStarted() {
//   console.log(`Server listening on port ${port}`);
// }
