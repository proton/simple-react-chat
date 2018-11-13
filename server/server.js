const server = require('http').createServer()
const io = require('socket.io')(server)

io.on('connection', function(socket){
  io.emit('chat message', 'new user connected');
	socket.on('disconnect', function(){
    io.emit('chat message', 'user disconnect');
  });
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log(msg);
	});
});

server.listen(9000, function (err) {
  if (err) throw err
  console.log('listening on port 9000')
})
