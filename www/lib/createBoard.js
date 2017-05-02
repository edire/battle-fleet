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
