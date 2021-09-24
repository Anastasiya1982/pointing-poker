

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
const userUtils =require('./utils/user');
const issueUtils = require('./utils/issues');
const  gameUtils = require('./utils/gameSettings');


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


app.get('/',(req,res)=> {
    res.send(rooms);
});

const connection=[]
io.on('connection', (socket) => {
    console.log("Успешное соединение  : ", socket.id);
    socket.on("ROOM:JOIN",(data)=> {
        console.log(`connection to room  ; ${data}`);
        connection.push(socket.id)
        socket.join("MyRoom");
    });

    socket.on('handle-connection', (newUser) => {
         if (userUtils.userJoin( newUser)) {
             // socket.emit("user-submit-successfully");
             io.to("MyRoom").emit("get connected users", userUtils.getUsers());
             io.to("MyRoom").emit("show-ScrumMuster-Data",userUtils.getMaster());
         }
    });

// chat-message
    socket.on("sendMessage",(messageData)=>{
           io.to("MyRoom").emit("receive-message",messageData);
      }
    );


// Issue
    socket.on("create-new-issue",(issue)=>{
         if(issueUtils.issueJoin(issue)){
           io.to("MyRoom").emit("get created issues",issueUtils.getIssues());
         }
  });
    socket.on("set active issue",(activeIssue)=>{
      issueUtils.findActiveIssue(activeIssue);
      io.to("MyRoom").emit("show active issue to all players", (activeIssue))
    })
  socket.on('delete issue',(currentIssue)=>{
    issueUtils.deleteIssue(currentIssue.title);
      io.to("MyRoom").emit("get Issues after deleting",issueUtils.getIssues());
  });

    // settings

  socket.on("set all cards to game",(cards)=>{
         gameUtils.setCards(cards);
         io.to("MyRoom").emit("show all cards to players",gameUtils.getAllCards())
  });
  socket.on("ready to start game",(settings)=>{
         gameUtils.setCards(settings.cards);
           io.to("MyRoom").emit("game start",(settings))
  });


// game

  socket.on("player selected one card",(data)=>{
    console.log(data);
    userUtils.setUserVoite(data);
    io.to("MyRoom").emit("Show results for all players",{users:userUtils.getUsers(),activeIssue:data.activeIssue})
  })


  socket.on("delete user",(user)=>{
    userUtils.userLeave(user.id);
    io.to("MyRoom").emit("get users after deleting", userUtils.getUsers());

  });

  socket.on("disconnect", (socket) => {
    console.log("Client disconnected: ", socket);
    connection.splice(connection.indexOf(socket), 1);
  })

});


server.listen(port, () => {
    console.log(`Listening to ${port}`);
});


    // socket.on("delete user",(id)=>{
    //     console.log(id);
    //     players=players.filter(player => player.id !== id);
    //
    //     io.sockets.emit(" User deleted from room" ,{data:id});
    //     console.log("Игроков после удаленияЖ" ,players);
    //
    // });
    //
    // socket.on('reset-game', (data) => {
    //     console.log('reset-game: ', data);
    //     players.forEach(player => player.value = -1);
    //     // broadcastPlayers(data);
    //     // resetGame(data);
    // });
    //
    // socket.on('set-issue', value => {
    //     console.log('set-issue: ', socket.id, value);
    //     players.forEach(player => {
    //         if (player.id === socket.id) {
    //             player.name = value;
    //         }
    //     });
    //
    //
    // });
    //
    // socket.on('select-card', value => {
    //     console.log('select-card: ', socket.id, value);
    //
    //     players.forEach(player => {
    //         if (player.id === socket.id) {
    //             player.value = value;
    //         }
    //     });
    //
    //
    // });
    //
    //
    //

// });











