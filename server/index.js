const express = require('express');
app=express();
const server = require('http').createServer(app);
const bodyParser=require('body-parser');
const cors = require('cors');


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

server.listen(port, () => {
    console.log(`Listening to ${port}`);
});







