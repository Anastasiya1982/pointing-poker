const socket = require('socket.io');
const server=require('./index');

const io = require(socket)(server,{
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
});

let clients = [];
let players = [];
const defaultAvatar = 'avatar';

const registerNewClient = socket => {
  // Connections pool.
  clients.push(socket);
  playerAdd(socket);
}
const broadcastPlayers = socket => {
  clients.forEach(client => {
    client.emit("players-update", { players: players });
  });
}
const resetGame = socket => {
  clients.forEach(client => {
    client.emit("reset-game");
  });
}


const playerAdd = socket => {
  players.push({
    firstName: 'Anonymous',
    LastName:'',
    id: socket.id,
    status:'',
    type:'',
    value: -1,
    avatar: defaultAvatar
  });

  broadcastPlayers(socket);
};
const playerRemove = socket => {
  players = players.filter(player => player.id !== socket.id);
  broadcastPlayers(socket);
};

io.on('connection', (socket) => {
  console.log("New client connected: ", socket.id);

  registerNewClient(socket);
  socket.on("join_room",(data)=>{
    console.log( "user join the room" + data)
    socket.join(data);

  });
  socket.on("join_user",(data)=>{
    console.log(data)
    socket.to(data.room).emit("receive_user",data.content)

  });

  socket.on('reset-game', () => {
    console.log('reset-game: ', socket.id);

    players.forEach(player => player.value = -1);
    broadcastPlayers(socket);
    resetGame(socket);
  });

  socket.on('set-name', value => {
    console.log('set-name: ', socket.id, value);

    players.forEach(player => {
      if (player.id === socket.id) {
        player.name = value;
      }
    });

    broadcastPlayers(socket);
  });

  socket.on('select-card', value => {
    console.log('select-card: ', socket.id, value);

    players.forEach(player => {
      if (player.id === socket.id) {
        player.value = value;
      }
    });

    broadcastPlayers(socket);
  });

  socket.on("disconnect", (data) => {
    console.log("Client disconnected: ", socket.id);

    // Update clients id.
    clients = clients.filter(client => client.id !== socket.id);
    playerRemove(socket);
  });
});

