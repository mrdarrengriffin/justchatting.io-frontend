import { io } from 'socket.io-client';

class SocketService {
    socket;
    constructor(){

    }

    setupSocketConnection(){
        this.socket = io(import.meta.env.VITE_SERVER_URI);
        
        
    }
}

export default new SocketService();