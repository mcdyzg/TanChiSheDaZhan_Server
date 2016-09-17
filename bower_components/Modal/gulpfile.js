// https://github.com/gulpjs/gulp/tree/master/docs
// https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');

// https://www.npmjs.com/package/gulp-webpack/
var webpack = require("gulp-webpack");

// https://www.npmjs.com/package/gulp-watch/
var watch = require('gulp-watch');

// https://github.com/terinjokes/gulp-uglify
var uglify = require('gulp-uglify');

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/server-with-livereload-and-css-injection.md
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// https://www.npmjs.com/package/gulp-concat/
var concat = require('gulp-concat');

// https://www.npmjs.com/package/gulp-cssimport/
var cssimport = require("gulp-cssimport");

// https://www.npmjs.com/package/gulp-cssmin
var cssmin = require('gulp-cssmin');

// https://www.npmjs.com/package/del/
var del = require('del');

gulp.task('clear', function () {
    del([
        'dist/'
    ], function (err, deletedFiles) {
        console.log('###### clear dist done ######');
    });
});


gulp.task('pack_demo', function() {
    gulp.src('')
        .pipe(webpack(require('./webpack.demo.js')))
        .pipe(gulp.dest('./dist'))
    console.info('_____pack publish: done');
});

// watch files for changes and reload
gulp.task('watch', ['pack_demo'], function() {
    // console.log('__dirname:' + __dirname);
    browserSync({
        server: {
            baseDir: './'
        },
        open: "external"
    });

    gulp.watch('demo/*.js', ['pack_demo', function () {
        setTimeout(function () {
            reload();
        }, 1000);
    }]);
});
