const express = require('express');
const path = require('path');
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let numberOfRooms = 0;
/*
const knex = require('knex')({
    client: 'pg',
    connection: {
            host: '127.0.0.1',
            port: 5432,
            user: 'j0hn',
            password: '',
            database: 'gomoku'
        }
});
*/
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl:false
    }
});
//knex('events').insert({type: 'new', name:'terry'}).then(() => console.log('hello'));;
app.use(express.static('.'));
app.get('/', (request, respond) => {
    respond.sendFile(path.join(__dirname, 'views/index.html'));
});

io.on('connection', (socket) => {

    //Create a new game room
    socket.on('createGame', (data) => {
        socket.join(`${++numberOfRooms}`);
        socket.emit(`newGame`, {name: data.name, room: `${numberOfRooms}`});
        knex('events').insert({ type:'create', name:data.name }).then(() => console.log('game created by: ' + data.name ));
    });

    //Connect the Player 2 to the room he requested. Show error if room full.
    socket.on('joinGame', function(data){
        if(data.room > numberOfRooms){
            socket.emit('err', {message: `Room is closed!`});
            return;
        }

        var room = io.nsps['/'].adapter.rooms[data.room];

        if(room && room.length < 2){
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('player1', {});
            socket.emit('player2', {name:data.name, room: data.room});
            knex('events').insert({ type: 'join', name: data.name }).then(() => console.log('game joined by: ' + data.name));
        }else{
            socket.emit('err', {message: `Room is closed!`});
        }
    });

    //Handle the turn played by the player and notify the other player
    socket.on('playTurn', (data) => {
        socket.broadcast.to(data.room).emit('turnPlayed', {
            tile: data.tile,
            room: data.room
        });
    });

    //Notify players about winner and leave room
    socket.on('gameEnded', (data) => {
        numberOfRooms--;
        socket.broadcast.to(data.room).emit('gameEnd', data);
        console.log('data.name: ' + data.name);
        knex('events').insert({ type:data.message, name: data.name, arr: data.moves  }).then(() => console.log(data.message));
        socket.leave(data.room);
    });

    socket.on('disconnecting', function () {
        if(numberOfRooms >= 1){
            numberOfRooms--;
        }
        var self = this;
        var rooms = Object.keys(self.rooms);

        rooms.forEach(function(room){
            self.to(room).emit('userDisconnect', numberOfRooms);
            knex('events').insert({ type: 'disconnected', name: "disconnected" }).then(() => console.log('disconnected'));
            socket.leave();
        });
      });
});

//listen on port 3000
server.listen(process.env.PORT || 3000);
