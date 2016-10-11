function Board(x, y, size, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
    this.useCard = getUseCard(x, y, size, direction);
    this.realCard = getRealCard(x, y, size, direction);
}

// 获取物体的位置
function getRealCard(x, y, size, direction) {
    var arr = [],
        i;
    i = (direction == 'horizontal') ? x : y;
    for (var a = i; i < size + a; i++)
        arr.push(createDot(x, y, i, direction));
    return arr;
}

// 获取周围的点
function getRoundCard(x, y, size, direction) {
    var arr = [],
        i;
    i = (direction == 'horizontal') ? x : y;

    for (var a = i; i - 1 <= size + a; i++) {
        arr.push(getDot(x, y, i, direction));
    }
    return getSideDot(arr, direction);
}

// 根据x,y,i 获取占用点
function getDot(x, y, i, direction) {
    return (direction == 'horizontal') ? [i, y] : [x, i];
}

// 根据占用点获取两边的点
function getSideDot(arr, direction) {
    var newArr = [];
    arr.forEach(function(d) {
        if (direction == 'horizontal') {
            newArr = newArr.concat([
                [d[0], d[1] + 1],
                [d[0], d[1] - 1]
            ]);
        } else {
            newArr = newArr.concat([
                [d[0] + 1, d[1]],
                [d[0] - 1, d[1]]
            ]);
        }
    });
    return newArr;
}

