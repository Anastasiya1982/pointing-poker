const express = require('express');

const app=express();
const server = require('http').createServer(app);
const bodyParser=require('body-parser');
const cors = require('cors');

// eslint-disable-next-line import/no-dynamic-require
const io = require('socket.io')(server,
  {
    cors: {
        origin: "http://localhost:8080",
        // methods: ["GET", "POST"],
        // transports: ['websocket', 'polling'],
        // credentials: true
    },
    allowEIO3: true
}
);



const dotenv = require('dotenv');

dotenv.config();
const host='127.0.0.1';
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:true}));

app.use(cors({
    credentials:true,
    // origin:"http://localhost:5000"
}));
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const rooms=new Map();
app.get('/',(req,res)=> {
    res.send(rooms);
});

let players = [];
const connection=[];
const messages=[];


// eslint-disable-next-line no-shadow
io.on('connection', (socket) => {
    console.log("Успешное соединение  : ",socket.id);
    connection.push(socket);

//     const broadcastPlayers = (socket) => {
//     players.forEach(player => {
//         io.sockets.emit("ROOM:show all users in Room", players);
//     });
// };
    const playerRemove = data => {
        // eslint-disable-next-line no-const-assign
       players=players.filter(player => player.id !== data);
        broadcastPlayers(socket);
        console.log(players)
    };


    // registerNewPlayer(socket);
    // eslint-disable-next-line no-undef
    socket.on("ROOM:JOIN",(data)=>{
        console.log( `connection to room  ; ${data}`);
           socket.join(data);

    });
    socket.on("USER:JOIN ROOM",( newUser)=>{
        players.push(newUser);
        console.log("Новый пользователь ",newUser.firstName);
        console.log("всего игроков в комнате:", players.length)
        io.sockets.emit("ROOM:New user join",{user:newUser});
        // broadcastPlayers(socket);
    });

    socket.on('sendMessage',(data)=>{
        io.sockets.emit("add-message",{message:data});
        // broadcastPlayers(socket);
    });

    socket.on("delete user",(id)=>{
        console.log(id);
        players=players.filter(player => player.id !== id);

        io.sockets.emit(" User deleted from room" ,{data:id});
        console.log("Игроков после удаленияЖ" ,players);

    });

    socket.on('reset-game', (data) => {
        console.log('reset-game: ', data);
        players.forEach(player => player.value = -1);
        // broadcastPlayers(data);
        // resetGame(data);
    });

    socket.on('set-issue', value => {
        console.log('set-issue: ', socket.id, value);
        players.forEach(player => {
            if (player.id === socket.id) {
                player.name = value;
            }
        });

        // broadcastPlayers(socket);
    });

    socket.on('select-card', value => {
        console.log('select-card: ', socket.id, value);

        players.forEach(player => {
            if (player.id === socket.id) {
                player.value = value;
            }
        });

        // broadcastPlayers(socket);
    });

    socket.on("disconnect", (socket) => {
        console.log("Client disconnected: ", socket);
        connection.splice(connection.indexOf(socket),1);



        // Update clients id.
       // players = players.filter(player => player.id !== socket.id);
       //  // playerRemove(socket);
    });
});



server.listen(port, () => {
    console.log(`Listening to ${port}`);
});







