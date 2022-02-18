// Familiar necessary requires
let app = require('express')();
let http = require('http').Server(app);

// Requiring the Socket.io module into your Node.js project
let io = require('socket.io')(http);

// Typical get function
app.get('/', function(req, res){
   res.sendFile('C:/Users/blazi/Documents/Node.js/Socket.IO/index.html');
});
   

// Specifies a numeric identifier for each room
// This can be utilised to create dynamic chat-rooms with a
// bit of tweaking
let roomNum = 1;

io.on('connection', (socket) => {

   // Creates a connection with the room
   socket.join("Room Number " +roomNum);

   console.log("Someone joined the room");

   // Sends a message to everyone in the room via the in() method
   // and communicated to the client-side via a custom event
   io.sockets.in("Room Number " +roomNum).emit('roomIntro', "Welcome to Room " + roomNum + "<br/><br/>Want some tea?")

   // Removes the client from the room after 15 seconds have passed
   setTimeout(() => {

      io.sockets.in("Room Number " +roomNum).emit('roomOutro',"<br/><br/>Bye-Bye <br/> Thank you for joining the room");
      socket.leave("Room Number "+roomNum);
      console.log("Client removed from room " + roomNum);
   }, 15000
   )
});

// Stating the listening port (8080)
let port = 8080;
http.listen(port, () => {
   console.log('listening on port ' + port);
});