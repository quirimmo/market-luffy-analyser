import LuffyWebService from './models/web-service/LuffyWebService';
import LuffyServerSocket from './models/socket/LuffyServerSocket';

const webServiceInstance: LuffyWebService = new LuffyWebService();
const webServiceSocket: LuffyServerSocket = new LuffyServerSocket(webServiceInstance);
webServiceSocket.start();
webServiceInstance.listen().subscribe(
  () => {},
  (error: any) => {
    throw new Error(`Error bootstrapping the web service ${error}`);
  }
);
