const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
	res.send('<div>hello</div>');
});

io.on('connection', (socket) => {
	console.log(socket.id);

	socket.on('send', (data) =>{
		console.log(data);
		io.emit('recieve', data);
	})
})

http.listen(PORT, () => {
	console.log('listening');
});

