import { io } from 'socket.io-client';

const CONNECTION_PORT = 'http://localhost:5000';
const socket = io(CONNECTION_PORT);
export default socket;
