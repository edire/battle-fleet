var roomStore = {};


function enterRoom (id, client) {
    return new Promise(function(resolve, reject) {

        if (!roomStore[id]) {
            roomStore[id] = [];
        }
        if (roomStore[id].length == 2) {
            reject({errno: 1101}) // 满了
        }
        if (roomStore[id][0] === client) {
            reject({errno: 1102}) // 是他自己
        }
        roomStore[id].push(client);
        resolve();
    })

}
module.exports = enterRoom;