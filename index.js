var conf = {
    battle: {
        rowY: 10,
        cellX: 10
    },
    board: [{
        size: 4,
        count: 1
    }, {
        size: 3,
        count: 2
    }, {
        size: 2,
        count: 3
    }, {
        size: 1,
        count: 4
    }]
};

var boardStorage = [];

createBoard();


var arr = [];
for (var i = 0; i < conf.battle.cellX; i++) {
    arr.push([]);
    for (var j = 0; j < conf.battle.rowY; j++) {
        arr[i].push({
            x: j + 1,
            y: i + 1
        })
    }
}
var html = '';
arr.forEach(function(d) {
    html += '<div class="verticle">';
    d.forEach(function(b) {
        html += '<div class="dot" data-x="' + b.x + '" data-y="' + b.y + '"></div>';
    });
    html += '</div>';
});
battleBox.innerHTML = html;

boardStorage.forEach(function(board) {
    board.useDot.forEach(function(d) {
        var dom = document.querySelector('[data-x="'+d.x+'"][data-y="'+d.y+'"]');
        dom.style.background = '#000';
        dom.innerHTML = board.id;
    });
})