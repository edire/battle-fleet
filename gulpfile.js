var gulp = require('gulp');
var browserSync = require('./_gulpfile/browser-sync');
var env = require('./_gulpfile/env');
var compileJs = require('./_gulpfile/compile');

var gulp = require('gulp'),
    browserify = require('browserify'),
    runSequence = require('run-sequence'),
    path = require('path'),
    del = require('del'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream'),
    batch = require('gulp-batch');


var scriptsCompile = function(isWatching) {
    var appFile = 'www/index.js'
        // var compiles = [];

    // compiles.push(compileJs({
    //     entries: appFile,
    //     basedir: path.resolve('www/'),
    //     paths: [path.resolve('www/')],
    //     // external: publicFiles,
    // }, path.relative('business/apps/', appFile), isWatching));

    // return merge2.apply(this, compiles)
    //     .pipe(size({
    //         title: 'bizScripts'
    //     }));


    var b = browserify({
        entries: ['www/index.js']
    });
    console.log(b)
    b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build'));
}

gulp.task('bizScripts', function(cb) {
    return scriptsCompile();
});

gulp.task('bizScripts:watch', function(cb) {
    return scriptsCompile(true);
});



gulp.task('serve', function() {

    return browserSync.init({
        server: {
            baseDir: "www",
            index: "index.html"
        }
    });
});

gulp.task('reload', function() {
    return browserSync.reload();
});

gulp.task('watch', function() {

    var watchOpts = {
        readDelay: 10
    };

    // watch('www/**/*.css', watchOpts, batch(function(events, cb) {

    // }));

    return gulp.start('bizScripts:watch');
});
gulp.task('clean', function() {
    return del('./build/');
})
gulp.task('default', ['clean'], function(cb) {
    // console.log(123)

    runSequence(
        ['watch'], ['bizScripts'], cb
    );
    //     ['styles', 'images', 'fonts'], ['bizScripts', 'libScripts'],
    //     'bundle_ng_js',
    //     'entry', ['watch', 'serve'],
    //     cb
    // )
});