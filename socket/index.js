var server = require('http').createServer();
var io = require('socket.io')(server);
var eventRepertory = require('./event-repertory');

io.on('connection', connection);
server.listen(8989);

var clientEvent = {
    bindListener: function (client) {
        client.on('event', function(data) {
            clientEvent.event(client, data);
        });
        client.on('disconnect', function() {
            clientEvent.disconnect(client);
        });
    },
    disconnect: function(client) {
        console.log('用户离开')
    },
    event: function(client, data) {
        eventRepertory[data.type] && eventRepertory[data.type](client, data);
    }
}


function connection (client) {
    clientEvent.bindListener(client);
    client.on('disconnect', function() {

    });
}