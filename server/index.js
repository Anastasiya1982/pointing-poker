const express = require('express');
app=express();
const server = require('http').createServer(app);
const bodyParser=require('body-parser');
const cors = require('cors');
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

const dotenv = require('dotenv');
dotenv.config();
const host='127.0.0.1';
const port =process.env.PORT ||5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:true}));

app.use(cors({
    credentials:true,
    origin:"http://localhost:5000"
}));
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", `http://127.0.0.1:5000`);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let clients = [];
let players = [];

// app.get('/',(req,res)=>{
//     res.send({rooms:rooms});
// });
//
// app.get('/:room',(req,res)=>{
//     res.send({room:req.params.room});
// });
//
// app.post('/room',(req,res)=>{
//     if(rooms[req.body.room]!=null){
//         return res.redirect('/');
//     }
//     rooms[req.body.room]={users:{}}
//     res.redirect(req.body.room);
//     //send message that new room was created
// })

// connection io
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
const defaultAvatar = 'avatar';

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

server.listen(port, () => {
    console.log(`Listening to ${port}`);
});







