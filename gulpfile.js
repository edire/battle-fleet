var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// var browserify = require("browserify");
// var browserifyShim = require('browserify-shim');
// gulp.task('scripts', function() {
//     // Single entry point to browserify 
//     gulp.src('www/index.js')
//         .pipe(browserify({
//             insertGlobals: true,
//             debug: true
//         }))
//         .transform(browserifyShim)
//         .pipe(gulp.dest('www/dist'))

//     browserSync.reload();
// });

gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir: "www",
            index: "index.html"
        }
    });

    gulp.watch("www/*.js").on('change', browserSync.reload);
    gulp.watch("www/*.html").on('change', browserSync.reload);
});

gulp.task('reload', function() {
    return browserSync.reload();
});

gulp.task('default', ['serve']);