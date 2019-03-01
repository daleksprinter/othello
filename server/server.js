const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;



io.on('connection', (socket) => {

	socket.on('create_room', (data) => {

		io.of('/').in(data).clients(function(error,clients){
			if(clients.length == 0){
				socket.join(data);
				socket.emit('success_create',data);
			}else{
				socket.emit('failed_enter');
			}
		});
		
	})

	socket.on('enter_room', (data) => {
		io.of('/').in(data).clients(function(error, clients){
			if(clients.length > 0){
				socket.join(data);
				socket.emit('success_create',data);
			}else{
				socket.emit('failed_enter');
			}
		});
	})

	socket.on('exitroom', (data) => {
		socket.leave(data, () => {
			socket.emit('exit', data);
		})
	})


})

http.listen(PORT, () => {
	console.log('listening');
});

