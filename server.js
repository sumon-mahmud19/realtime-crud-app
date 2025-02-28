require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const app = express()
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } }); 

// port number
const PORT = process.env.PORT || 5000;

// Mongo Uri
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(MONGO_URI,{
    
}).then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Import Routes
const itemRoutes = require('./routes/itemRoutes')(io);
app.use('/api/items', itemRoutes);

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, ()=>{
    console.log('server is running')
})

// Socket.io connection
io.on('connection', (socket) => {
    console.log("A user connected");
    socket.on('disconnect', () => console.log("A user disconnected"));
});