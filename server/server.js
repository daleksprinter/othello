const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

/* get clients in 'room'
io.of('/').in('room').clients(function(error,clients){

})
*/

io.on('connection', (socket) => {

	socket.on('enter', (room) => (
		io.of('/').in(room).clients(function(eroor,clients){
			if(clients.length < 2){
				socket.join(room, () => {
					const message = "You Enterd Room " + room;
					socket.emit('message', message);
				});
			}else{
				const message = "Room " + room + " is already full";
				socket.emit('message', message);
			}
		})
	))

	

})

http.listen(PORT, () => {
	console.log('listening');
});

