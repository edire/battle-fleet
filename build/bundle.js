(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var createBoard = require('./lib/createBoard');

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

// createBorad();

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
},{"./lib/createBoard":2}],2:[function(require,module,exports){
function createBoard() {
    conf.board.forEach(function(b) {
        for (var i = 0; i < b.count; i++) {
            if (!getBoard(b.size)) {
                alert('请重新刷新游戏');
            }
        }
    })
}


function getBoard(size) {
    var flag = true;
    var board;
    var count = 0;
    while (flag && count < 1000) {
        var startDot = getRandomDot();
        var direction = parseInt(Math.random() * 10) % 2 ? 'horizontal' : 'vertical';
        var _board = new Board(startDot.x, startDot.y, size, direction);
        var isValid = true;
        _board.useDot.forEach(function(d) {
            if (d.x < 1 || d.y < 1 || d.x > conf.battle.cellX || d.y > conf.battle.rowY) {
                isValid = false;
            }
        });
        boardStorage.forEach(function(b) {
            var dots = b.useDot.concat(b.realDot);
            dots.forEach(function(d) {
                _board.useDot.forEach(function(bd) {
                    if (d.x == bd.x && d.y == bd.y) {
                        isValid = false;
                        return;
                    }
                })
                if (!isValid) return;
            })
        });
        if (!isValid) {
            count++;
            continue;
        } else {
            board = _board;
            flag = false;
        }
    }

    board && boardStorage.push(board);
    return board;
}

function getRandomDot() {
    var x = Math.ceil(Math.random() * conf.battle.rowY);
    var y = Math.ceil(Math.random() * conf.battle.cellX);
    return {
        x: x,
        y: y
    };
}

module.exports = createBoard;

},{}]},{},[1]);
