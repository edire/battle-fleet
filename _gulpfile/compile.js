var browserSync = require('./browser-sync');
var watchify = require('watchify'),
    util = require('gulp-util'),
    browserify = require('gulp-browserify'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    buffer = require('vinyl-buffer');

var compileJs = function(opts, distFile, isWatching) {
    // console.log(opts , distFile);
    opts = opts || {};

    if (isWatching) {
        opts.plugin = opts.plugin || [];
        opts.plugin.push(watchify);
    }
    var b = browserify(opts)


    if (isWatching) {
        b.on('update', function() {
            bundle()
                .pipe(size({
                    title: 'bizScripts > ' + distFile
                }))
                .pipe(browserSync.stream());
        });
    }

    function bundle() {
        return b.bundle()
            .once('data', function(chunk) {
                util.log('Bundle start');
            })
            .on('end', function() {
                util.log('Bundle finish', distFile);
            })
            .on('error', function(err) {
                console.log('err:' + err.message);
                //util.log(err)
                this.emit("end");
            })
            .pipe(source('./' + distFile))
            .pipe(rename(function(path) {
                if (path.basename == 'index' || path.basename == 'index.js') {
                    var _arr = path.dirname.split('/');
                    path.basename = path.basename.replace('index', _arr[_arr.length - 1]);
                }
                if (opts.outfile) {
                    // mainly for uc-bootstrap.js
                    path.basename = opts.outfile;
                }
                path.dirname = 'scripts';
                return path;
            }))
            .pipe(plumber())
            .pipe(buffer())
            // .pipe(gulpif(!DEBUG, stripDebug()))
            .pipe(gulp.dest('build/'));
    };
    return bundle();
};


module.exports = compileJs;