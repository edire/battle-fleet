    var socket = io.connect('http://127.0.0.1:8989');
// var socket = io.connect('http://10.18.110.52:8989');
socket.on('event', function(data) {
    if (data.type == 'produce') {
        console.log(data);
    }
});


function emit(data) {
    socket.emit('event', data);
}