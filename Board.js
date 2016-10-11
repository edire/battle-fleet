function Board(x, y, size, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
    this.useDot = getRealDot(x, y, size, direction);
    this.realDot = getRoundDot(x, y, size, direction);
}

// 获取物体的位置
function getRealDot(x, y, size, direction) {
    var arr = [],
        i;
    i = (direction == 'horizontal') ? x : y;
    for (var a = i; i < size + a; i++)
        arr.push(getDot(x, y, i, direction));
    return arr;
}

// 获取周围的点
function getRoundDot(x, y, size, direction) {
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
    return (direction == 'horizontal') ? {x:i, y:y} : {x:x, y:i};
}

// 根据占用点获取两边的点
function getSideDot(arr, direction) {
    var newArr = [];
    arr.forEach(function(d) {
        if (direction == 'horizontal') {
            newArr = newArr.concat([
                {x: d.x, y: d.y + 1},
                {x: d.x, y: d.y - 1}
            ]);
        } else {
            newArr = newArr.concat([
                {x: d.x + 1, y: d.y},
                {x: d.x - 1, y: d.y}
            ]);
        }
    });
    return newArr;
}

