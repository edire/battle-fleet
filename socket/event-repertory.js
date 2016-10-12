var enterRoom = require('./room');
var CONST = require('./const');
var repertory = {};

repertory.enterRoom = function(client, data) {
    enterRoom(data.roomId, client).then(function() {
        client.emit(CONST.EVENT.ROOM.ENTER_SUCC, {
            id: data.roomId,
        });
    }, function(err) {
    console.log(err.errno)
        client.emit(CONST.EVENT.ROOM.ENTER_FAIL, {
            id: data.roomId,
            errno: err.errno
        });
    })
}

repertory.produce = function(client, data) {
    store.forEach(function(friend) {
        console.log(friend.id)
        if (friend !== client) {
            friend.emit('event', data);
        }
    })
}

module.exports = repertory;