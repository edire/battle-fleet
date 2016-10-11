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
createGame();

function createGame() {
    conf.board.forEach(function(b) {
        for (var i = 0; i < b.count; i++) {
            if (!createBoard(b.size)){
                alert('请重新刷新游戏');
            }
        }
    })
    console.log(boardStorage)

}


function createBoard(size) {
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