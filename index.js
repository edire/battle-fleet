function Board(x, y, size, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
    this.useCard = getUseCard(x, y, size, direction);
    this.realCard = getRealCard(x, y, size, direction);
}

function getRealCard (x, y, size, direction) {
    var arr = [],
        i;
    i = (direction == 'horizontal') ? x : y;
    for (var a = i; i < size + a; i++) {
        arr.push([i, y]);
    }
    return arr;
}

function getUseCard (x, y, size, direction) {
    var arr = [],
        i;
    i = (direction == 'horizontal') ? x : y;
    for (var a = i; i < size + a; i++) {
        arr.push([i, y]);
        arr.push([i, y + 1]);
        arr.push([i, y - 1]);
    }
    arr.push([x-1, y]);
    arr.push([x-1, y+1]);
    arr.push([x-1, y-1]);

    arr.push([x+size+1, y]);
    arr.push([x+size+1, y+1]);
    arr.push([x+size+1, y-1]);

    return arr;
}