import LuffyWebService from './entities/LuffyWebService';
import LuffyServerSocket from './entities/LuffyServerSocket';

const webServiceInstance: LuffyWebService = new LuffyWebService();
const webServiceSocket: LuffyServerSocket = new LuffyServerSocket(webServiceInstance);
webServiceSocket.start();
webServiceInstance.listen().subscribe();
