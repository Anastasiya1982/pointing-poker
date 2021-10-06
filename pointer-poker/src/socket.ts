import { io } from 'socket.io-client';

const CONNECTION_PORT = 'http://stormy-citadel-30541.herokuapp.com/';
const socket = io(CONNECTION_PORT);
export default socket;



