const express = require('express');
const router =require( './routes/image');
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const userroutes = require('./routes/userroutes');
const chatRoutes=require('./routes/chatRoutes')
const messageRoutes=require('./routes/messageRoutes')
const cors = require('cors');



dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080
connectdb();
app.use(cors());

app.use(express.json()); // Body parsing middleware should come before defining routes

app.get('/', (req, res) => {
    res.send("HELLO USER, WE WELCOME YOU");
});

app.use('/api/user', userroutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/notes', require('./routes/notes'))
app.use('/', router);

const server=app.listen(PORT, () => {
    console.log(`SERVER WORKING OVER ${PORT}`);
});
const io=require('socket.io')(server,{
    pingTimeout:600000,
    cors:{
        origin:"https://mellow-valkyrie-fed129.netlify.app",
    }

});
io.on("connection",(socket)=>{
    console.log("connected to socket.io");
    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit('connected');

    })
    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log("user joined room"+room);

    });
socket.on('typing', (room) => socket.in(room).emit('typing', room));
socket.on('stop typing', (room) => socket.in(room).emit('stop typing', room));

    
    socket.on('new message',(newMessagesRecieved)=>{
        var chat=newMessagesRecieved.chat;
        if(!chat.users)
        return console.log('chat users not defined');
        chat.users.forEach(user => {
            if(user._id===newMessagesRecieved.sender._id)return;
            socket.in(user._id).emit('message received',newMessagesRecieved);
            
        });
    });

});
