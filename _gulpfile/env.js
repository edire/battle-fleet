var glob = require('glob');

var getExtensionFiles = function() {
    var files = glob.sync('www/**/*.js');
    files = files.map(function(x) {
        x = x.substring(0, x.length - 3);
        var arr = x.split('/');
        if (arr[arr.length - 1] == arr[arr.length - 2]) {
            arr.pop();
        }
        return arr.join('/').relative('www', file);
    })
    return files;
}

module.exports = {
    getExtensionFiles: getExtensionFiles
}