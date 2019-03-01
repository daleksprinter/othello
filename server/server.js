const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

var rooms = {};

io.on('connection', (socket) => {

	socket.on('create_room', (data) => {
		if(!(data in rooms)){			
			socket.join(data);
			rooms[data] = 1;
			socket.emit('success_create', data);
		}else{
			socket.emit('failed_create', data);
		}
		console.log(rooms);
	})

	socket.on('enter_room', (data) => {
		if(data in rooms){
			socket.join(data);
			rooms[data]++;
			socket.emit('success_enter', data);
		}else{
			socket.emit('failed_enter', data);
		}
		console.log(rooms);
	})

	socket.on('exitroom', (data) => {
		socket.leave(data, () => {
			rooms[data]--;
			if(rooms[data] == 0){
				delete rooms[data];
			}
			socket.emit('exit', data);

			console.log(rooms);
		})
	})

	socket.on('disconnect', () => {
		console.log(socket.rooms);
	})

})

http.listen(PORT, () => {
	console.log('listening');
});

